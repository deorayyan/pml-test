// /pages/auth/api/refresh-token.js
import { getCleanHeaders } from "@/utils/utils";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const backendResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_PATH}/auth/token/refresh`,
      {
        headers: getCleanHeaders(req.headers),
        // withCredentials: true,
      }
    );

    const headers = backendResponse.headers;
    Object.keys(headers).forEach((headerName) => {
      res.setHeader(headerName, headers[headerName]);
    });

    return res.status(200).json(backendResponse.data);
  } catch (error) {
    console.error(error.request);
    return res.status(error.response?.status || 500).json({
      message: "Failed to refresh token",
      detail: error.response?.data || error.message,
    });
  }
}
