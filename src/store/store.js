import { configureStore} from "@reduxjs/toolkit";
import AuthReducer from './authSlice'
import PostReducer from './postSlice'
import PageReducer from './pageNo'
const store = configureStore({
reducer:{AuthReducer,PostReducer,PageReducer}
});
export default store;