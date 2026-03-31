import { Orbit, Save, Trash2, Cpu, Edit3, Terminal } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function DeviceSettings({ onNavigate,targetId }) {
  const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
  const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res1 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
      res1 = res1.filter(obj => obj.ID == targetId || targetId == -1)
      if (res1) setPeriperalDevicesTypedef(res1);
    };
    fetchData();
  }, []);


  const handleInputChange = (index, field, value) => {
    const updatedData = [...PeriperalDevicesTypedef];
    updatedData[index][field] = value;
    setPeriperalDevicesTypedef(updatedData);
  };


  const handleSave = async (item) => {
    console.log("Güncelleniyor:", item);
    await triggerTableUpdate({
      tableName: "PeriperalDevicesTypedef",
      content: item
    });
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <Cpu size={24} />
            </div>
            Device Configuration
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Manage and define peripheral device types.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading2 && PeriperalDevicesTypedef.length === 0 ? (
          <div className="text-center py-20 text-slate-400 animate-pulse font-bold">
            Loading devices...
          </div>
        ) : (
          PeriperalDevicesTypedef.map((item, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-400 transition-all shadow-sm">
              <div className="flex items-center gap-8">

                <div className="min-w-[80px] border-r border-slate-100 pr-6">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Type ID</div>
                  <div className="text-xl font-black text-slate-800">#{item.ID}</div>
                </div>

                <div className="flex-grow flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Edit3 size={12} /> Device Name
                    </label>
                  </div>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                    <input
                      type="text"
                      value={item.DeviceName || ""}
                      onChange={(e) => handleInputChange(index, 'DeviceName', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-700"
                      placeholder="Enter device name..."
                    />
                  </div>
                </div>









                <div className="flex items-center gap-2 ml-4">
                  <button
                    type="button"
                     onClick={() => onNavigate("dotSettings")} 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 border border-slate-200"
                  >
                    <Orbit size={14}className="text-indigo-600" />
                    Dot Settings
                  </button>

                  <button
                    type="button"
                     onClick={() => onNavigate("logSettings")} 
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 border border-emerald-200"
                  >
                    <Terminal size={14} />
                    Log Settings
                  </button>
                </div>

















                <div className="flex flex-col gap-2 ml-auto border-l pl-6 border-slate-100">
                  <button
                    onClick={() => handleSave(item)}
                    disabled={loading3}
                    className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all group disabled:opacity-30"
                    title="Save Changes"
                  >
                    <Save size={20} className="group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
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

      {PeriperalDevicesTypedef.length === 0 && !loading2 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed text-slate-400">
          No device types found.
        </div>
      )}
    </div>
  );
}