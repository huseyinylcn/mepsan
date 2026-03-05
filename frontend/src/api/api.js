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


export async function usersAPI() {
  const res = await axiosClient.get("/user/v1/get/all");
  return res.data
}



export async function userUpdate(payload) {
  const res = await axiosClient.post("/user/v1/update",payload);
  return res.data
}


export async function userDelete(payload) {
  const res = await axiosClient.delete("/user/v1/delete",{data:payload});
  return res.data
}


export async function userAdd(payload) {
  const res = await axiosClient.post("/user/v1/post/signup",payload);
  return res.data
}

export async function meApi() {
  const res = await axiosClient.post("/user/v1/me");
  return res.data
}


export async function logoutApi() {
  const res = await axiosClient.post("/user/v1/logout");
  return res.data
}











