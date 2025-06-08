import axios from "axios";

export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem("refresh_token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/bio/authentication/auth/token/refresh`,
      {
        headers: {
          app_id: process.env.NEXT_PUBLIC_APP_ID,
          app_key: process.env.NEXT_PUBLIC_APP_KEY,
          Authorization: `Bearer ${refreshToken}`,
        },
        // withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
