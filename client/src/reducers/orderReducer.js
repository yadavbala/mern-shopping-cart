const initialState=[]

const orderReducer=(state=initialState,action)=>{
    switch(action.type){

        case 'ADD_ORDER':{
            return [...state,action.payload]
        }

        case 'GET_ORDERS':{
            return [...action.payload]
        }

        case 'REMOVE_ORDER':{
            return state.filter(ele=>ele._id!=action.payload._id)
        }

        default:{
            return [...state]
        }
    }
}

export default orderReducer