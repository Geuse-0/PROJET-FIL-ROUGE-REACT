import {configureStore , combineReducers} from '@reduxjs/toolkit';
import cartReducer from '../Redux/CartSlice'
import storage from "redux-persist/lib/storage"
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    
    storage
}
const reducer = combineReducers({
    cart: cartReducer
});
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer: persistedReducer
})