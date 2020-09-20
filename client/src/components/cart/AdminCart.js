import React from 'react'
import {Card,Row,Col,Button,Alert} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
function AdminCart(props){
    const redirectShopping=()=>{
        props.history.push('/products')
    }
    return(
        <div className='container'>
            <h1 style={{margin:'30px 20px 0 0'}}>Cart <ShoppingCartOutlined/></h1>
             <Row gutter={[16,16]}>
                  <Col lg={16} sm={24} xs={24}>
                  <Card style={{marginTop:'20px'}}>
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center',fontSize:'25px',fontWeight:600}}>No items found in cart...</div>
                   </Card>
                  </Col>
                  <Col lg={8} sm={24} xs={24}>
                  <Card style={{marginTop:'20px'}}>
                    <h4 style={{color:'darkslateblue'}}>Price Details</h4>
                    <h3>subtotal:0</h3>
                    <h3>total:0</h3>
                    <div><button className='btn btn-warning' onClick={redirectShopping}>continue shopping</button></div>
                    <div style={{marginTop:'10px'}}><button className='btn btn-info'>Buy Now</button></div>
                </Card> 
                  </Col>
            </Row>
        </div>
    )
}

export default AdminCart