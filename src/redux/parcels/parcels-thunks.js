import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./parcels-service"

// find -- all / by id / by tracking number
export const findAllParcelsThunk = createAsyncThunk(
    'parcels/findAllParcels',
    async () =>
        await service.findAllParcels()
);

export const findParcelByIdThunk = createAsyncThunk(
    'parcels/findParcelById',
    async (id) => {
        const response = await service.findParcelById(id);
        return response;
    }
);

export const findParcelByTrackingNumberThunk = createAsyncThunk(
    'parcels/findParcelByTrackingNumber',
    async (trackingNumber) => {
        const response = await service.findParcelByTrackingNumber(trackingNumber);
        return response;
    }
);

// create new parcel
export const createParcelThunk = createAsyncThunk(
    'parcels/createParcel',
    async (parcel) => {
        const response = await service.createParcel(parcel);
        return response;
    }
);

// delete parcel
export const deleteParcelThunk = createAsyncThunk(
    'parcels/deleteParcel',
    async (id) => {
        const response = await service.deleteParcel(id);
        return response;
    }
);

// update parcel
export const updateParcelThunk = createAsyncThunk(
    'parcels/updateParcel',
    async (parcel) => {
        const response = await service.updateParcel(parcel);
        return response.data;
    }
);