import axios from "axios";


export const axiosClient = axios.create({
  baseURL: "https://df91-78-188-72-174.ngrok-free.app/api/",
  timeout: 55000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});
