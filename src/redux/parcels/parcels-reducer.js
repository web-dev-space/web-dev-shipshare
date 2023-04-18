import { createSlice } from "@reduxjs/toolkit";
import {
    findAllParcelsThunk,
    createParcelThunk,
    updateParcelThunk,
    deleteParcelThunk,
    getParcelTrackingThunk,
    getParcelByShipGroupIdThunk,
    getParcelByShipGroupIdAndUserEmailThunk,
} from "./parcels-thunks";

const initialState = {
    parcels: [],
    loading: false,
    trackings: {},
    parcelsInDetailPage: [],
};

const parcelsSlice = createSlice({
    name: "parcels",
    initialState,
    extraReducers: {
        // find all
        [findAllParcelsThunk.pending]: (state) => {
            state.loading = true;
            state.parcels = [];
        },
        [findAllParcelsThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.parcels = payload;
        },
        [findAllParcelsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },

        // delete
        [deleteParcelThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.parcels = state.parcels.filter(parcel => parcel.id !== payload.id);
        },

        // create
        [createParcelThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.parcels.push(payload);
        },

        // update
        [updateParcelThunk.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.parcels = state.parcels.map
                (parcel =>
                    parcel._id === payload._id
                        ? { ...parcel, ...payload }
                        : parcel
                );
            console.log(state.parcels)
        },

        // get parcel tracking
        [getParcelTrackingThunk.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getParcelTrackingThunk.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.trackings = {
                ...state.trackings,
                [payload.trackingNumber]: payload.trackingDetail
            }
        },

        [getParcelByShipGroupIdThunk.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getParcelByShipGroupIdThunk.fulfilled]: (state, { payload }) => {
            state.parcelsInDetailPage = payload;
        },

        [getParcelByShipGroupIdAndUserEmailThunk.rejected]: (state, action) => {
            state.error = action.error;
        },
        [getParcelByShipGroupIdAndUserEmailThunk.fulfilled]: (state, { payload }) => {
            state.parcelsInDetailPage = payload;
        },
    },
    reducers: {}
});


export default parcelsSlice.reducer;
