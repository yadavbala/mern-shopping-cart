import React,{useState} from 'react'
import {connect} from 'react-redux' 
import {Link} from 'react-router-dom'
import {Row,Col,Select,InputNumber,Button} from 'antd'
import Swal from 'sweetalert2'
import { findCategory } from '../../selectors/categorySelector'
import {findProduct} from '../../selectors/productSelector'
import {startRemoveProduct} from '../../actions/productAction'
import {AddToCart} from '../../actions/cartAction'
import {addReview} from '../../actions/reviewAction'
import Review from '../../helpers/reviews'
const { Option } = Select

function ProductDetails(props){
    const [lineItem]=useState([])
   const [size,setSize]=useState('')
   const [quantity,setquantity]=useState(1)
   const [sizearr]=useState([30,32,34,36,38,40])
   const [success,setsuccess]=useState('')
   const [handleRev1,sethandleRev]=useState('')
    const category=findCategory(props.categories,props.product?.categoryId)
    const handleSize=(value)=>{
        setSize(value)
    }
    const handleRemove=(id)=>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const redirect=()=>{
                    props.history.push('/products')
                }
                props.dispatch(startRemoveProduct(id,redirect))
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })    
    }
    const handleQuantity=(value)=>{
        setquantity(value)
    }
    const handleRev=(value)=>{
        sethandleRev(value)
    }
    const handleReview=(id)=>{
        const formData={
            review:handleRev1,
            product:id
        }

        props.dispatch(addReview(formData))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data={
            product:props.product?._id,
            price:props.product?.price,
            quantity:parseInt(quantity),
            size:parseInt(size)
        }
        console.log(data)
        const success=()=>{
            setsuccess('your product has been added to cart successfully')
        }
        const redirect=()=>{
            setTimeout(() => {
                props.history.push('/cart')
            }, 2000);
        }
        props.dispatch(AddToCart(data,success,redirect))
    }
    return(
        <div>
           
            {
                <div style={{padding:'20px'}}>
                    <form onSubmit={handleSubmit}>
                        <Row>
                    <Col lg={12} sm={10} xs={24}><img src={props.product?.productPic} width='500' height='500'/></Col>
                    <Col lg={12} sm={16} xs={24}>
                    <h1 style={{color:'red'}}>{props.product?.name}</h1>
                    <h3>Rs {props.product?.price}</h3>
                    <p style={{color:'darkgreen'}}>{props.product?.description}</p>
                    <p style={{color:'darkviolet'}}>{props.product?.brand}</p>
                    <Review handleRev={handleRev} productId={props.product?._id}/>
                    {handleRev1!=''&&<Button onClick={()=>handleReview(props.product._id)}>submit</Button>}
                    <p style={{fontSize:'20px',fontWeight:'500',color:'darkturquoise'}}>{props.product?.stock ? 'in stock':"out of stock"}</p>
                  <div>
                   <label style={{marginRight:'8px'}}> sizes</label>
                   <Select onChange={handleSize} defaultValue='select' style={{width:120}} value={size}> 
                       {
                          sizearr.map(ele=>{
                          return <Option value={ele}>{ele}</Option>
                          })
                       }
                    </Select>
                    </div>

                    <div style={{margin:'13px 0'}}>
                     <label style={{marginRight:'8px'}}>quantity</label>
                        <InputNumber
                            onChange={handleQuantity}
                           min={1}
                           max={10}
                           defaultValue={1}
                     />
                    </div>
                    <div>{props.user.role=='admin' &&<Link to={`/products/edit/${props.product?._id}`}>Edit Product</Link>}</div>
                    {props.user.role=='admin'&&<h5 style={{padding:'10px 0 5px 0',color:'firebrick'}}>sold:{props.product?.sold}</h5>}
                    <div style={{margin:'18px 0'}}>{props.user.role=='admin' &&<Button type='danger' onClick={()=>handleRemove(props.product?._id)}>remove product</Button>}</div>
                    {props.product?.stock>0 &&<div>{props.user.role=='user' &&<Button type='primary' htmlType='submit'>Add to Cart</Button>}</div>}
                    </Col>
                    </Row>
                    </form>
                </div>
            }
        </div>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        product:findProduct(state.products,id),
        categories:state.categories,
        user:state.user
    }
}

export default connect(mapStateToProps)(ProductDetails)