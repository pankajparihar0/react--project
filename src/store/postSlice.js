import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    posts:false,
    postData:[],
    current :0

}

const PostSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        loadPost:(state,action)=>{
            state.posts =true;
            state.postData = action.payload;
        },
        removePosts:(state,action)=>{
            state.posts = false;
            state.postData = [];
        }
    }
})

export const {loadPost,removePosts} = PostSlice.actions;
export default PostSlice.reducer;