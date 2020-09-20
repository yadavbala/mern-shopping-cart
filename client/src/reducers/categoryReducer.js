const initialState=[]

const categoryReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'ADD_CATEGORY':{
            return [...state,action.payload]
        }
        case 'GET_CATEGORIES':{
            return [...action.payload]
        }
        case 'REMOVE_CATEGORY':{
            return state.filter(ele=>ele._id!=action.payload._id)
        }
        case 'EDIT_CATEGORY':{
            return state.map(ele=>{
                if(ele._id==action.payload._id){
                    return {...action.payload}
                }else{
                    return {...ele}
                }
            })
        }
        default:{
            return [...state]
        }
    }
}

export default categoryReducer