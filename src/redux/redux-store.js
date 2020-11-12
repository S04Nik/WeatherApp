import weatherReducer from './weather-reducer'
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form' 
const { createStore, combineReducers, applyMiddleware } = require("redux");



const reducers=combineReducers({
    weatherPage:weatherReducer,
    form:formReducer
})

let store=createStore(reducers,
    applyMiddleware(thunkMiddleware));
    
    
    
    window.store=store;
    export default store;