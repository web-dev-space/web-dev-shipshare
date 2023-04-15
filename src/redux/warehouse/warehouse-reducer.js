import { createSlice } from "@reduxjs/toolkit";
import {
    findAllWarehousesThunk,
    createWarehouseThunk,
    updateWarehouseThunk,
    deleteWarehouseThunk,
} from "./warehouse-thunks";

const initialState = {
    warehouses: [],
    loading: false,
};

const warehousesSlice = createSlice({
    name: "warehouses",
    initialState,
    extraReducers: {
        [findAllWarehousesThunk.pending]: (state) => {
            state.warehouses = [];
            state.loading = true;
        },
        [findAllWarehousesThunk.fulfilled]: (state, action) => {
            state.warehouses = action.payload;
            state.loading = false;
        },
        [findAllWarehousesThunk.rejected]: (state) => {
            state.warehouses = [];
            state.loading = false;
        },
        [createWarehouseThunk.fulfilled]: (state, action) => {
            state.warehouses.push(action.payload);
        },
        [updateWarehouseThunk.fulfilled]: (state, {payload}) => {
            state.warehouses = state.warehouses.map((warehouse) => {
                if (warehouse._id === payload._id) {
                    return {...warehouse, ...payload};
                }
                return warehouse;
            });
        },
        [deleteWarehouseThunk.fulfilled]: (state, {payload}) => {
            state.warehouses = state.warehouses.filter(
                (warehouse) => warehouse._id !== payload._id
            );
        },
    },
    reducers: {},
});

export default warehousesSlice.reducer;