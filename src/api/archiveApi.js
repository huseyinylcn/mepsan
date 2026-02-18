import { axiosClient } from "./axiosClient";

export async function foldersName() {
  const res = await axiosClient.post("/folders-name");
  return res.data;
}

export async function fetchArchiveItem(payload) {
  const res = await axiosClient.post("/folders-content",payload);
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


export async function killAppItems() {
  const res = await axiosClient.post("/kill-app");
  return res.data;
}


export async function pumpAddItems() {
  const res = await axiosClient.post("/pump-add");
  return res.data;
}





