import React from 'react'
import { Calendar } from 'antd';
import {connect} from 'react-redux'
import Chart from "react-google-charts";

class Dashboard extends React.Component{
    
     onPanelChange=(value, mode)=> {
        console.log(value, mode);
      }
     
   render(){
       const products=this.props.products.map(ele=>ele.stock)
       const prodsold=this.props.products.map(ele=>ele.sold)
      
       const max=Math.max.apply(null,products)
       const min=Math.min.apply(null,products)
      
       let productless=this.props.products.find(ele=>ele.stock==min)
       let productmax=this.props.products.find(ele=>ele.stock==max)
       
        let data;
        this.props.user.role=='admin' ?(
     data = [
        ["Task", "Hours per Day"],
        ["Categories", this.props.categories.length],
        ["Products", this.props.products.length],
        ["Orders", this.props.orders.length]
      ]
        ):(
            data = [
                ["Task", "Hours per Day"],
                ["Categories", this.props.categories.length],
                ["Products", this.props.products.length],
                ["Orders", this.props.orders.length],
                ["Sleep", 7] // CSS-style declaration
              ] 
        )
      const options = {
        title: "Shopping Cart Status",
        pieHole: 0.4,
        is3D: true
      };
       return (
           <div className='container'>
               <h1 style={{margin:'30px 0 20px 0'}}>Dashboard</h1>
               <h4>Calendar</h4>
               <div className="site-calendar-demo-card" style={{width:'100%'}}>
                    <Calendar fullscreen={false} onPanelChange={this.onPanelChange} />
                </div>
                <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          width="100%"
          height="400px"
          data={data}
          options={options}
          rootProps={{ 'data-testid': '2' }}
        />
        
        <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        <Chart
        width={'500px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Products','Stock', 'Price'],
          [productless?.name, productless?.stock, productless?.price],
          [productmax?.name,productmax?.stock,productmax?.price],
        ]}
        options={{
          // Material design options
          
          chart: {
            title: 'Stock',
            subtitle: 'Product Based On Lower And Higher Stock',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />
      </div>
           </div>
       )
   }
}

const mapStateToProps=(state)=>{
    return{
        user:state.user,
        categories:state.categories,
        products:state.products,
        cart:state.cart,
        orders:state.orders
    }
}


export default connect(mapStateToProps)(Dashboard)