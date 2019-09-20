import { combineReducers } from 'redux';
import cartReducer from './cart';
import commonReducer from './common';
import cinemaReducer from './cinema'

export default combineReducers({
    cart: cartReducer,
    common: commonReducer,
    cinema: cinemaReducer

})