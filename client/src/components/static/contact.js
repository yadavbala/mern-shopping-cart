import React from 'react'
import {Row,Col,Card} from 'antd'

class Contact extends React.Component{
    
    render(){
        return(
            <div className='container'>
                
                <h3 style={{margin:'30px 0 20px 0'}}>Feel Free To Contact Us</h3>
                <Row gutter={[16,16]}>
                  <Col lg={10} sm={24} xs={24}>
                    <Card hoverable>
                    <address>
                      Lifestyle Shopping Mart,<br/>
                      85-A, RKV Rd, <br/>
                      Erode, <br/>
                      Tamil Nadu 638001<br/>
                      Mobile:9876567895
                    </address>
                    </Card>
                  </Col>
                  <Col lg={{span:10,offset:2}} sm={24} xs={24}>
                     <Card hoverable>
                        <h5>store hours</h5>
                        <p>mon-fri:8.00AM-10.00PM</p>
                        <p>weekend:10.00AM-7.00PM</p>
                      </Card>
                  </Col>
                </Row>
                <div className='google-map-code' style={{marginTop:'30px'}}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.868623848065!2d77.72752931412086!3d11.344305251558236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f45a2aefb85%3A0xcba7bf4957386cf!2sThe%20Chennai%20Silks%20Erode!5e0!3m2!1sen!2sin!4v1600267075634!5m2!1sen!2sin"  frameborder="0" style={{border:0,width:'100%',height:'300px'}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
        )
    }
}

export default Contact