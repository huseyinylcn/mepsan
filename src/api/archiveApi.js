import { axiosClient } from "./axiosClient";

export async function fetchArchiveItems() {
  const res = await axiosClient.post("/folder-read");
  return res.data;
}


export async function archiveItems() {
  const res = await axiosClient.post("/encryptor");
  return res.data;
}

export async function restoreArchiveItems() {
  const res = await axiosClient.post("/decrypt");
  return res.data;
}


