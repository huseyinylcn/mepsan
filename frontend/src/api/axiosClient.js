import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // LocalStorage'dan güncel token'ı al
    const token = localStorage.getItem("token");

    // Eğer token varsa, header'a ekle
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
