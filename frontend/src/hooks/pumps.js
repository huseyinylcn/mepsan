import { pumpsGet } from "../api/api";
import { useState, useEffect } from "react";

export function usePumps() {
    ;

    const [pumps, setPumps] = useState([]);



    const triggerPumps = () => {

        pumpsGet()
            .then(data => {
        
                setPumps(data.data.pumps)

            })
            .catch(() => { });
    };


    useEffect(() => {
 triggerPumps();

       const interval = setInterval(() => {
            triggerPumps();
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return { pumps, triggerPumps };
}