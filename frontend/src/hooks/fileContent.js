
import { fileContent, backup, restore} from "../api/api";
import  { useState } from "react";


export function useFoldersContent() {
  const [state, setState] = useState({
    items: {},
    loading: false,
    error: null,
    processing:false
  });

 


    async function load(payload) {
      try {
        const data = await fileContent({fileName:payload});
        
        setState({
          items: data,
          loading: false,
          error: null,
        });
      } catch (e) {
      
        setState(prev => ({ ...prev, loading: false, error: e }));
      }
    }
   

const handleBackup = async () => {
  try {
    setState(prev => ({ ...prev, processing: true }));
    const response = await backup();

   
    const blob = new Blob([response.data], { type: 'application/octet-stream' });
    

    const url = window.URL.createObjectURL(blob);
    

    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let fileName = 'backup.zip.enc';
    if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename=(.+)/);
        if (fileNameMatch.length > 1) fileName = fileNameMatch[1];
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.log("İndirme hatası:", err);
  } finally {
    setState(prev => ({ ...prev, processing: false }));
  }
};




const handleRestore = async (file) => {
  
  if (!file) return;

  try {
    setState(prev => ({ ...prev, processing: true }));

    const formData = new FormData();

    formData.append('file', file,file.name); 


    const response = await restore(formData);
    
    console.log("Geri yükleme başarılı:", response);
    window.location.reload()

  } catch (err) {
    console.error("Geri yükleme hatası:", err);
  } finally {
    setState(prev => ({ ...prev, processing: false }));
  }
};




  return {...state, load, handleBackup,handleRestore};
}