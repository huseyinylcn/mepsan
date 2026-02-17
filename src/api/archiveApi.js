import { axiosClient } from "./axiosClient";

export async function fetchArchiveItems() {
  const res = await axiosClient.get("/posts");
  return res.data;
}
