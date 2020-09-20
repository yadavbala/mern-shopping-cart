import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage,useFormik} from 'formik'
import {Row,Col,Button,Alert} from 'antd'
import * as Yup from 'yup'
import {startAddProduct,startEditProduct} from '../../actions/productAction'
import { findCategory } from '../../selectors/categorySelector'

class ProductForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            success:'',
            photo:props.product?props.product.productPic:'',
            preview:''
        }
    }
     handleSubmit=(values,actions)=>{
         console.log('values',values)
         const formData=new FormData()
         formData.append('photo',this.state.photo)
         formData.append('name',values.name)
         formData.append('price',values.price)
         formData.append('description',values.description)
         formData.append('brand',values.brand)
         formData.append('categoryId',values.categoryId)
         formData.append('stock',values.stock)
         console.log(formData)
       
        const redirect=()=>{
             setTimeout(()=>{
                 this.props.history.push('/products')
             },0)
            
         }
         const success=()=>{
             this.setState({success:this.props.product?'your product details have been added successfully':'your product details have been edited successfully'})
         }
         if(this.props.product){
            this.props.dispatch(startEditProduct(formData,this.props.product?._id,success,redirect))
         }else{
            this.props.dispatch(startAddProduct(formData,success,redirect))
         }
       
      actions.resetForm()  
    }

     formSchema=Yup.object().shape({
        name:Yup.string()
              .min(3,'too short')
              .required('please enter your title'),
        price:Yup.number()
                .required('please enter the price'),
       description:Yup.string()
                .required('please enter your description')
                .min(8,'too short'),
       brand:Yup.string()
                .min(2,'too short')
                .required('please enter the brand'),
        categoryId:Yup.string()
                    .required('please select the category id')          
    })

  handleFileUpload=(e)=>{
       const files=e.target.files[0]
       this.setState({
           photo:files,
            preview:URL.createObjectURL(e.target.files[0])
       })
   }
    render(){ 
    return(
        <div>
            <Formik
                    initialValues={{
                       name:this.props.product ? this.props.product.name:'',
                       price:this.props.product ?this.props.product.price:'',
                       description:this.props.product ?this.props.product.description:'',
                       brand:this.props.product ? this.props.product.brand:'',
                       categoryId:this.props.product?this.props.product.categoryId:'',
                       stock:this.props.product?this.props.product.stock:'',
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.formSchema}
                >
                {(formProps)=>(
                <Form>
                        <div className='form-group'>
                            <Row>
                            <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='upload' >Product Image</label></Col>
                            <Col lg={8} md={12} sm={16} xs={24}>
                                <input type='file' id='upload'  accept="image/*" onChange={this.handleFileUpload} encType="multipart/form-data" name='photo'/> 
                            </Col>
                            </Row>
                            <div>{this.state.preview &&<img src={this.state.preview} width='150' height='150'/>}</div>
                        </div>
              
                                       
                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='name' >Name</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                            <Field type='text' name='name' id='name'  placeholder='enter product name' className='form-control'/>
                            <ErrorMessage name='name' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>

                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='price' >Price</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                            <Field type='number' name='price' id='price' className='form-control'  placeholder='enter the price'/>
                            <ErrorMessage name='price'  className='error-msg'   component='div'/>
                        </Col>
                        </Row>
                        </div>

                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='description'>Description</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                            <Field  
                                component='textarea'
                                id='description'
                                name='description'
                                className='form-control'
                                placeholder='enter your description' />
                            <ErrorMessage name='description' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>

                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='brand' >Brand</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                            <Field type='text' name='brand' id='brand'  className='form-control'  placeholder='enter the brand'/>
                            <ErrorMessage name='brand' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>

                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='category'>Category</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                        <Field name='categoryId' as='select' id='category' className='form-control'>
                            <option value=''>---Select---</option>
                            {
                                this.props.categories.map(ele=>{
                                    return <option key={ele._id} value={ele._id}>{ele.title}</option>
                                })
                            }
                        </Field>
                        <ErrorMessage name='categoryId' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>
                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='stock' >Stock</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}>
                            <Field type='text' name='stock' id='stock'  className='form-control'  placeholder='enter the stock'/>
                            <ErrorMessage name='stock' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>
                       

                    
                        <Button type='primary' htmlType='submit' style={{marginBottom:'30px'}}>submit</Button>
                        
                        {this.state.success &&<Alert message='Success' style={{marginTop:'10px'}} description={this.state.success} type='success' showIcon/>}
                </Form>
                )}
            </Formik>
        
        </div>
    );
}
    
}

const mapStateToProps=(state,props)=>{
    return {
        categories:state.categories
    }
}

export default withRouter(connect(mapStateToProps)(ProductForm))
