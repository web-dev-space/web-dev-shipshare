import { createSlice } from "@reduxjs/toolkit";
import {
    findAllShipGroupsThunk,
    createShipGroupThunk,
    updateShipGroupThunk,
    deleteShipGroupThunk,
    getShipmentTrackingThunk, findShipGroupByIdThunk,
} from "./shipGroups-thunks";

const initialState = {
    shipGroups: [],
    currentGroup: null,
    loading: false,
    trackings: {},
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
        [findShipGroupByIdThunk.pending]: (state) => {
            state.loading = true;
            state.currentGroup = null;

        },
        [findShipGroupByIdThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.currentGroup = payload;

        },
        [findShipGroupByIdThunk.rejected]: (state, action) => {
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
            console.log('group payload', payload)
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
        [getShipmentTrackingThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getShipmentTrackingThunk.fulfilled]: (state, { payload }) => {
            state.trackings = {
                ...state.trackings,
                [payload.trackingNumber]: payload.trackingDetail
            }
        },

    },
    reducers: {}
});


export default shipGroupsSlice.reducer;
