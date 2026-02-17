import { axiosClient } from "./axiosClient";

export async function fetchArchiveItems() {
  const res = await axiosClient.get("/folder-read");
  return res.data;
}
