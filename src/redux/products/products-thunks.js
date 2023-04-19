import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./products-service";

export const getSearchResultsThunk = createAsyncThunk(
    "products/getSearchResults",
    async (searchText) =>  await service.getSearchResults(searchText)
);

export const getProductDetailsThunk = createAsyncThunk(
    "products/getProductDetails",
    async (asinID) => {
        return await service.getProductDetails(asinID);
    }
);