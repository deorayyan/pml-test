// src/redux/slices/globalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "globalState",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
