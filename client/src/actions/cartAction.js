import axios from "../config/configureAxios"
import Swal from 'sweetalert2'

export const addCart=(data)=>{
    return {type:'ADD_CART',payload:data}
}

export const AddToCart=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/cart',data,{
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
                const data=response.data
                dispatch(addCart(data))
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
                    title: 'Cart added successfully'
                  })
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getCartItems=(data)=>{
    return {type:'GET_CART',payload:data}
}


export const startGetCart=()=>{
    return (dispatch)=>{
        axios.get('/cart',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const cart=response.data
            dispatch(getCartItems(cart))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeCart=(cart)=>{
    return {type:'REMOVE_CART',payload:cart}
}


export const RemoveCartitem=(id,body,total)=>{
    return (dispatch)=>{
        axios.delete(`/cart/${id}?subtotal=${body}&total=${total}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const cart=response.data
            dispatch(removeCart(cart))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}