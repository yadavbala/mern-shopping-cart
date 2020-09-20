import axios from "../config/configureAxios"
import Swal from 'sweetalert2'


export const addCategory=(data)=>{
    return {type:'ADD_CATEGORY',payload:data}
}

export const startAddCategory=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/categories',data,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.data.message}`
                  })
            }else{
                const category=response.data
                dispatch(addCategory(category))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Category added successfully'
                  })
                redirect()
            }
           
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getCategories=(data)=>{
    return {type:'GET_CATEGORIES',payload:data}
}

export const startGetCategory=()=>{
    return (dispatch)=>{
        axios.get('/categories',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const categories=response.data
            dispatch(getCategories(categories))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeCategory=(data)=>{
    return {type:'REMOVE_CATEGORY',payload:data}
}

export const startRemoveCategory=(id)=>{
    return (dispatch)=>{
        axios.delete(`/categories/${id}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const category=response.data
            dispatch(removeCategory(category))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const editCategory=(category)=>{
    return {type:'EDIT_CATEGORY',payload:category}
}

export const startEditCategory=(data,id,success,redirect)=>{
    return (dispatch)=>{
        axios.put(`/categories/${id}`,data,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.data.message}`
                  })
            }
            else{
                const category=response.data
                dispatch(editCategory(category))
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Category edited successfully'
                  })
                redirect()
            }
           
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}