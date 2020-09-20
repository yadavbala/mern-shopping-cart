import React from 'react'
import {connect} from 'react-redux'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {startPostRegisterData} from '../../actions/userAction'
import { Row, Col ,Card,Button,Alert} from 'antd';
import { UserOutlined } from '@ant-design/icons';
class Register extends React.Component{
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
                 this.props.history.push('/login')
             },2000)
            
         }
         const success=()=>{
             this.setState({success:'your details has been  registered successfully'})
         }
         this.props.dispatch(startPostRegisterData(formData,redirect,success))
 
      actions.resetForm()  
    }

     formSchema=Yup.object().shape({
       username:Yup.string()
            .min(3,'too short')
            .max(60,'name should not be more than 50 characters')
            .required('please enter your username'),
      email:Yup.string()
              .email('Invalid format')
              .required('please enter your email'),
      password:Yup.string()
                .required('please enter your password')
                .min(8,'too short')
                .max(128,'password should be maximum of 128 characters'),
      mobile:Yup.string().matches( /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, {message: "Please enter valid mobile number."}).required('please enter your mobile number'),
      address:Yup.string()
                    .min(6,'too short')
                    .required('please enter your address')
    })
    render(){
    return(
        <div className='container' style={{marginBottom:'40px'}}>
            <Row gutter={[16,16]}>
                <Col xs={{span:20,offset:2}} sm={{span:16,offset:4}} md={{span:12,offset:6}} lg={{span:10,offset:6}}>
                <Card title="REGISTER"  bordered={false} style={{marginTop:'50px'}}>
                    <Formik
                        initialValues={{
                            username:'',
                            email:'',
                            password:'',
                            mobile:'',
                            address:'',
                            admin:''
                        
                        }}
                        onSubmit={this.handleSubmit}
                        validationSchema={this.formSchema}
                    >
                        <Form>
                            <div className='form-group'>
                                <label htmlFor='username' className='label-style'>Username</label>
                                <Field  
                                    type='text'
                                    id='username'
                                    name='username'
                                    className='form-control input-style'
                                    placeholder='enter your name'
                                    
                                    />
                                <ErrorMessage name='username' className='error-msg' component='div'/>
                            </div>
                        
                            <div className='form-group'>
                                <label htmlFor='email' className='label-style'>Email address</label>
                                <Field type='text' name='email' id='email'  placeholder='example@email.com'  className='form-control input-style'/>
                                <ErrorMessage name='email' className='error-msg' component='div'/>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password' className='label-style'>Password</label>
                                <Field  
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='enter your password'
                                    className='form-control input-style' />
                                <ErrorMessage name='password' className='error-msg' component='div'/>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='mobile' className='label-style'>Mobile</label>
                                <Field  
                                    type='number'
                                    id='mobile'
                                    name='mobile'
                                    placeholder='+91 8798765436'
                                    className='form-control input-style' />
                                <ErrorMessage name='mobile' className='error-msg'  component='div'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='address' className='label-style'>Address</label>
                                <Field component='textarea' name='address' id='address'  placeholder='enter your address'  className='form-control input-style'/>
                                <ErrorMessage name='address' className='error-msg'  component='div'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor='admin' className='label-style'>Admin code</label>
                                <Field  
                                    type='password'
                                    id='admin'
                                    name='admin'
                                    className='form-control input-style'
                                    placeholder='enter admin code' />
                                <ErrorMessage name='admin' className='error-msg'  component='div'/>
                            </div>
                            <div className='align-center'>
                                <Button type='primary' htmlType='submit'>Register</Button>
                            </div>
                        </Form>
                    </Formik>
                </Card>
                </Col>
            </Row>
        </div>
    );
}    
}

export default connect()(Register)
