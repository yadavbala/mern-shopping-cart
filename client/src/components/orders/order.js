import React from 'react'
import {connect} from 'react-redux'
import {MDBDataTable} from 'mdbreact'
import {startGetOrders} from '../../actions/orderAction'
import {Link} from 'react-router-dom'
import { findProduct } from '../../selectors/productSelector'
import moment from 'moment'
class Order extends React.Component{
    componentDidMount(){
        if(this.props.orders.length==0){
            this.props.dispatch(startGetOrders())
        }
    }
    
    render(){
        const data = {
            columns: [
                {
                    label: 'S.NO',
                    field: 'sno',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'orderId',
                    field: 'orderid',
                    sort: 'asc',
                    width: 150
                }
            ],
            rows: this.props.orders.map((ele,i) => {
                return {
                    sno:++i,
                    date:moment(ele.createdAt).format('LLL'), 
                    orderid: <Link to={`/orders/${ele._id}`}>{ele._id}</Link>
                }
            })  
        }
        console.log('orders',this.props.orders)
        return(
            <div className='container'>
                <h1 style={{marginTop:'30px'}}>Orders-{this.props.orders.length}</h1>
                <MDBDataTable
                striped
                bordered
                hover
                data={data}
            />
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        orders:state.orders,
        products:state.products
    }
}

export default connect(mapStateToProps)(Order)