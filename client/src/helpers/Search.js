import React,{useState} from 'react'
import {Input} from 'antd'
const {Search}=Input
function Search1(props){
    const [searchterm,setsearch]=useState('')
    
    const handleSearch=(e)=>{
        setsearch(e.target.value)
        props.handleInputSearch(e.target.value)
    }
    return(
        <div>
            <label htmlFor='search' style={{marginRight:'8px'}}>search</label>
            <Search
                onChange={handleSearch}
                placeholder='enter the name for search'
                name={searchterm}
                id='search'
                style={{width:200}}   
            />
            
        </div>
    )
}

export default Search1