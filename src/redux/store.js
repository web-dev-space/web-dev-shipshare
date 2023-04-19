import { configureStore } from "@reduxjs/toolkit";

import parcelsReducer from "./parcels/parcels-reducer.js";
import authReducer from "./users/auth-reducer.js";
import usersReducer from "./users/users-reducer";
import shipGroupReducer from "./shipGroups/shipGroups-reducer.js";
import postsReducer from "./posts/posts-reducer.js";
import warehouseReducer from "./warehouse/warehouse-reducer";
import dashboardReducer from "redux/dashboard/dashboard-reducer";
import reviewsReducer from "reviews/reviews-reducer.js";

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
