import { Save, Network, Trash2, Settings2, Activity, Cog, ChevronDown, Lock, Fuel } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function PumpSettings({ setActivePage, targetSetId }) {
  const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();
  const [DispenserConfig, setDispenserConfig] = useState([]);
  const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);
  const [DispenserProtocol, setDispenserProtocol] = useState([]);
  const [SCPNo, setSCPNo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await triggerTableContent({ tableName: "DispenserConfig" });
      if (res1) setDispenserConfig(res1)

      const res3 = await triggerTableContent({ tableName: "DispenserProtocols" });
      if (res3) setDispenserProtocol(res3)

      const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
      if (res2) setPeriperalDevicesTypedef(res2)

      const res4 = await triggerTableContent({ tableName: "SettingsPorts" });
      if (res4) setSCPNo(res4)
    }
    fetchData()
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...DispenserConfig];
    updatedData[index][field] = value;
    setDispenserConfig(updatedData);
  };

  const handleSave = async (item) => {
    try {
      const result = await triggerTableUpdate({
        tableName: "DispenserConfig",
        content: item
      });
      if (result) console.log("ok!");
    } catch (err) {
      console.error(":", err);
    }
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-900/20">
              <Settings2 size={24} />
            </div>
            Pump Configuration
          </h2>
          <p className="text-slate-400 text-sm mt-1">Sistem pompa ve dispenser ayarlarını yönetin.</p>
        </div>
      </div>

      <div className="space-y-4">
        {DispenserConfig.map((item, index) => (
          <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all shadow-lg group/card">
            <div className="flex flex-wrap items-center gap-6">

              {/* ID Badge */}
              <div className="min-w-[100px]">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Device</div>
                <div className="text-xl font-black text-blue-500">#{item.ID || "000"}</div>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Device Selector (Locked) */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Device</label>
                    <button
                      onClick={() => { setActivePage("deviceSettings"); targetSetId(item.DeviceID) }}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-700 transition-all active:scale-95 group/btn"
                    >
                      <span className="text-[10px] font-bold uppercase">Detail</span>
                      <Cog size={14} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                  <div className="w-full bg-slate-800/50 border border-slate-700 text-slate-400 text-sm font-bold rounded-xl p-3 flex justify-between items-center cursor-not-allowed">
                    <span>{PeriperalDevicesTypedef.find(p => p.ID === item.DeviceID)?.DeviceName || "No Device"}</span>
                    <Lock size={14} className="text-slate-600" />
                  </div>
                </div>

                {/* Protocol Selector */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Protocol</label>
                    <button
                      onClick={() =>{ setActivePage("pumpProtocol"); targetSetId(item.Protocol)}}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-700 transition-all"
                    >
                      <span className="text-[10px] font-bold uppercase">Detail</span>
                      <Cog size={14} />
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      value={item.Protocol || ""}
                      onChange={(e) => handleInputChange(index, 'Protocol', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Seçiniz...</option>
                      {DispenserProtocol.map(p => <option key={p.ID} value={p.ID} className="bg-slate-900">{p.Name}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* SCP Selector */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">SCP</label>
                    <button
                      onClick={() =>{ setActivePage("portSettings"); targetSetId(item.SCPNo)}}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-700 transition-all"
                    >
                      <span className="text-[10px] font-bold uppercase">Detail</span>
                      <Cog size={14} />
                    </button>
                  </div>
                  <div className="relative">
                    <select
                      value={item.SCPNo || ""}
                      onChange={(e) => handleInputChange(index, 'SCPNo', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Seçiniz...</option>
                      {SCPNo.map(p => <option key={p.SCPNo} value={p.SCPNo} className="bg-slate-900">{p.Name}</option>)}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* Network Inputs */}
                {['Address', 'Timeout', 'ErrorCycle'].map((field) => (
                  <div key={field} className="flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase">{field}</label>
                      <Activity size={12} className="text-slate-600 group-hover/field:text-emerald-500 transition-colors" />
                    </div>
                    <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                      <Network size={16} className="text-slate-500" />
                      <input
                        type="text"
                        value={item[field] || ""}
                        onChange={(e) => handleInputChange(index, field, e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                ))}

                {/* Nozzle Button */}
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => {setActivePage("dispenserNozzle"); targetSetId(item.ID)}}
                    className="flex items-center justify-center gap-2 h-[46px] bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95 group/btn"
                  >
                    <Fuel size={18} className="group-hover/btn:animate-pulse" />
                    <span className="text-sm font-bold">Pump Nozzles</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 ml-auto md:border-l md:pl-6 border-slate-800 justify-center">
                <button
                  disabled={loading3}
                  onClick={() => handleSave(item)}
                  className={`p-3 rounded-xl transition-all group ${
                    loading3 ? "text-blue-400 bg-slate-800" : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                  title="Kaydet"
                >
                  {loading3 ? (
                    <Activity size={22} className="animate-spin text-blue-500" />
                  ) : (
                    <Save size={22} className="group-hover:scale-110 transition-transform" />
                  )}
                </button>

                <button
                  className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                  title="Sil"
                >
                  <Trash2 size={22} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}