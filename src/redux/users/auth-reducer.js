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
        [signupThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = {...payload, role: "buyer"};
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [updateCurrentUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [changePasswordThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        }
    },
    reducers: {}
});


export default authSlice.reducer;