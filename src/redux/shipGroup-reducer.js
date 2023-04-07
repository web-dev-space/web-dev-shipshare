import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipGroups: [],
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
