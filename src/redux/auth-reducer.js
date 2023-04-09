import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  role: "buyer"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateRole: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { updateUser, updateToken } = authSlice.actions;

export default authSlice.reducer;
