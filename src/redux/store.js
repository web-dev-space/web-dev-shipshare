import { configureStore } from "@reduxjs/toolkit";
import parcelReducer from "./parcel-reducer.js";
import authReducer from "./auth-reducer.js";
import shipGroupReducer from "./shipGroup-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcel: parcelReducer,
    shipGroup: shipGroupReducer,
  },
});

export default store;
