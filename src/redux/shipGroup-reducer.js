import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";

const sampleShipGroups = [
  {
    key: uuidv4(),
    trackingNumber: "YT6950106245135",
    shipRoute: "Air Sensitive",
    joinDate: "Mar 12, 2023",
    pickupLocation: "San Jose",
    status: "Arrived",
  },
  {
    key: uuidv4(),
    trackingNumber: "YT7136320603122",
    shipRoute: "Air Sensitive",
    joinDate: "Mar 12, 2023",
    pickupLocation: "San Francisco",
    status: "In Shipping",
  },
  {
    key: uuidv4(),
    trackingNumber: "YT7136320603122",
    shipRoute: "Air Sensitive",
    joinDate: "Mar 12, 2023",
    pickupLocation: "Sunnyvale",
    status: "Packed",
  },
  {
    key: uuidv4(),
    trackingNumber: "YT7136320603122",
    shipRoute: "Air Sensitive",
    joinDate: "Mar 12, 2023",
    pickupLocation: "Sunnyvale",
    status: "Order Placed",
  },
  {
    key: uuidv4(),
    trackingNumber: "YT7136320603122",
    shipRoute: "Air Sensitive",
    joinDate: "Mar 12, 2023",
    pickupLocation: "Sunnyvale",
    status: "Order Created",
  },
];

const initialState = {
  shipGroups: sampleShipGroups,
};

const shipGroupSlice = createSlice({
  name: "shipGroup",
  initialState,
  reducers: {
    updateShipGroups: (state, action) => {
      state.shipGroups = action.payload;
    },
  },
});

export const { updateShipGroups } = shipGroupSlice.actions;

export default shipGroupSlice.reducer;
