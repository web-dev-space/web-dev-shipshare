import { createSlice } from "@reduxjs/toolkit";
import {
} from "./dashboard-thunks";

const initialState = {
    stats: [],
    loading: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    extraReducers: {

    },
    reducers: {
        [getStatsMerchantThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [getStatsMerchantThunk.fulfilled]: (state, action) => {
            state.stats = action.payload;
            state.loading = false;
        },
    }
});


export default dashboardSlice.reducer;
