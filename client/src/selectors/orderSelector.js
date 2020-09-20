
export const findOrder=(orders,order)=>{
    return orders.find(ele=>ele._id==order)
}