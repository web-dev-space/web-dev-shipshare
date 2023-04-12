import { configureStore } from "@reduxjs/toolkit";
import parcelsReducer from "redux//parcels/parcels-reducer.js";
import authReducer from "redux//auth-reducer.js";
import shipGroupReducer from "redux//shipGroups/shipGroups-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
  },
});

export default store;
