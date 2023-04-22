import {createSlice} from '@reduxjs/toolkit';
import {
    findAllPostsThunk,
    createPostThunk,
    updatePostThunk,
    deletePostThunk,
    findPostByIdThunk
} from "./posts-thunks.js";

const initialState = {
    posts: [],
    loading: false,
}

const templatePost = {
    title: 'new post',
    body: 'post body',
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
            state.posts = state.posts.filter(post => post._id !== payload._id);
        },
        [createPostThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.posts.push(payload);
        },
        [findPostByIdThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            const index = state.posts.findIndex(post => post._id === payload._id);
            if (index === -1) {
                state.posts.push(payload);
            } else {
                state.posts[index] = {
                    ...state.posts[index],
                    ...payload,
                };
            }
        },
        [updatePostThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            console.log(payload);
            const index = state.posts.findIndex(post => post._id === payload._id);
            state.posts[index] = {
                ...state.posts[index],
                ...payload,
            };
        },
    },
    reducers: {}
});

export default postsSlice.reducer;