// axiosConfig.js
import axios from "axios";
import { API_URL, getAccessToken, isProd } from "./config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: isProd // Enable credentials (cookies)
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = Cookies.get("access_token");

    const accessToken = getAccessToken()?.toString();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
