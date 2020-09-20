import axios from "../config/configureAxios"
import Swal from 'sweetalert2'
export const addProduct=(data)=>{
    return {type:'SET_PRODUCT',payload:data}
}

export const startAddProduct=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/products',data,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.data.message}`
                  })
            }else{
                const product=response.data
                dispatch(addProduct(product))
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
                    title: 'Product added successfully'
                  })
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getProducts=(data)=>{
    return {type:'GET_PRODUCTS',payload:data}
}

export const startGetProducts=(variables)=>{
    console.log(variables)
    return (dispatch)=>{
        axios.get(`/products?sort=${variables.sort}&search=${variables.search}&min=${variables.min}&max=${variables.max}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log('final',response.data)
            const products=response.data
            dispatch(getProducts(products))
        })
    }
}
/*export const loadProducts=(data)=>{
    return {type:'LOAD_PRODUCTS',payload:data}
}

export const startLoadProducts=(skip,limit,products)=>{
    return (dispatch)=>{
        axios.get(`/products?skip=${skip}&limit=${limit}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const data=response.data
            dispatch(loadProducts([...products,data]))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}*/

export const editProduct=(data)=>{
    return {type:'EDIT_PRODUCT',payload:data}
}

export const startEditProduct=(data,id,success,redirect)=>{
    return (dispatch)=>{
        axios.put(`/products/${id}`,data,{
           headers:{
               Authorization:localStorage.getItem('authToken')
           } 
        })
        .then((response)=>{
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                if(response.data.hasOwnProperty('errors')){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${response.data.message}`
                      })
                }
            }
            else{
                const data=response.data
                dispatch(editProduct(data))
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
                    title: 'Product added successfully'
                  })
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeProduct=(data)=>{
    return {type:'REMOVE_PRODUCT',payload:data}
}

export const startRemoveProduct=(id,redirect)=>{
    return (dispatch)=>{
        axios.delete(`/products/${id}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const data=response.data
            dispatch(removeProduct(data))
            redirect()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}