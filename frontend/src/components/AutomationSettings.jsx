
import { Save, Network, Trash2, Settings2, Activity, Cog, ChevronDown, Lock } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';



export default function AutomationSettings({ onNavigate }) {

  const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();

  const [AutomationConfig, setAutomationConfig] = useState([]);
  const [SettingsMain, setSettingsMain] = useState([]);
  const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);
  const [AutomationProtocols, setAutomationProtocols] = useState([]);
  const [SCPNo, setSCPNo] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      const res1 = await triggerTableContent({ tableName: "AutomationConfig" });
      if (res1) setAutomationConfig(res1)


      const res3 = await triggerTableContent({ tableName: "AutomationProtocols" });
      if (res3) setAutomationProtocols(res3)

      const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
      if (res2) setPeriperalDevicesTypedef(res2)

      const res4 = await triggerTableContent({ tableName: "SettingsPorts" });
      if (res4) setSCPNo(res4)


      const res5 = await triggerTableContent({ tableName: "SettingsMain" });
      if (res5) setSettingsMain(res5)

    }
    fetchData()


  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...AutomationConfig];
    updatedData[index][field] = value;
    setAutomationConfig(updatedData);
  };




  const handleSave = async (item) => {
    try {

      const result = await triggerTableUpdate({
        tableName: "AutomationConfig",
        content: item
      });

      if (result) {
        console.log("Başarıyla güncellendi!");

      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
    }
  };


  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700">








      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Settings2 size={24} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            Automation Configuration
          </h2>
        </div>


        <div className="flex items-center">
          {SettingsMain?.[0]?.SCUMode === 1 ? (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-700 border border-green-200">
              Açık
            </span>
          ) : (
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-slate-100 text-slate-500 border border-slate-200">
              Kapalı
            </span>
          )}
        </div>
      </div>







      <div className="space-y-4">
        {AutomationConfig.map((item, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-all shadow-sm">
            <div className="flex flex-wrap items-center gap-6">

              {/* SCP No Kısmı */}
              <div className="min-w-[100px]">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Device </div>
                <div className="text-xl font-black text-slate-800">#{item.ID || "000"}</div>
              </div>

              {/* Form Alanları */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">








                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      Device
                    </label>

                    <button
                      onClick={() => onNavigate("device", item.DeviceID)}
                      className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-blue-600 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-50 hover:shadow-blue-100 transition-all active:scale-95 group/btn"
                      title="Parametreleri Düzenle"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-tight">Detail</span>
                      <Cog
                        size={14}
                        className="group-hover/btn:rotate-90 transition-transform duration-300"
                      />
                    </button>
                  </div>

                  <div className="relative">
                    {/* Select yerine Salt Okunur (Read-only) Görünüm */}
                    <div className="w-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold rounded-xl p-3 flex justify-between items-center cursor-not-allowed select-none">
                      <span>
                        {PeriperalDevicesTypedef.find(p => p.ID === item.DeviceID)?.DeviceName || "Seçili Cihaz Yok"}
                      </span>
                      <Lock size={14} className="text-slate-400" />
                    </div>

                    {/* İpucu: Arka planda formun değerini korumak isterseniz gizli input ekleyebilirsiniz */}
                    <input type="hidden" value={item.DeviceID || ""} />
                  </div>
                </div>







                {/* Protokol + Detay Butonu */}
                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    {/* Label Alanı */}
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      Protocol
                    </label>

                    {/* Daha Belirgin Detay Butonu */}
                    <button
                      onClick={() => onNavigate("automationProtocols")}
                      className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-blue-600 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-50 hover:shadow-blue-100 transition-all active:scale-95 group/btn"
                      title="Parametreleri Düzenle"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-tight">Detail</span>
                      <Cog
                        size={14}
                        className="group-hover/btn:rotate-90 transition-transform duration-300"
                      />
                    </button>
                  </div>


                  <div className="relative">
                    <select
                      value={item.Protocol || ""}
                      onChange={(e) => handleInputChange(index, 'Protocol', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-sm font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all appearance-none"
                    >
                      <option value="">Seçiniz...</option>
                      {AutomationProtocols.map(p => <option key={p.ID} value={p.ID}>{p.Name}</option>)}
                    </select>
                    {/* Custom Arrow yerine Detay Linki eklenebilir */}
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>




                <div className="flex flex-col gap-1.5 relative group/field">
                  <div className="flex justify-between items-end px-1 mb-0.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      SCP
                    </label>

                    <button
                      onClick={() => onNavigate("settingsPorts", item.SCPNo)}
                      className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-blue-600 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-50 hover:shadow-blue-100 transition-all active:scale-95 group/btn"
                      title="Parametreleri Düzenle"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-tight">Detail</span>
                      <Cog
                        size={14}
                        className="group-hover/btn:rotate-90 transition-transform duration-300"
                      />
                    </button>
                  </div>

                  <div className="relative">
                    <select
                      value={item.SCPNo || ""}
                      onChange={(e) => handleInputChange(index, 'SCPNo', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-sm font-bold text-slate-700 rounded-xl p-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Seçiniz...</option>
                      {SCPNo.map(p => (
                        <option key={p.SCPNo} value={p.SCPNo}>
                          {p.Name}
                        </option>
                      ))}
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>



                <div className="flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Address</label>
                    <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                      <Activity size={12} />
                    </button>
                  </div>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Network size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={item.Address || ""}
                      onChange={(e) => handleInputChange(index, 'Address', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                    />
                  </div>
                </div>


                {/* Timeout  */}
                <div className="flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Timeout</label>
                    <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                      <Activity size={12} />
                    </button>
                  </div>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Network size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={item.Timeout || ""}
                      onChange={(e) => handleInputChange(index, 'Timeout', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                    />
                  </div>
                </div>


                {/* ErrorCycle  */}
                <div className="flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">ErrorCycle</label>
                    <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                      <Activity size={12} />
                    </button>
                  </div>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Network size={16} className="text-slate-400" />
                    <input
                      type="text"
                      value={item.ErrorCycle || ""}
                      onChange={(e) => handleInputChange(index, 'ErrorCycle', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                    />
                  </div>
                </div>


              </div>

              {/* En Sağdaki Küçük Aksiyonlar */}

              <div className="flex flex-col gap-2 ml-auto md:border-l md:pl-6 border-slate-100 justify-center">
                {/* Kaydet Butonu - Genelde en üstte durması daha güvenli hissettirir */}
                <button
                  disabled={loading3} // İşlem bitene kadar tekrar tıklanmasın
                  onClick={() => handleSave(item)}
                  className={`p-3 rounded-xl transition-all group ${loading3 ? "text-blue-400 bg-blue-50 cursor-not-allowed" : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  title="Kaydet"
                >
                  {loading3 ? (
                    <Activity size={20} className="animate-spin text-blue-600" />
                  ) : (
                    <Save size={20} className="group-hover:scale-110 transition-transform" />
                  )}
                </button>

                {/* Silme Butonu */}
                <button
                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all group"
                  title="Sil"

                >
                  <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
