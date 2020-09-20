import React from 'react'
import {Card,Row,Col,Avatar,Tooltip } from 'antd'
import {connect} from 'react-redux'
import { UserOutlined } from '@ant-design/icons';
function Profile(props){
    return(
        <div className='container'>
            <h1 style={{marginTop:'30px'}}>User Profile</h1>
            <Tooltip title={props.user.role=='user'?'you have logged in as user':"you have logged in as admin"}>
            <h3 style={{marginBottom:'30px',textAlign:'center'}}>Welcome To Shopping Mart {props.user.username}</h3>
            </Tooltip>
            <Row>
                <Col md={{span:12,offset:6}} xs={24}>
                    <Card hoverable>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <h3><Avatar size="large" icon={<UserOutlined />} /><span style={{paddingLeft:'10px'}}>{props.user.username}</span></h3>
                            <p>{props.user.email}</p>
                            <p>{props.user.mobile}</p>
                            <p>{props.user.address}</p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(Profile)