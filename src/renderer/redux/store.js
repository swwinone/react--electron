import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import login from './reducers/login';
import registration from './reducers/registration';
import {combineReducers} from "redux";

let store = createStore(combineReducers({
    counter,
    login,
    userInfo,
    registration
}), applyMiddleware(thunkMiddleware));

export default store;