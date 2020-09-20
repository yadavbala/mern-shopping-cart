import React,{useState} from 'react'
import {connect} from 'react-redux'
import { Checkbox } from 'antd';
function  CategoriesList(props){
    const [Checked,setChecked]=useState([])
   
    
        const handleToggle = (value) => {
    
            const currentIndex = Checked.indexOf(value);
            console.log(currentIndex)
            const newChecked = [...Checked];
            console.log(newChecked)
            if (currentIndex === -1) {
                newChecked.push(value)
            } else {
                newChecked.splice(currentIndex, 1)
            }
    
            setChecked(newChecked)
            console.log(Checked,newChecked)
            props.handleCategoriesList(newChecked)
            //update this checked information into Parent Component 
    
        }
    
    return(
        <div>
            {
                props.categories.map((ele,i)=>{
                    return(
                        <div>
                            
                            <Checkbox
                onChange={() => handleToggle(ele._id)}
                checked={Checked.indexOf(ele._id) === -1 ? false : true}
            />
            <label style={{marginLeft:'10px'}}>{ele.title}</label>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        categories:state.categories
    }
}


export default connect(mapStateToProps)(CategoriesList)