import React from 'react'
import {connect} from 'react-redux'
import ProductForm from './Form'
import { findProduct } from '../../selectors/productSelector'
import { Spin } from 'antd';
function EditProduct(props){
    return(
        
        <div className='container'>
            <h1 style={{padding:'40px 0 20px 0'}}>EditProduct</h1>
            {props.product ?<ProductForm product={props.product}/>:<Spin/>}
        </div>
        
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        product:findProduct(state.products,id)
    }
}

export default connect(mapStateToProps)(EditProduct)