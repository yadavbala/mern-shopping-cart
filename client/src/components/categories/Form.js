import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {startAddCategory,startEditCategory} from '../../actions/categoryAction'
import {Row,Col,Button,Alert} from 'antd'
class CategoryForm extends React.Component{
    constructor(){
        super()
        this.state={
            success:''
        }
    }
     handleSubmit=(values,actions)=>{
        const formData=values
         console.log(formData)
         
         const redirect=()=>{
             setTimeout(()=>{
                 this.props.history.push('/categories')
                 actions.setSubmitting(false);
             })
            
         }
         const success=()=>{
             this.setState({success:this.props.category ? 'your category details have been edited successfully':'your category details have been added successfully'})
         }
         if(this.props.category){
            this.props.dispatch(startEditCategory(formData,this.props.category?._id,success,redirect))
        }else{
            this.props.dispatch(startAddCategory(formData,success,redirect))
        }
      actions.resetForm()  
    }

     formSchema=Yup.object().shape({
        title:Yup.string()
              .required('please enter your title'),
       description:Yup.string()
                .required('please enter your description')
                .min(8,'too short')
                
    })
    
    render(){
    return(
        <div>
                <Formik
                    initialValues={{
                        title:this.props.category?this.props.category.title:'',
                        description:this.props.category?this.props.category.description:''
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={this.formSchema}
                >
                <Form>
                        <div className='form-group'>
                            <Row>
                                <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='title' >Title</label></Col>
                                <Col lg={8} md={12} sm={16} xs={24}><Field type='text' name='title' id='title'  placeholder='enter your title' className='form-control'/>
                                <ErrorMessage name='title' className='error-msg'  component='div'/></Col>
                            </Row>
                        </div>

                        <div className='form-group'>
                        <Row>
                        <Col lg={4} md={6} sm={8} xs={24}><label htmlFor='description'>Description</label></Col>
                        <Col lg={8} md={12} sm={16} xs={24}><Field  
                                component='textarea'
                                id='description'
                                name='description'
                                className='form-control'
                                placeholder='enter your description' />
                            <ErrorMessage name='description' className='error-msg'  component='div'/>
                        </Col>
                        </Row>
                        </div>
                        
                        
                            <Button type='primary'   htmlType='submit'>submit</Button>
                        
                            {this.state.success &&<Alert message='Success' style={{marginTop:'10px'}} description={this.state.success} type='success' showIcon/>}
                </Form>
           
                
            </Formik>
            
           
        </div>
      
    );
}
    
}

export default withRouter(connect()(CategoryForm))
