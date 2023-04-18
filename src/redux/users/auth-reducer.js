import {createSlice} from "@reduxjs/toolkit";
import {
    changePasswordThunk,
    loginThunk,
    logoutThunk,
    profileThunk,
    signupThunk,
    updateCurrentUserThunk
} from "./users-thunks";

const initialState = {
    currentUser: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:{
        [signupThunk.rejected]: (state, action) => {
            state.currentUser = null;
            console.log(action.response);
            state.error = action.error;
        },
        [signupThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [loginThunk.rejected]: (state, { error }) => {
            state.currentUser = null;
            state.error = error;
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.error = null;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
            state.error = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.currentUser = payload;
            state.error = null;
        },
        [updateCurrentUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.error = null;
        },
        [changePasswordThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
            state.error = null;
        }
    },
    reducers: {}
});


export default authSlice.reducer;