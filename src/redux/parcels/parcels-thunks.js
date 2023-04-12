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
        return await service.findParcelById(id);
    }
);

export const findParcelByTrackingNumberThunk = createAsyncThunk(
    'parcels/findParcelByTrackingNumber',
    async (trackingNumber) => {
        return await service.findParcelByTrackingNumber(trackingNumber);
    }
);

// create new parcel
export const createParcelThunk = createAsyncThunk(
    'parcels/createParcel',
    async (parcel) => {
        return await service.createParcel(parcel);
    }
);

// delete parcel
export const deleteParcelThunk = createAsyncThunk(
    'parcels/deleteParcel',
    async (id) => {
        return await service.deleteParcel(id);
    }
);

// update parcel
export const updateParcelThunk = createAsyncThunk(
    'parcels/updateParcel',
    async (parcel) => {
        return await service.updateParcel(parcel);
    }
);