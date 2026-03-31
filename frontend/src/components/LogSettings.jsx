
import { Save, Network, Trash2, Settings2, Activity, Cog, Lock } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';



export default function LogSettings({ onNavigate }) {

    const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();
    const [SettingsLog, setSettingsLog] = useState([]);
    const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);





    useEffect(() => {
        const fetchData = async () => {
            const res1 = await triggerTableContent({ tableName: "SettingsLog" });
            if (res1) setSettingsLog(res1)

            const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
            if (res2) setPeriperalDevicesTypedef(res2)

        }
        fetchData()


    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...SettingsLog];
        updatedData[index][field] = value;
        setSettingsLog(updatedData);
    };




    const handleSave = async (item) => {
        try {
            const result = await triggerTableUpdate({
                tableName: "SettingsLog",
                content: item
            });

            if (result) {
                console.log("ok!");
            }
        } catch (err) {
            console.error(":", err);
        }
    };


    return (
        <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <Settings2 size={24} />
                        </div>

                        LOG Settings
                    </h2>
                </div>

            </div>

            <div className="space-y-4">
                {SettingsLog.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 transition-all shadow-sm">
                        <div className="flex flex-wrap items-center gap-6">

                            <div className="min-w-[100px]">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1"> </div>
                                <div className="text-xl font-black text-slate-800">#{item.ID || "000"}</div>
                            </div>

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






                                <div className="flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase">Status</label>
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Activity size={12} />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Network size={16} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={item.Status || ""}
                                            onChange={(e) => handleInputChange(index, 'Status', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase">Cycle</label>
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Activity size={12} />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Network size={16} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={item.Cycle || ""}
                                            onChange={(e) => handleInputChange(index, 'Cycle', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase">Size</label>
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Activity size={12} />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Network size={16} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={item.Size || ""}
                                            onChange={(e) => handleInputChange(index, 'Size', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                                        />
                                    </div>
                                </div>



                                <div className="flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase">Name</label>
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Activity size={12} />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Network size={16} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={item.Name || ""}
                                            onChange={(e) => handleInputChange(index, 'Name', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase">Path</label>
                                        <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                                            <Activity size={12} />
                                        </button>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                        <Network size={16} className="text-slate-400" />
                                        <input
                                            type="text"
                                            value={item.Path || ""}
                                            onChange={(e) => handleInputChange(index, 'Path', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none"
                                        />
                                    </div>
                                </div>




                            </div>


                            <div className="flex flex-col gap-2 ml-auto md:border-l md:pl-6 border-slate-100 justify-center">
                                <button
                                    disabled={loading3}
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
