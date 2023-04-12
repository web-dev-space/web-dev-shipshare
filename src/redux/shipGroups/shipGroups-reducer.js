import { createSlice } from "@reduxjs/toolkit";
import {
    findAllShipGroupsThunk,
    createShipGroupThunk,
    updateShipGroupThunk,
    deleteShipGroupThunk
} from "./shipGroups-thunks";

const initialState = {
    shipGroups: [],
    loading: false,
};

const shipGroupsSlice = createSlice({
    name: "shipGroups",
    initialState,
    extraReducers: {
        // find all
        [findAllShipGroupsThunk.pending]: (state) => {
            state.loading = true;
            state.shipGroups = [];
            
        },
        [findAllShipGroupsThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shipGroups = payload;
            
        },
        [findAllShipGroupsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
            
        },

        // delete
        [deleteShipGroupThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shipGroups = state.shipGroups.filter(shipGroup => shipGroup.id !== payload.id);
        },

        // create
        [createShipGroupThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shipGroups.push(payload);
        },

        // update
        [updateShipGroupThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shipGroups = state.shipGroups.map
                (shipGroup =>
                    shipGroup._id === payload._id
                        ? { ...shipGroup, ...payload }
                        : shipGroup
                );
            
        },
        [updateShipGroupThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
            
        },
    },
    reducers: {}
});


export default shipGroupsSlice.reducer;
