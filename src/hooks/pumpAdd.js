import { pumpAddItems } from "../api/archiveApi";
import { useState, useEffect } from "react";

export function usePumpAdd() {
;
  const [loading2, setLoading] = useState(true);


  const triggerPump = () => {
    setLoading(true);
    pumpAddItems()
      .then(data => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };


  useEffect(() => {
    triggerPump();
  }, []);

  return { loading2, triggerPump };
}