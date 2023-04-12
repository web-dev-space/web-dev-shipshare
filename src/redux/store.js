import { configureStore } from "@reduxjs/toolkit";

import parcelsReducer from "./parcels/parcels-reducer.js";
import authReducer from "./auth-reducer.js";
import shipGroupReducer from "./shipGroups/shipGroups-reducer.js";
import postsReducer from "./posts/posts-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
    posts: postsReducer,
  },
});

export default store;
