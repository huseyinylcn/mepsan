import { axiosClient } from "./axiosClient";

export async function fetchArchiveItems() {
  const res = await axiosClient.post("/folder-read");
  return res.data;
}
