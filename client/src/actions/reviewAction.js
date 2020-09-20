import axios from "../config/configureAxios"
import Swal from 'sweetalert2'

export const reviewAdd=(data)=>{
    return {type:'ADD_REVIEW',payload:data}
}

export const addReview=(data)=>{
    return (dispatch)=>{
        axios.post('/productreview',data,{
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
                const review =response.data
                dispatch(reviewAdd(review))
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
                    title: 'Thanks For Your Rating'
                  })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}

export const getreviews=(data)=>{
    return {type:'GET_REVIEWS',payload:data}
}

export const startGetReview=()=>{
    return (dispatch)=>{
        axios.get('/productreview',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            const review=response.data
            dispatch(getreviews(review))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
   
}