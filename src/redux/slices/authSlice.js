import api from "@/services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const res = await api.post("/api/v1/bio/authentication/auth/login", {
      appCode: "ASSESSMENT",
      moduleCode: "ALL",
      domain: "",
      user: username,
      password: password,
    });
    return res.data.data;
  }
);

export const fetchMenu = createAsyncThunk("auth/menu", async () => {
  const res = await api.get(
    "/api/v1/bio/authentication/auth/authorization?nested=true"
  );
  return res.data.data;
});

export const logout = createAsyncThunk("auth/logout", async (userData) => {
  const res = await api.post("/api/v1/bio/authentication/auth/logout", {
    appCode: "ASSESSMENT",
    moduleCode: "ALL",
    domain: "",
    user: userData.user,
  });
  return res.data.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    refreshToken: null,
    userData: null,
    loading: false,
    loadingMenu: false,
    menu: [],
  },
  reducers: {
    setAuthData(state, action) {
      state.accessToken = action.payload.token;
      state.refreshToken = action.payload.refresh_token;
      state.userData = action.payload.user_data;
    },
    setMenu(state, action) {
      state.menu = action.payload;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userData = null;
      state.menu = [];

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("user_data");
        sessionStorage.removeItem("menu");
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.refreshToken = action.payload.refresh_token;
        state.userData = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMenu.pending, (state) => {
        state.loadingMenu = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loadingMenu = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loadingMenu = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.loadingMenu = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMenu = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.loadingMenu = false;
        state.error = action.error.message;
      });
  },
});

export const { setAuthData, clearAuthData, setMenu, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
