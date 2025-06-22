// src/utils/refreshToken.js
import axios from "axios";

let refreshTimeout = null;

export const refreshAccessToken = async () => {
  try {
    const authData = localStorage.getItem("auth_data");
    const { token } = JSON.parse(authData);
    const { data } = await axios.get("/api/auth/refresh-token", {
      headers: {
        Authorization: `${token.type} ${token.access}`,
        app_id: process.env.NEXT_PUBLIC_APP_ID,
        app_key: process.env.NEXT_PUBLIC_APP_KEY,
      },
      // withCredentials: true,
    });

    const now = Date.now();
    const originalExpiresIn = data.data.expiresIn;
    data.data.expiresIn = now + originalExpiresIn * 1000;
    localStorage.removeItem("auth_data");
    localStorage.setItem(
      "auth_data",
      JSON.stringify({
        ...JSON.parse(authData),
        token: data.data,
      })
    );

    const refreshEvery =
      originalExpiresIn -
      Number(process.env.NEXT_PUBLIC_TOKEN_REFRESH_EVERY ?? 60); // in seconds
    scheduleTokenRefresh(refreshAccessToken, refreshEvery);

    return data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // throw error;
    return error;
  }
};

export function scheduleTokenRefresh(refreshCallback, offsetSeconds = 840) {
  const authDataStr = localStorage.getItem("auth_data");
  if (!authDataStr) return;

  try {
    const authData = JSON.parse(authDataStr);
    const expiresIn = authData?.token?.expiresIn;
    const now = Date.now();
    const timeLeft = expiresIn - now;
    const refreshIn = timeLeft - offsetSeconds * 1000;

    if (refreshIn <= 0) {
      refreshCallback();
    } else {
      if (refreshTimeout) clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(refreshCallback, refreshIn);
    }
  } catch (err) {
    console.error("Failed to schedule token refresh:", err);
  }
}
