import axios from '../config/configureAxios'
import { getCartItems } from './cartAction'
import { getCategories } from './categoryAction'
import { getOrders } from './orderAction'
import { getProducts } from './productAction'
import { getreviews } from './reviewAction'
import Swal from 'sweetalert2'

export const startPostRegisterData=(data,redirect,success)=>{
    return (dispatch)=>{
        axios.post('/users/register',data)
            .then((response)=>{
               if(response.data.hasOwnProperty('errors')){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${response.data.message}`
                  })
               }else{
                   success()
                   redirect()
                   Swal.fire(
                    'Good job!',
                    'Your Details has been registered successfully',
                    'success'
                  )
               }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

export const setUser=(data)=>{
    return {type:'SET_USER',payload:data}
}

export const startLoginUser=(data,redirect,success)=>{
    return (dispatch)=>{
        axios.post('/users/login',data)
            .then((response)=>{
                console.log(response)
                if(response.data.hasOwnProperty('errors')){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${response.data.errors}`
                      })
                }else{
                    if(response.data.token){
                        localStorage.setItem('authToken',response.data.token)
                        axios.get('/account',{
                            headers:{
                                Authorization:localStorage.getItem('authToken')
                            }
                        })
                        .then((response)=>{
                            console.log(response)
                            const user=response.data
                            dispatch(setUser(user))
                            success()
                            redirect()
                            Swal.fire(
                                'Good job!',
                                'Your have logged in successfully',
                                'success'
                              )
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                        setTimeout(()=>document.location.reload(),2500)
                        const p1=axios.get('/categories',{
                            headers:{
                              'Authorization':localStorage.getItem('authToken')
                            }
                          })
                
                          const p2=axios.get('/products',{
                            headers:{
                              'Authorization':localStorage.getItem('authToken')
                            }
                          })
                
                          const p3=axios.get('/cart',{
                            headers:{
                              'Authorization':localStorage.getItem('authToken')
                            }
                          })
                
                        const p4=axios.get('/orders',{
                          headers:{
                            'Authorization':localStorage.getItem('authToken')
                          }
                        })
                        const p5=axios.get('/productreview',{
                            headers:{
                              'Authorization':localStorage.getItem('authToken')
                            }
                          })
                
                          Promise.all([p1,p2,p3,p4,p5]).then((values)=>{
                                console.log(values)
                              return Promise.all (values.map(val=>val.data))
                          }).then(([categories,products,cart,orders,reviews])=>{
                              console.log(categories,products,cart,orders,reviews)
                              dispatch(getCategories(categories))
                              dispatch(getProducts(products))
                              dispatch(getCartItems(cart))
                              dispatch(getOrders(orders))
                              dispatch(getreviews(reviews))
                             
                             
                          })
                          .catch((err)=>{
                            console.log(err)
                          })
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    
}

export const startGetUser=()=>{
    return (dispatch)=>{
        axios.get('/account',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const user=response.data
            dispatch(setUser(user))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
   
}

