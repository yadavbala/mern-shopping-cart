const { Switch } = require("react-router-dom/cjs/react-router-dom.min")

const initialState=[]

const cartReducer=(state=initialState,action)=>{
    console.log('reducer',state)
    switch(action.type){

        case 'ADD_CART':{
            return [].concat(action.payload)
        }
        case 'GET_CART':{
            return [...action.payload]
        }
        case 'REMOVE_CART':{
            return [].concat(action.payload)
        }
        default:{
            return [...state]
        }
    }
}

export default cartReducer