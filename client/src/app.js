import React from 'react'
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import {PrivateRoute} from './helpers/PrivateRoute'

import {connect} from 'react-redux'

import Home from './components/static/Home'
import Profile from './components/userAuth/Profile'
import Dashboard from './components/userAuth/Dashboard'

import Register from './components/userAuth/Register'
import Login from './components/userAuth/Login'

import Categories from './components/categories/Categories'
import AddCategories from './components/categories/AddCategories'
import EditCategory from './components/categories/EditCategory'

import Product from './components/products/products'
import AddProduct from './components/products/addProduct'
import ProductDetails from './components/products/productDetails'
import EditProduct from './components/products/editProduct'

import Cart from './components/cart/cart'
import AdminCart from './components/cart/AdminCart'

import Order from './components/orders/order'
import Navbar from './common/MainMenu';

import Contact from './components/static/contact'

import OrderShow from './components/orders/orderShow';
function App(props){
    const { Header, Content, Footer } = Layout;
    return(
        <Router>
           
            <Navbar/>
            <div className='lifestyle-tag'>lifestyle shopping mart</div>
            
                <Switch>
                    <Route path='/' component={Home} exact={true}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                    
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    
                    <PrivateRoute path='/categories' component={Categories} exact={true}/>
                   <PrivateRoute path='/categories/new' component={AddCategories}/>
                   <PrivateRoute path='/categories/edit/:id' component={EditCategory}/>

                    <PrivateRoute path='/products' component={Product} exact={true}/>
                    <PrivateRoute path='/products/new' component={AddProduct}/>
                    <PrivateRoute path='/products/:id' component={ProductDetails} exact={true}/>
                    <PrivateRoute path='/products/edit/:id' component={EditProduct}/>

                    <PrivateRoute path='/cart' component={Cart} exact={true}/>
                    <PrivateRoute path='/admincart' component={AdminCart}/>
                    
                    <PrivateRoute path='/orders' component={Order} exact={true}/>
                    <PrivateRoute path='/orders/:id' component={OrderShow}/>

                    <PrivateRoute path='/dashboard' component={Dashboard}/>

                    <Route path='/contactus' component={Contact} exact={true}/>

                    <Route render={()=>{
                        return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'500px'}}>
                            <div style={{fontSize:'30px'}}>404</div>
                            <div style={{fontSize:'25px'}}>OOPS... Page Not Found</div>
                        </div>
                    }}/>
                </Switch>
            
        </Router>
        
    )
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        admin:state.admin
    }
}

export default connect(mapStateToProps)(App)