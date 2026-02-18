import React from "react";
import { useKillApp } from "./../hooks/killAppApi"
import { usePumpAdd } from "./../hooks/pumpAdd"


export default function Dashboard() {
  const { loading =false, triggerKill } = useKillApp();
  const { loading2 = false, triggerPump  } = usePumpAdd();





  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-12 md:pt-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        </div>

        <div className="flex gap-3">
          <button
          onClick={triggerPump} 
            disabled={loading2}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-400"
          
        //  className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
               >
            {loading2 ? "Being Processed..." : "Pump Add"}
          </button>

          <button
            onClick={triggerKill} 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-400"
          >
            {loading ? "Being Processed..." : "Kill App"}
          </button>
        </div>
      </div>



  
      <div className="bg-white rounded-xl border border-slate-200 border-dashed h-64 flex items-center justify-center text-slate-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum asperiores perferendis aperiam.
      </div>
    </div>
  );
}