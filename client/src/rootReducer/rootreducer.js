
import {combineReducers} from 'redux'
import userReducer from '../reducers/userReducer'
import categoryReducer from '../reducers/categoryReducer'
import productsReducer from '../reducers/productReducer'
import cartReducer from '../reducers/cartReducer'
import orderReducer from '../reducers/orderReducer'
import reviewReducer from '../reducers/reviewReducer'
const rootReducer=combineReducers({
    user:userReducer,
    categories:categoryReducer,
    products:productsReducer,
    cart:cartReducer,
    orders:orderReducer,
    review:reviewReducer
})

export default rootReducer