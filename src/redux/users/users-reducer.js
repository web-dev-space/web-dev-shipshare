import { createSlice } from "@reduxjs/toolkit";
import {
    deleteUserThunk,
    findAllUsersThunk, updateUserThunk

} from "./users-thunks";

const initialState = {
    users: [],
    loading: false,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers:{
        [findAllUsersThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [findAllUsersThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [findAllUsersThunk.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteUserThunk.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.users = state.users.filter(
                user => user._id !== action.payload._id
            );
        },
        [updateUserThunk.fulfilled]: (state, action) => {
            state.users = state.users.map(user => {
                if (user._id === action.payload._id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
        },
    },
    reducers: {}
});


export default usersSlice.reducer;