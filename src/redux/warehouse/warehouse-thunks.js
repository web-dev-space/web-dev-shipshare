import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./warehouse-service.js";

export const findAllWarehousesThunk = createAsyncThunk(
  "warehouses/findAllWarehouses",
  async () => {
    const response = await service.findAllWarehouses();
    return response.data;
  }
);

export const findWarehouseByIdThunk = createAsyncThunk(
  "warehouses/findWarehouseById",
  async (id) => {
    const response = await service.findWarehouseById(id);
    return response;
  }
);

export const findWarehouseByCompanyThunk = createAsyncThunk(
  "warehouses/findWarehouseByCompany",
  async (company) => {
    const response = await service.findWarehouseByCompany(company);
    return response;
  }
);

export const createWarehouseThunk = createAsyncThunk(
  "warehouses/createWarehouse",
  async (warehouse) => {
    const response = await service.createWarehouse(warehouse);
    return response;
  }
);

export const updateWarehouseThunk = createAsyncThunk(
  "warehouses/updateWarehouse",
  async (warehouse) => {
    const response = await service.updateWarehouse(warehouse);
    return response;
  }
);

export const deleteWarehouseThunk = createAsyncThunk(
  "warehouses/deleteWarehouse",
  async (id) => {
    const response = await service.deleteWarehouse(id);
    return response;
  }
);