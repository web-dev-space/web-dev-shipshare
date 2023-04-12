import { configureStore } from "@reduxjs/toolkit";

import parcelsReducer from "./parcels/parcels-reducer.js";
import authReducer from "./users/auth-reducer.js";
import usersReducer from "./users/users-reducer";
import shipGroupReducer from "./shipGroups/shipGroups-reducer.js";
import postsReducer from "./posts/posts-reducer.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    parcels: parcelsReducer,
    shipGroup: shipGroupReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
