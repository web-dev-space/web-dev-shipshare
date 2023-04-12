import { configureStore } from "@reduxjs/toolkit";
import parcelsReducer from "./parcels/parcels-reducer.js";
import shipGroupReducer from "./shipGroup-reducer.js";
import groupsReducer from "./groups/groups-reducer";
import authReducer from "./users/auth-reducer.js";
import usersReducer from "./users/users-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
    groups: groupsReducer,
    users: usersReducer,
  },
});

export default store;
