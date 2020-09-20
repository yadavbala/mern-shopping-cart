
import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer/rootreducer'

const configureStore=()=>{
    const store=createStore(rootReducer,applyMiddleware(thunk))
    return store
}

export default configureStore