import { createSlice } from "@reduxjs/toolkit";

import { v4 as uuidv4 } from "uuid";
import sampleShipGroups from "../sampleData/shipGroups.js"


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
