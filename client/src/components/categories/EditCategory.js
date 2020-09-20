import React from 'react'
import {connect} from 'react-redux'
import {findCategory} from '../../selectors/categorySelector'
import { Spin } from 'antd';
import Form from './Form'
function EditCategory(props){
    return(
        <div>
        <div className='container'>
            <h1 style={{padding:'40px 0 30px'}}>Edit Category</h1>
            {props.category ?<Form category={props.category}/>:<Spin/>}
        </div>
        </div>
    )
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        category:findCategory(state.categories,id)
    }
}

export default connect(mapStateToProps)(EditCategory)
