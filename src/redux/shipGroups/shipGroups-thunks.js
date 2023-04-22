import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./shipGroups-service"

// find -- all / by id / by tracking number
export const findAllShipGroupsThunk = createAsyncThunk(
    'shipGroups/findAllShipGroups',
    async () =>
        await service.findAllShipGroups()
);

export const findShipGroupByIdThunk = createAsyncThunk(
    'shipGroups/findShipGroupById',
    async (id) => {
        return await service.findShipGroupById(id);
    }
);

export const findShipGroupByTrackingNumberThunk = createAsyncThunk(
    'shipGroups/findShipGroupByTrackingNumber',
    async (trackingNumber) => {
        return await service.findShipGroupByTrackingNumber(trackingNumber);
    }
);

// create new shipGroup
export const createShipGroupThunk = createAsyncThunk(
    'shipGroups/createShipGroup',
    async (shipGroup) => {
        return await service.createShipGroup(shipGroup);
    }
);

// delete shipGroup
export const deleteShipGroupThunk = createAsyncThunk(
    'shipGroups/deleteShipGroup',
    async (id) => {
        return await service.deleteShipGroup(id);
    }
);

// update shipGroup
export const updateShipGroupThunk = createAsyncThunk(
    'shipGroups/updateShipGroup',
    async (shipGroup, shipGroupBeforeUpdate) => {
        console.log("start")
        const response = await service.updateShipGroup(shipGroup, shipGroupBeforeUpdate);
        console.log(response)
        return response;
    }
);

export const getShipmentTrackingThunk = createAsyncThunk(
    'shipGroups/getShipmentTracking',
    async ({ trackingNumber, courier }) => {
        return await service.getShipmentTracking({ trackingNumber, courier });
    }
);