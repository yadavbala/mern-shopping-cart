import React,{useEffect,useState} from 'react'
import {MDBDataTable} from 'mdbreact'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import {startGetCart,RemoveCartitem} from '../../actions/cartAction'
import {startAddOrder} from '../../actions/orderAction'
import {findProduct} from '../../selectors/productSelector'
import {Card,Row,Col,Button,Alert,BackTop} from 'antd'
import {ArrowUpOutlined } from '@ant-design/icons'
import {ShoppingCartOutlined} from '@ant-design/icons'
function Cart(props){
        const [success,setsuccess]=useState('')
        useEffect(()=>{
            if(props.cart.length==0){
                props.dispatch(startGetCart())
            }
        },[])
        const handleRemove=(id,body,total)=>{
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    props.dispatch(RemoveCartitem(id,body,total))
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })  
        }
        const redirectShopping=()=>{
            props.history.push('/products')
        }
        const handleSubmit=(items,total)=>{
              const data={
                  orderItems:items,
                  total
              }
              console.log('order',data)
              const success=()=>{
                    setsuccess('your order has been placed successfully')
              } 
              const redirect=()=>{
                  setTimeout(() => {
                    props.history.push('/orders')  
                  }, 2000);
              }
              props.dispatch(startAddOrder(data,success,redirect)) 
        }
        const cartLength=props.cart.find(ele=>ele.cartItems)
        const cartLen=cartLength?.cartItems.length
        const style = {height: 40,width: 40,lineHeight: '40px',borderRadius: 4,backgroundColor: '#1088e9',color: '#fff',textAlign: 'center',fontSize: 14,position:'fixed',bottom:0,right:0};
      return(
          <div>
          <div className='container'>
      <h1 style={{marginTop:'30px'}}>My Cart-{cartLen} <ShoppingCartOutlined/></h1>
              <Row gutter={[16,16]}>
                  <Col lg={16} sm={24} xs={24}>
              { 
                cartLen>0?
                  props.cart.map((ele,i)=>{
                      return ele.cartItems.map((ele1,i)=>{
                          const productDetails=findProduct(props.products,ele1.product)
                          return (
                              <div>
                                  <Card style={{marginTop:'20px'}}>
                                    <Row gutter={[16,16]}>
                                        <Col lg={8} sm={8} xs={24}><img src={productDetails&&productDetails.productPic} width='100%' height='200'/></Col>
                                        <Col lg={16} sm={16} xs={24}>
                                            <h3 style={{color:'red'}}>{productDetails && productDetails.name}</h3>
                                            <h4 style={{color:'blueviolet'}}>Brand:{productDetails && productDetails.brand}</h4>
                                            <h5 style={{color:'goldenrod'}}>Quantity:{ele1.quantity}</h5> 
                                            {ele1.size &&<p>Size:{ele1.size}</p>} 
                                            <h3>Rs.{ele1.price}</h3>
                                            <h3>subtotal:{ele1.subtotal}</h3>
                                            <Button type='danger' onClick={()=>handleRemove(ele1._id,ele1.subtotal,ele.total)}>remove</Button>
                                        </Col>
                                    </Row>
                                </Card> 
                                </div>   
                          )
                      })
                  })
                  :
                  <Card style={{marginTop:'20px'}}>
                   <div style={{display:"flex",alignItems:'center',justifyContent:'center',fontSize:'25px',fontWeight:600}}>No items found in cart...</div>
                   </Card>
                }
                </Col>
                <Col lg={8} sm={24} xs={24}>
                    {
                        props.cart.map((ele,i)=>{
                            return (
                                <Card style={{marginTop:'20px'}}>
                                    <h4 style={{color:'darkslateblue'}}>Price Details</h4>
                                    <h3>subtotal:{ele.total}</h3>
                                    <h3>total:{ele.total}</h3>
                                    <div><button className='btn btn-warning' onClick={redirectShopping}>continue shopping</button></div>
                                    <div style={{marginTop:'10px'}}><button className='btn btn-info' onClick={()=>handleSubmit(ele.cartItems,ele.total)}>Buy Now</button></div>
                                </Card>
                            )
                        })
                    }
                </Col>
                <BackTop><div style={style}><ArrowUpOutlined/></div></BackTop>
               </Row>
             
                {success &&<Alert message='Success' style={{marginTop:'10px'}} description={success} type='success' showIcon/>}
                
          </div>
          </div>
      )
    }


const mapStateToProps=(state)=>{
return {
    cart:state.cart,
    products:state.products
}
}

export default connect(mapStateToProps)(Cart)