import { axiosClient } from "./axiosClient";

export async function fileNames() {
  const res = await axiosClient.post("/files/v1/file-names");
  return res.data;
}

export async function fileContent(payload) {
  const res = await axiosClient.post("/files/v1/file-content",payload);
  return res.data;
}



export async function backup() {
  const res = await axiosClient.post("/files/v1/encryptor",{}, {
    responseType: 'blob' 
  });
  return res
}


export async function restore(formData) {
  const res = await axiosClient.post("/files/v1/decrypt",formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data
}


export async function pumpsGet() {
  const res = await axiosClient.post("/pumps/v1/get/");
  return res.data
}



export async function login(payload) {
  const res = await axiosClient.post("/user/v1/post/login",payload);
  return res.data
}









