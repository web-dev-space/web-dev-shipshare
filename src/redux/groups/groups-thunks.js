import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./groups-service";


export const findAllGroupsThunk = createAsyncThunk(
    'groups/findAllGroups',
    async () =>
        await service.findAllGroups()
);

export const findGroupByIdThunk = createAsyncThunk(
    'groups/findGroupById',
    async (id) => {
        return await service.findGroupById(id);
    }
);

export const findGroupByNameThunk = createAsyncThunk(
    'groups/findGroupByName',
    async (name) => {
        return await service.findGroupByName(name);
    }
);

export const createGroupThunk = createAsyncThunk(
    'groups/createGroup',
    async (group) => {
        return await service.createGroup(group);
    }
);

export const deleteGroupThunk = createAsyncThunk(
    'groups/deleteGroup',
    async (id) => {
        return await service.deleteGroup(id);
    }
);

export const updateGroupThunk = createAsyncThunk(
    'groups/updateGroup',
    async (group) => {
        const response = await service.updateGroup(group);
        console.log(response);
        return response;
    }
);

// Path: src/redux/groups/groups-reducer.js