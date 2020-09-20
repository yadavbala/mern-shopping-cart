import React from 'react'
import {connect} from 'react-redux'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { Row, Col ,Card,Button,Alert} from 'antd';
import {startPostRegisterData, startLoginUser} from '../../actions/userAction'
class Login extends React.Component{
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
                 this.props.history.push('/')
             },2000)
            
         }
         const success=()=>{
             this.setState({success:'you have logged in successfully'})
         }
         this.props.dispatch(startLoginUser(formData,redirect,success))
      actions.resetForm()  
    }

     formSchema=Yup.object().shape({
        email:Yup.string()
              .email('Invalid format')
              .required('please enter your email'),
       password:Yup.string()
                .required('please enter your password')
                .min(8,'too short')
                .max(128,'password should be maximum of 128 characters')
    })
    render(){
    return(
        
        <div className='container' style={{marginBottom:'40px'}}>
            <Row gutter={[16,16]}>
                <Col xs={{span:20,offset:2}} sm={{span:16,offset:4}} md={{span:12,offset:6}} lg={{span:10,offset:6}}>
                 <Card title="Login"  bordered={false} style={{marginTop:'50px'}}>
                
                    <Formik
                        initialValues={{
                            email:'',
                            password:'' 
                        }}
                        onSubmit={this.handleSubmit}
                        validationSchema={this.formSchema}
                    >
                    <Form>
                        <div className='form-group'>
                            <label htmlFor='email' className='label-style'>Email address</label>
                            <Field type='text' name='email' id='email'  placeholder='example@email.com' className='input-style form-control'/>
                            <ErrorMessage name='email' className='error-msg'  component='div'/>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password' className='label-style'>Password</label>
                            <Field  
                                type='password'
                                id='password'
                                name='password'
                                placeholder='enter your password'
                                className='input-style form-control'
                                    />
                            <ErrorMessage name='password' className='error-msg'  component='div'/>
                        </div>
                        <div className='align-center'>
                            <Button type='primary' htmlType='submit'>submit</Button>
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

export default connect()(Login)
