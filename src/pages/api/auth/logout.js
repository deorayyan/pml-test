// /pages/api/auth/logout.js
import api from "@/services/api";
import { getCleanHeaders } from "@/utils/utils";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { user } = req.body;

  if (!user) {
    return res.status(401).json({ message: "User are required" });
  }

  try {
    const backendResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_PATH}/auth/logout`,
      {
        appCode: "ASSESSMENT",
        moduleCode: "ALL",
        domain: "",
        user,
      },
      {
        headers: getCleanHeaders(req.headers),
      },
      {
        withCredentials: true,
      }
    );
    res.setHeader("Set-Cookie", [
      `RefreshToken=; Path=/; Max-Age=0; HttpOnly;`,
    ]);

    return res.status(200).json(backendResponse.data);
  } catch (error) {
    console.error("Proxy logout error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      message: "Failed to logout",
      detail: error.response?.data || error.message,
    });
  }
}
