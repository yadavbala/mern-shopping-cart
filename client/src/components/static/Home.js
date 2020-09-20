import React from 'react'
import {connect} from 'react-redux'
import { Carousel } from 'antd';
import img1 from '../../images/family-shopping-min.jpg'
import img2 from '../../images/kids-min_2.jpg'
import img3 from '../../images/girls.jpg'
import img4 from '../../images/otto.jpg'
import img5 from '../../images/kids.jpg'
import { Image,Row,Col,Alert } from 'antd';

function Home(props){
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      const onClose = (e) => {
        console.log(e, 'I was closed.');
      };
    return(
        <div className='container' style={{marginBottom:'40px'}}> 
            {localStorage.getItem('authToken')&&<Alert
              message={props.user.role=='admin'?'you have logged in as Admin':'you have logged in as User'}
              type="success"
              closable
              onClose={onClose}
              style={{marginTop:'20px'}}
            />}
            <h1 style={{padding:'30px 0  10px 0px',color:'chocolate'}}>Welcome To Shopping Mart</h1>
            <Carousel autoplay>
              <div>
                <Image src={img1}/>
              </div>
              <div>
                  <Image src={img2}/>
              </div>
            </Carousel>
            <h1 style={{margin:'20px 0px 10px 0',color:'chocolate'}}>Attractive Collections Available</h1>
            <Row>
              <Col lg={8}>
              
                  <img src={img3} height='250px' width='100%'/>
                  <h3 style={{textAlign:'center'}}>Womens</h3>
              
              </Col>
              <Col lg={8} style={{padding:'0 12px 0'}}><img src={img4} height='250px' width='100%'/> <h3 style={{textAlign:'center'}}>Mens</h3></Col>
              <Col lg={8}><img src={img5} height='250px' width='100%'/> <h3 style={{textAlign:'center'}}>Kids</h3></Col>
            </Row>
        </div>   
    )
}

const mapStateToProps=(state)=>{
  return{
    user:state.user
  }
}

export default connect(mapStateToProps)(Home)