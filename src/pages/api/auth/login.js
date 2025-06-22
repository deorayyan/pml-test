// /pages/api/auth/login.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and password are required" });
  }

  try {
    const backendResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_AUTH_PATH}/auth/login`,
      {
        appCode: "ASSESSMENT",
        moduleCode: "ALL",
        domain: "",
        user: username,
        password: password,
      },
      {
        headers: {
          app_id: process.env.NEXT_PUBLIC_APP_ID,
          app_key: process.env.NEXT_PUBLIC_APP_KEY,
        },
      }
    );

    const headers = backendResponse.headers;
    Object.keys(headers).forEach((headerName) => {
      res.setHeader(headerName, headers[headerName]);
    });

    return res.status(200).json(backendResponse.data);
  } catch (error) {
    console.error("Proxy login error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      message: "Failed to login",
      detail: error.response?.data || error.message,
    });
  }
}
