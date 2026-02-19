import { axiosClient } from "./axiosClient";

export async function fileNames() {
  const res = await axiosClient.post("/file-names");
  return res.data;
}

export async function fileContent(payload) {
  const res = await axiosClient.post("/file-content",payload);
  return res.data;
}



export async function backup() {
  const res = await axiosClient.post("/encryptor",{}, {
    responseType: 'blob' 
  });
  return res
}


export async function restore(formData) {
  const res = await axiosClient.post("/decrypt",formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data
}








