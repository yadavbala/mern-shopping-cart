import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startGetProducts} from '../../actions/productAction'
import Search from '../../helpers/Search'
import PriceSlider from '../../helpers/Price'
import CategoriesList from '../../helpers/Categories'
import {findCategoriesInProducts} from '../../selectors/productSelector'
import {Card,Row,Col,Select,Button,BackTop} from 'antd'
import {ArrowUpOutlined } from '@ant-design/icons'
const {Meta} = Card
const {Option} = Select

class Product extends React.Component{
    constructor(props){
        super(props)
        this.state={
            sortBy:['asc','desc'],
            sortResult:'asc',
            count:6,
            searchValue:'',
            pricerange:0,
            max:5000,
            categoryValue:[]
        }
    }

    componentDidMount(){
        if(this.props.products.length==0){
            const variables={
                search:this.state.searchValue,min:this.state.pricerange,max:this.state.max,sort:this.state.sortResult,
                category:this.state.categoryValue
            }
            this.props.dispatch(startGetProducts(variables))
        }
    }

    handleChange=(value)=>{
        this.setState({
            sortResult:value
        },()=>{
            console.log(this.state.sortResult)
            const variables={
                search:this.state.searchValue,min:this.state.pricerange,max:this.state.max,sort:this.state.sortResult,
                category:this.state.categoryValue
            }
            this.props.dispatch(startGetProducts(variables))
        })
    }

    loadmore=()=>{
     let count=6
     this.setState({
         count:this.state.count+count
     })
    }
    
    handleInputSearch=(name)=>{
        this.setState({
            searchValue:name
        })
        const variables={
            search:name,min:this.state.pricerange,max:this.state.max,sort:this.state.sortResult,
            category:this.state.categoryValue
        }
        this.props.dispatch(startGetProducts(variables))
    }

    handlePriceSlider=(range)=>{
        this.setState({
            pricerange:range
        })
        const variables={
            search:this.state.searchValue,min:range,max:this.state.max,sort:this.state.sortResult,
            category:this.state.categoryValue
        }
        this.props.dispatch(startGetProducts(variables))
    }
    handleCategoriesList=(value)=>{
        this.setState({
            categoryValue:value
        })
    }
    render(){
        const style = {height: 40,width: 40,lineHeight: '40px',borderRadius: 4,backgroundColor: '#1088e9',color: '#fff',textAlign: 'center',fontSize: 14,position:'fixed',bottom:0,right:0};
        console.log('category',this.state.categoryValue)
        const CategoriesInProducts=findCategoriesInProducts(this.props.products,this.state.categoryValue)
        console.log('catprod',CategoriesInProducts)
        return(
            <div className='mainproduct'>
                <div className='leftside'>
                    <Card>
                        <h3 style={{margin:'10px 0px 30px 0'}}>Filter By Price</h3>
                        <PriceSlider handlePriceSlider={this.handlePriceSlider}/>
                        <h3 style={{margin:'30px 0px 30px 0'}}>Filter By Categories</h3>
                        <CategoriesList handleCategoriesList={this.handleCategoriesList}/>
                    </Card>
                </div>
                <div className='rightside'>
                {this.props.user.role=='admin' &&<div style={{textAlign:'end'}}><Link to='/products/new'>Add Product</Link></div>}
                    <Row>
                        <Col lg={{span:6,offset:7}} sm={{span:10,offset:2}} xs={24}>
                    <label style={{marginRight:'8px'}}>sort by price</label>
                        <Select onChange={this.handleChange} value={this.state.sortResult} style={{width:120}}>
                            <Option value=''>select</Option>
                            {
                                this.state.sortBy.map(ele=>{
                                return <Option value={ele}>{ele}</Option>
                                })
                            }
                        </Select>
                        </Col>
                        <Col lg={{span:9,offset:2}} sm={{span:10,offset:2}} xs={24}><Search handleInputSearch={this.handleInputSearch}/></Col>  
                    </Row>
                    <Row gutter={[16,16]} style={{marginTop:'20px'}}>
                {
            this.state.categoryValue.length>0 &&
                CategoriesInProducts.map(ele=>{
        console.log(ele.productPic)
        return (
            <Col lg={8} sm={12} xs={24}>
            <Link to={`/products/${ele._id}`}>
        <Card hoverable={true} cover={<img src={ele.productPic} width='100%' height='300'/>}>
            <Meta
                title={ele.name}
                description={ele.price}
            />
        </Card>
        </Link>
        </Col>
        )
    })
}
</Row>

    <Row gutter={[16,16]} style={{marginTop:'20px'}}>
        {
            this.state.categoryValue.length==0&&
        this.props.products.slice(0,this.state.count).map(ele=>{
            console.log(ele.productPic)
            return (
                    
                    <Col lg={8} sm={12} xs={24}>
                        <Link to={`/products/${ele._id}`}>
                    <Card hoverable={true} cover={<img src={ele.productPic} width='100%' height='300'/>}>
                        <Meta
                            style={{color:'#000'}}
                            title={ele.name}
                            description={ele.price}
                        />
                    </Card>
                    </Link>
                    </Col>
            )
        })
    }
    </Row>
{
    this.props.products.length==0 &&
    <Card>
        <div style={{display:"flex",alignItems:'center',justifyContent:'center',fontSize:'25px',fontWeight:600}}>No Products Found</div>
    </Card>
}    
    <div className='align-center'>    
        {this.state.count<this.props.products.length &&<Button type='primary' style={{marginBottom:'20px'}} onClick={this.loadmore}>load more</Button>}
    </div> 
                
               
                <BackTop><div style={style}><ArrowUpOutlined /></div></BackTop>
    </div>
    </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        products:state.products,
        user:state.user
    }
}

export default connect(mapStateToProps)(Product)