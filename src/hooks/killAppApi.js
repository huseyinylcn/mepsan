import { killAppItems } from "../api/archiveApi";
import { useState, useEffect } from "react";

export function useKillApp() {
;
  const [loading, setLoading] = useState(true);


  const triggerKill = () => {
    setLoading(true);
    killAppItems()
      .then(data => {
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };


  useEffect(() => {
    triggerKill();
  }, []);

  return { loading, triggerKill };
}