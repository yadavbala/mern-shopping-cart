
import React from 'react'
import {connect} from 'react-redux'
import {Card,Button} from 'antd'
import { findProduct } from '../../selectors/productSelector'
import {findOrder} from '../../selectors/orderSelector'
import {startRemoveOrder} from '../../actions/orderAction'
import Swal from 'sweetalert2'
import {DeleteOutlined} from '@ant-design/icons'
class OrderShow extends React.Component{
    handleRemove=(id)=>{
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
                const redirect=()=>{
                    this.props.history.push('/orders')
                }
               
            this.props.dispatch(startRemoveOrder(id,redirect))
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
    render(){
        return(
            <div className='container'>
                <h1 style={{marginTop:'30px'}}>Your Orders</h1>
                <Card style={{marginTop:'20px'}} hoverable>
                    <div className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        this.props.order?.orderItems.map(ele=>{
                            const product=findProduct(this.props.products,ele.product)
                            return(
                               <tr>
                                    <td>{product && product.name}</td>
                                    <td>{product && product.price}</td>
                                    <td>{product && product.brand}</td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.subtotal}</td>
                                </tr>
                            )
                        })
                    }
                        </tbody>
                    </table>
                <h3 className='display-total'>Total:{this.props.order?.total}</h3>
                {this.props.user.role=='admin'&&<Button type='danger' onClick={()=>this.handleRemove(this.props.order?._id)}><DeleteOutlined /></Button>}
                    </div>
                </Card>
            </div>
        )
    }
}

const mapStateToProps=(state,props)=>{
    const id=props.match.params.id
    return{
        order:findOrder(state.orders,id),
        products:state.products,
        user:state.user
    }
}

export default connect(mapStateToProps)(OrderShow)