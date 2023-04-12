import {createSlice} from "@reduxjs/toolkit";
import {
    findAllGroupsThunk,
    createGroupThunk,
    updateGroupThunk,
    deleteGroupThunk
} from "./groups-thunks";

const initialState = {
    groups: [],
    loading: false,
};


const groupsSlice = createSlice({
    name: "groups",
    initialState,
    extraReducers:{
        // find all
        [findAllGroupsThunk.pending]: (state) => {
            state.loading = true;
            state.groups = [];
        },
        [findAllGroupsThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.groups = payload;
        },
        [findAllGroupsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },

        // delete
        [deleteGroupThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.groups = state.groups.filter(group => group.id !== payload.id);
        },

        // create
        [createGroupThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.groups.push(payload);
        },

        // update
        [updateGroupThunk.fulfilled]: (state, {payload}) => {
          state.loading = false;
          state.groups = state.groups.map
              (group =>
                  group._id === payload._id
                      ? {...group, ...payload}
                      : group
              );
        },

    },
    reducers: {}
});

export default groupsSlice.reducer;