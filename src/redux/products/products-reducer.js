import {createSlice} from '@reduxjs/toolkit';
import {
    getSearchResultsThunk,
    getProductDetailsThunk,
} from "./products-thunks";

const initialState = {
    searchResults: {},
    productDetails: {},
    loading: false,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        [getSearchResultsThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [getSearchResultsThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.searchResults = action.payload;
        },
        [getSearchResultsThunk.rejected]: (state, action) => {
            state.loading = false;
        },
        [getProductDetailsThunk.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductDetailsThunk.fulfilled]: (state, action) => {
            state.loading = false;
            state.productDetails = action.payload;
        },
        [getProductDetailsThunk.rejected]: (state, action) => {
            state.loading = false;
        },
    }
});

export default productsSlice.reducer;