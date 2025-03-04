import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { videoListReducer } from './reducers/videoReducers'

const reducer = combineReducers({
    videoList: videoListReducer,
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