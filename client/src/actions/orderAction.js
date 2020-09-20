import axios from "../config/configureAxios"
import Swal from 'sweetalert2'
export const addOrder=(data)=>{
    return {type:'ADD_ORDER',payload:data}
}

export const startAddOrder=(data,success,redirect)=>{
    return (dispatch)=>{
        axios.post('/orders',data,{
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
            }
            else{
                const order=response.data
                dispatch(addOrder(order))
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
                    title: 'You have Placed Order Successfully'
                  })
                redirect()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getOrders=(data)=>{
    return {type:'GET_ORDERS',payload:data}
}

export const startGetOrders=()=>{
    return (dispatch)=>{
        axios.get('/orders',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            const orders=response.data
            dispatch(getOrders(orders))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const removeOrder=(data)=>{
    return {type:'REMOVE_ORDER',payload:data}
}


export const startRemoveOrder=(id,redirect)=>{
    return (dispatch)=>{
        axios.delete(`/orders/${id}`,{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            const data=response.data
            dispatch(removeOrder(data))
            redirect()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}