// src/config/api.js
import axios from "axios";

// Base URL for all API requests
const API_BASE_URL = "https://milklogs-backend.vercel.app/";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor — Add JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("milklogs_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor — handle 401 or future use
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global error cases here
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default api;

export const register = ({ username, email }) =>
  api.post("/auth/register", { username, email });

export const verifyOtp = ({ username, email, otp }) =>
  api.post("/auth/verify-otp", { username, email, otp });

export const login = ({ email }) => api.post("/auth/login", { email });

export const loginVerifyOtp = ({ email, otp }) =>
  api.post("/auth/login-verify-otp", { email, otp });

export const fetchCurrentUser = () => api.get("/auth/getuser");
