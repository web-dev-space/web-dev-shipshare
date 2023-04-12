import {createSlice} from '@reduxjs/toolkit';
import {findAllPostsThunk, createPostThunk, updatePostThunk, deletePostThunk} from "./posts-thunks.js";

const initialState = {
    posts: [],
    loading: false,
}

const templatePost = {
    title: '',
    body: '',
    userId: 1,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers:{
        [findAllPostsThunk.pending]: (state) => {
            state.loading = true;
            state.post = [];
        },
        [findAllPostsThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.posts = payload;
        },
        [findAllPostsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [deletePostThunk.fulfilled]: (state, {payload}) => {
            state.posts = state.posts.filter(post => post.id !== payload);
        },
        [createPostThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            const newPost = {
                ...payload,
                ...templatePost,
            }
            state.posts.push(payload);
        },
        [updatePostThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            const index = state.posts.findIndex(post => post.id === payload.id);
            state.posts[index] = {
                ...state.posts[index],
                ...payload,
            };
        },
    },
    reducers: {}
});

export default postsSlice.reducer;