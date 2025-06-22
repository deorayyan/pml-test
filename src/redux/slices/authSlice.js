// src/redux/slices/authSlice.js
import api from "@/services/api";
import { refreshAccessToken, scheduleTokenRefresh } from "@/utils/refreshToken";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    try {
      const res = await axios.post(
        `/api/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const originalExpiresIn = res.data.data.token.expiresIn;
      const refreshEvery =
        originalExpiresIn -
        Number(process.env.NEXT_PUBLIC_TOKEN_REFRESH_EVERY ?? 60); // in seconds
      scheduleTokenRefresh(refreshAccessToken, refreshEvery);
      return res.data.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchMenu = createAsyncThunk("auth/menu", async () => {
  const { data: nestedMenu } = await api.get(
    `${process.env.NEXT_PUBLIC_AUTH_PATH}/auth/authorization`,
    {
      params: {
        nested: true,
      },
    }
  );
  const { data: flatMenu } = await api.get(
    `${process.env.NEXT_PUBLIC_AUTH_PATH}/auth/authorization`
  );
  return {
    nestedMenu: nestedMenu.data,
    flatMenu: flatMenu.data,
  };
});

export const logout = createAsyncThunk("auth/logout", async (userData) => {
  const authData = localStorage.getItem("auth_data");
  const { token } = JSON.parse(authData);
  const res = await axios.post(
    `/api/auth/logout`,
    {
      appCode: "ASSESSMENT",
      moduleCode: "ALL",
      domain: "",
      user: userData.user,
    },
    {
      headers: {
        Authorization: `${token.type} ${token.access}`,
        app_id: process.env.NEXT_PUBLIC_APP_ID,
        app_key: process.env.NEXT_PUBLIC_APP_KEY,
      },
    }
  );
  return res.data.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: null,
    loading: false,
    loadingMenu: false,
    menu: [],
    flatMenu: [],
  },
  reducers: {
    setAuthData(state, action) {
      state.authData = action.payload;
    },
    setMenu(state, action) {
      state.menu = action.payload.nestedMenu;
      state.flatMenu = action.payload.flatMenu;
    },
    clearAuthData(state) {
      state.authData = null;
      state.menu = [];
      state.flatMenu = [];
      // Cookies.remove("RefreshToken", { path: "/" });
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_data");
        localStorage.removeItem("menu");
        localStorage.removeItem("flat_menu");
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
        state.authData = action.payload;
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
        state.menu = action.payload.nestedMenu;
        state.flatMenu = action.payload.flatMenu;
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
        // state.authData = null;
        // state.menu = [];
        // state.flatMenu = [];
        // Cookies.remove("RefreshToken", { path: "/" });

        if (typeof window !== "undefined") {
          // localStorage.removeItem("auth_data");
          // localStorage.removeItem("menu");
          // localStorage.removeItem("flat_menu");
        }
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
