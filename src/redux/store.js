import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import trackerReducer from "./slices/masterTrackerSlice";
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tracker: trackerReducer,
    request: requestReducer,
  },
});
