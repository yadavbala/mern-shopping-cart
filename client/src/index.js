import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './store/store'
import App from './app'
import {startGetUser} from './actions/userAction'
import { startGetCategory } from './actions/categoryAction'
import { startGetProducts } from './actions/productAction'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { startGetCart } from './actions/cartAction'
import { startGetOrders } from './actions/orderAction'
import { startGetReview } from './actions/reviewAction'
const store=configureStore()

console.log('initial state',store.getState())

store.subscribe(()=>{
    console.log('updated',store.getState())
})


//handle page reloads
if(localStorage.getItem('authToken')){
    const variables={
        sort:'asc',
        search:'',
        min:0,
        max:5000
    }
    store.dispatch(startGetUser())
    store.dispatch(startGetCategory())
    store.dispatch(startGetProducts(variables))
    store.dispatch(startGetCart())
    store.dispatch(startGetOrders())
    store.dispatch(startGetReview())
}

const jsx=(
    <Provider store={store}>
        <App/>
    </Provider>
)

ReactDOM.render(jsx,document.getElementById('root'))