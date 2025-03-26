import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { videoListReducer } from './reducers/videoReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    videoList: videoListReducer,
    userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

// const middleware = [thunk]

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store