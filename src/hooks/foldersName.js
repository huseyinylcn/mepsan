import { foldersName } from "../api/archiveApi";
import { useState, useEffect } from "react";

export function useFoldersName() {
  ;
  const [loading2, setLoading] = useState(true);
  const [FoldersName, setFoldersName] = useState(true);



  const triggerFoldersName = () => {
    setLoading(true);
    foldersName()
      .then(data => {
 
        setFoldersName(data)
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };


  useEffect(() => {
    triggerFoldersName();
  }, []);

  return { loading2,FoldersName, triggerFoldersName };
}