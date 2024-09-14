import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        page:3,
}
const PageSlice = createSlice(
    {
        name:"pageNo",
        initialState,
        reducers:{
            setPageNo:(state,action)=>{
                state.page = action.payload;
            }
        }
    }
)

export const{setPageNo} = PageSlice.actions;
export default PageSlice.reducer;