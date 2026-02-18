import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://6a33-78-188-72-174.ngrok-free.app/api/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
