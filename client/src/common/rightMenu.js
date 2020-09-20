import React, { Component } from 'react';
import { Menu, Icon,Dropdown } from 'antd';
import { DownOutlined ,ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
class RightMenu extends Component {
  handleLogout=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You wan't to logout from this app",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken')
        window.location.href='/'
        Swal.fire(
          'Logged Out',
          'You have been logged out.',
          'success'
        )
      }
      else{
        window.location.href='/'
      }
    })
  }
  render() {
    const menu=(
      <Menu>
        {
          this.props.user.role=='admin' &&
          <Menu.Item key="dashboard">
            <Link to='/dashboard'>Dashboard</Link>
          </Menu.Item>
        }
          <Menu.Item key="profile">
            <Link to='/profile'>Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to='/logout' href='#' onClick={this.handleLogout}>Logout</Link>
          </Menu.Item>
      </Menu>
    )
    return (
    
      Object.keys(this.props.user).length==0?
      <Menu mode="horizontal">
        <Menu.Item key="mail">
            <Link to='/register'>Register</Link>
        </Menu.Item>
        <Menu.Item key="app">
            <Link to='/login'>Login</Link>
        </Menu.Item>
      </Menu>
      :
      this.props.user.role=='admin'?
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Link to='/categories'>Categories</Link>
          </Menu.Item>
          <Menu.Item key="products">
              <Link to='/products'>Products</Link>
          </Menu.Item>
          <Menu.Item key="admincart">
              <Link to='/admincart'>Cart<span style={{color:'red',paddingLeft:'5px'}}><ShoppingCartOutlined/></span></Link>
          </Menu.Item>
          <Menu.Item key="orders">
              <Link to='/orders'>Orders</Link>
          </Menu.Item>
          <Menu.Item key="contact">
              <Link to='/contactus'>Contact Us</Link>
          </Menu.Item>
          <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:'#fff'}}>
            Account <DownOutlined />
          </a>
        </Dropdown>
      </Menu>
    </div>
  :
  <Menu mode="horizontal">
     
     <Menu.Item key="products">
      <Link to='/products'>Products</Link>
  </Menu.Item>
  <Menu.Item key="cart">
     <Link to='/cart'>Cart<span style={{color:'red',paddingLeft:'5px'}}><ShoppingCartOutlined/></span></Link>
  </Menu.Item>
  <Menu.Item key="orders">
      <Link to='/orders'>Orders</Link>
  </Menu.Item>
  
  <Menu.Item key="contact">
      <Link to='/contactus'>Contact Us</Link>
  </Menu.Item>
  <Dropdown overlay={menu}>
  <a className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{color:'#fff'}}>
    Account <DownOutlined />
  </a>
</Dropdown>
  </Menu>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    user:state.user
  }
}


export default connect(mapStateToProps)(RightMenu);