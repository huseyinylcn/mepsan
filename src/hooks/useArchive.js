import { fetchArchiveItems, archiveItems, restoreArchiveItems } from "../api/archiveApi";
import  { useState, useEffect } from "react";


export function useArchive() {
  const [state, setState] = useState({
    items: [],
    loading: true,
    error: null,
    processing:false
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await fetchArchiveItems();
        if (!isMounted) return;
        setState({
          items: Array.isArray(data) ? data : [],
          loading: false,
          error: null,
        });
      } catch (e) {
        if (!isMounted) return;
        setState(prev => ({ ...prev, loading: false, error: e }));
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);



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




  return {...state, handleArchive,handleRestore};
}