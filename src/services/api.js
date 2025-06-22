// src/services/api.js
import axios from "axios";
import { logout, clearAuthData } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    app_id: process.env.NEXT_PUBLIC_APP_ID,
    app_key: process.env.NEXT_PUBLIC_APP_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth_data");
    if (authData) {
      const { token } = JSON.parse(authData);
      config.headers.Authorization = `${token.type} ${token.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authData = store.getState().auth.authData;
      await store.dispatch(logout(authData));
      store.dispatch(clearAuthData());

      if (typeof window !== "undefined") {
        window.location.reload();
      }

      return Promise.reject(err);
    }

    return Promise.reject(error);
  }
);

export default api;
