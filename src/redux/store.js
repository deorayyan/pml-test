import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import authReducer from "./slices/authSlice";
import trackerReducer from "./slices/masterTrackerSlice";
import requestReducer from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    globalState: globalReducer,
    auth: authReducer,
    tracker: trackerReducer,
    request: requestReducer,
  },
});
