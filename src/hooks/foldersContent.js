
import { fetchArchiveItem, archiveItems, restoreArchiveItems } from "../api/archiveApi";
import  { useState, useEffect } from "react";


export function useFoldersContent(payload) {
  const [state, setState] = useState({
    items: {},
    loading: false,
    error: null,
    processing:false
  });

 


    async function load(payload) {
      try {
        const data = await fetchArchiveItem({fileName:payload});
        
        setState({
          items: data,
          loading: false,
          error: null,
        });
      } catch (e) {
      
        setState(prev => ({ ...prev, loading: false, error: e }));
      }
    }
   




  const handleArchive = async () => {
    try {
      setState(true);
      await archiveItems();
     window.location.reload();
    } catch (err) {
      console.log(err)
    } finally {
      setState(false);
    }
  };

    const handleRestore = async () => {
    try {
      setState(true);
      await restoreArchiveItems();
     window.location.reload();
    } catch (err) {
      console.log(err)
    } finally {
      setState(false);
    }
  };




  return {...state, handleArchive,handleRestore,load};
}