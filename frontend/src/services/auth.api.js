// services/authService.js

import axios from "axios";

// ✅ Create API instance
const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: response interceptor (better error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || "Something went wrong";
    console.error("API Error:", message);
    return Promise.reject(message);
  }
);

// ✅ Register
export const register = async ({ username, email, password }) => {
  const { data } = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return data;
};

// ✅ Login
export const login = async ({ email, password }) => {
  const { data } = await api.post("/api/auth/login", {
    email,
    password,
  });

  return data;
};

// ✅ Logout
export const logout = async () => {
  const { data } = await api.get("/api/auth/logout");
  return data;
};

// ✅ Get current user
export const getMe = async () => {
  const { data } = await api.get("/api/auth/get-me");
  return data;
};