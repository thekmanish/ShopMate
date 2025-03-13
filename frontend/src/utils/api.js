import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Change this to your backend URL
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  
  (error) => Promise.reject(error)
);

export default api;
