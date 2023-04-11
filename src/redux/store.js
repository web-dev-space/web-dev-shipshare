import { configureStore } from "@reduxjs/toolkit";
import parcelsReducer from "./parcels/parcels-reducer.js";
import authReducer from "./auth-reducer.js";
import shipGroupReducer from "./shipGroup-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
  },
});

export default store;
