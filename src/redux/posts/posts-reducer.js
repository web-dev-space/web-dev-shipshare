import {createSlice} from '@reduxjs/toolkit';
import {findAllPosts, createPost, updatePost, deletePost} from "./posts-service";

const initialState = {
    posts: [],
    loading: false,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers:{
        [findAllPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [findAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        [findAllPosts.rejected]: (state, action) => {
            state.loading = false;
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        },
        [updatePost.fulfilled]: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        },
    }
});