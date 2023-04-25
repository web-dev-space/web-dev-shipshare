import { createSlice } from "@reduxjs/toolkit";
import {
    changePasswordThunk,
    loginThunk,
    logoutThunk,
    profileThunk,
    signupThunk,
    updateCurrentUserThunk,
    restoreAuthThunk,
} from "./users-thunks";

const initialState = {
    currentUser: null
};

const setCurrentUser = (state, payload) => {
    state.currentUser = payload;
    state.error = null;
    console.log('currentUser', state.currentUser);
    localStorage.setItem('auth', JSON.stringify(state.currentUser));
};

const setCurrentUserNull = (state, action) => {
    state.currentUser = null;
    console.log(action.response);
    state.error = action.error;
    localStorage.removeItem('auth');
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signupThunk.rejected]: (state, action) => {
            setCurrentUserNull(state, action);
        },
        [loginThunk.rejected]: (state, action) => {
            setCurrentUserNull(state, action);
        },
        [logoutThunk.fulfilled]: (state, action) => {
            setCurrentUserNull(state, action);
        },

        [signupThunk.fulfilled]: (state, { payload }) => {
            if (payload.role === 'buyer') {
                setCurrentUser(state, payload);
            }
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            setCurrentUser(state, payload);
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            setCurrentUser(state, payload);
        },
        [updateCurrentUserThunk.fulfilled]: (state, { payload }) => {
            setCurrentUser(state, payload);
        },
        [changePasswordThunk.fulfilled]: (state, { payload }) => {
            setCurrentUser(state, payload);
        },
        [restoreAuthThunk.fulfilled]: (state, { payload }) => {
            setCurrentUser(state, payload);
        },
    },
    reducers: {}
});


export default authSlice.reducer;
