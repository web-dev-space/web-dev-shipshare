import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "redux/dashboard/dashboard-reducer";
import reviewsReducer from "redux/reviews/reviews-reducer.js";
import parcelsReducer from "./parcels/parcels-reducer.js";
import postsReducer from "./posts/posts-reducer.js";
import shipGroupReducer from "./shipGroups/shipGroups-reducer.js";
import authReducer from "./users/auth-reducer.js";
import usersReducer from "./users/users-reducer";
import warehouseReducer from "./warehouse/warehouse-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
    users: usersReducer,
    posts: postsReducer,
    warehouses: warehouseReducer,
    dashboard: dashboardReducer,
    reviews: reviewsReducer,
  },
});

export default store;
