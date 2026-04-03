import { Save, Network, Trash2, Settings2, Activity, Cog, ChevronDown, Lock } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function ECRSettings({ setActivePage, targetId }) {
  const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();

  const [ECRConfig, setECRConfig] = useState([]);
  const [SettingsMain, setSettingsMain] = useState([]);
  const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);
  const [ECRProtocols, setECRProtocols] = useState([]);
  const [SCPNo, setSCPNo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await triggerTableContent({ tableName: "ECRConfig" });
      if (res1) setECRConfig(res1);

      const res3 = await triggerTableContent({ tableName: "ECRProtocols" });
      if (res3) setECRProtocols(res3);

      const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
      if (res2) setPeriperalDevicesTypedef(res2);

      const res4 = await triggerTableContent({ tableName: "SettingsPorts" });
      if (res4) setSCPNo(res4);

      const res5 = await triggerTableContent({ tableName: "SettingsMain" });
      if (res5) setSettingsMain(res5);
    };
    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...ECRConfig];
    updatedData[index][field] = value;
    setECRConfig(updatedData);
  };

  const handleSave = async (item) => {
    try {
      const result = await triggerTableUpdate({
        tableName: "ECRConfig",
        content: item
      });
      if (result) console.log("Başarıyla güncellendi!");
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-900/20">
            <Settings2 size={24} />
          </div>
          <h2 className="text-3xl font-black text-white">
            ECR Configuration
          </h2>
        </div>

        {/* ECR Mode Status */}
        <div className="flex items-center">
          {SettingsMain?.[0]?.ECRMode === 1 ? (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              Açık
            </span>
          ) : (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-slate-800 text-slate-500 border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-slate-600 mr-2" />
              Kapalı
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {ECRConfig.map((item, index) => (
          <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all shadow-lg group/card">
            <div className="flex flex-wrap items-center gap-6">

              {/* ID Badge */}
              <div className="min-w-[100px]">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Device</div>
                <div className="text-xl font-black text-blue-500">#{item.ID || "000"}</div>
              </div>

              {/* Form Fields Grid */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Device (Locked) */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Device</label>
                    <button
                      onClick={() => {setActivePage("deviceSettings"); targetId(item.DeviceID)}}
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-700 transition-all active:scale-95 group/btn"
                    >
                      <span className="text-[10px] font-bold uppercase">Detail</span>
                      <Cog size={14} className="group-hover/btn:rotate-90 transition-transform" />
                    </button>
                  </div>
                  <div className="w-full bg-slate-800/50 border border-slate-700 text-slate-400 text-sm font-bold rounded-xl p-3 flex justify-between items-center cursor-not-allowed">
                    <span>{PeriperalDevicesTypedef.find(p => p.ID === item.DeviceID)?.DeviceName || "Seçili Cihaz Yok"}</span>
                    <Lock size={14} className="text-slate-600" />
                  </div>
                </div>

                {/* Protocol Selector */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Protocol</label>
                    <button
                      onClick={() => {setActivePage("ecrProtocol"); targetId(item.Protocol)}}
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
                      {ECRProtocols.map(p => <option key={p.ID} value={p.ID} className="bg-slate-900">{p.Name}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* SCP Selector */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">SCP</label>
                    <button
                      onClick={() => {setActivePage("portSettings"); targetId(item.SCPNo) }}
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

                {/* Network & Config Inputs */}
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
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 ml-auto md:border-l md:pl-6 border-slate-800 justify-center">
                <button
                  disabled={loading3}
                  onClick={() => handleSave(item)}
                  className={`p-3 rounded-xl transition-all group ${
                    loading3 ? "text-blue-400 bg-slate-800 cursor-not-allowed" : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
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