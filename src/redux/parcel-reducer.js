import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parcels: [],
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {
    updateParcels: (state, action) => {
      state.parcels = action.payload;
    },
  },
});

export const { updateParcels } = parcelSlice.actions;

export default parcelSlice.reducer;
