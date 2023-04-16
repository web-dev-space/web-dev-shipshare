import { createSlice } from "@reduxjs/toolkit";
import { getStatsMerchantThunk, getStatsAdminThunk } from "./dashboard-thunks";

const initialState = {
    stats: [],
    loading: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: {
        [getStatsMerchantThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [getStatsMerchantThunk.fulfilled]: (state, action) => {
            state.stats = action.payload;
            state.loading = false;
        },
        [getStatsAdminThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [getStatsAdminThunk.fulfilled]: (state, action) => {
            state.stats = action.payload;
            state.loading = false;
        }
    },
    reducers: {}
});


export default dashboardSlice.reducer;
