import { configureStore } from '@react,js/toolkit'
import { thunk } from 'redux-thunk'
import { productListReducer } from './reducers/productReducers'
const reducer = ({
    productList: productListReducer,

})

const initialState = {

}

const middleware = [thunk]

const store = configureStore({
    reducer,
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

export default store