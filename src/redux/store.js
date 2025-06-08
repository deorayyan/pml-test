import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import trackerReducer from "./slices/masterTrackerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tracker: trackerReducer,
  },
});
