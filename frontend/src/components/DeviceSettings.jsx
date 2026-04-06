import { Orbit, Save, Trash2, Cpu, Edit3, Terminal, Activity } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function DeviceSettings({ setActivePage, targetId,targetSetId }) {
  const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
  const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res1 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
      if (res1) {
        const filtered = res1.filter(obj => obj.ID == targetId || targetId == -1);
        setPeriperalDevicesTypedef(filtered);
      }
    };
    fetchData();
  }, [targetId]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...PeriperalDevicesTypedef];
    updatedData[index][field] = value;
    setPeriperalDevicesTypedef(updatedData);
  };

  const handleSave = async (item) => {
    await triggerTableUpdate({
      tableName: "PeriperalDevicesTypedef",
      content: item
    });
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-900/20">
              <Cpu size={24} />
            </div>
            Device Configuration
          </h2>
          <p className="text-slate-400 text-sm mt-1">Çevresel cihaz tanımlamalarını ve alt ayarlarını yönetin.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading2 && PeriperalDevicesTypedef.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-pulse">
            <Activity size={40} className="animate-spin mb-4 text-emerald-500" />
            <span className="font-bold tracking-widest uppercase text-xs">Loading devices...</span>
          </div>
        ) : (
          PeriperalDevicesTypedef.map((item, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-lg group/card">
              <div className="flex flex-wrap md:flex-nowrap items-center gap-8">

                {/* Type ID Section */}
                <div className="min-w-[80px] border-r border-slate-800 pr-6">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Type ID</div>
                  <div className="text-xl font-black text-emerald-500">#{item.ID}</div>
                </div>

                {/* Device Name Input */}
                <div className="flex-grow flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Edit3 size={12} className="text-emerald-500" /> Device Name
                    </label>
                  </div>
                  <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                    <input
                      type="text"
                      value={item.DeviceName || ""}
                      onChange={(e) => handleInputChange(index, 'DeviceName', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="Enter device name..."
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3 ml-4">
                  <button
                    type="button"
                    onClick={() =>{ setActivePage("dotSettings"); targetSetId(item.ID)}} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 border border-indigo-500/20"
                  >
                    <Orbit size={16} className="text-indigo-500" />
                    Dot Settings
                  </button>

                  <button
                    type="button"
                    onClick={() =>{ setActivePage("logSettings"); targetSetId(item.ID)}} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 border border-emerald-500/20"
                  >
                    <Terminal size={16} />
                    Log Settings
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2 ml-auto border-l border-slate-800 pl-6">
                  <button
                    onClick={() => handleSave(item)}
                    disabled={loading3}
                    className={`p-3 rounded-xl transition-all group ${
                      loading3 ? "opacity-30 cursor-not-allowed" : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                    }`}
                    title="Save Changes"
                  >
                    {loading3 ? (
                      <Activity size={20} className="animate-spin" />
                    ) : (
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                    )}
                  </button>

                  <button
                    className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                    title="Delete Type"
                  >
                    <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Empty State */}
      {PeriperalDevicesTypedef.length === 0 && !loading2 && (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500">
          <div className="flex justify-center mb-4 text-slate-700">
             <Cpu size={48} />
          </div>
          <p className="font-bold uppercase tracking-widest text-xs">No device types found.</p>
        </div>
      )}
    </div>
  );
}