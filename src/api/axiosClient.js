import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
