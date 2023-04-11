import { createSlice } from "@reduxjs/toolkit";
import {
    findAllParcelsThunk,
    createParcelThunk,
    updateParcelThunk,
    deleteParcelThunk
} from "./parcels-thunks";

const initialState = {
    parcels: [],
    loading: false,
};

const parcelsSlice = createSlice({
    name: "parcels",
    initialState,
    extraReducers:{
        // find all
        [findAllParcelsThunk.pending]: (state) => {
            state.loading = true;
            state.parcels = [];
        },
        [findAllParcelsThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.parcels = payload;
        },
        [findAllParcelsThunk.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error
        },

        // delete
        [deleteParcelThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.parcels = state.parcels.filter(parcel => parcel.id !== payload.id);
        },

        // create
        [createParcelThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.parcels.push(payload);
        },

        // update
        [updateParcelThunk.fulfilled]: (state, {payload}) => {
            state.loading = false;
            console.log(payload)
            state.parcels = state.parcels.map
                (parcel =>
                    parcel._id === payload._id
                        ? {...parcel, ...payload}
                        : parcel
                );
            console.log(state.parcels)
        },
    },
    reducers: {}
});


export default parcelsSlice.reducer;