import { Save, Network, Trash2, Settings2, Activity, Cog, Lock } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function LogSettings({ setActivePage,targetId }) {
    const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();
    const [SettingsLog, setSettingsLog] = useState([]);
    const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(targetId)
            let res1 = await triggerTableContent({ tableName: "SettingsLog" });
            res1 = res1.filter(obj => obj.DeviceID == targetId || targetId == -1)
            if (res1) setSettingsLog(res1);

            const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
            if (res2) setPeriperalDevicesTypedef(res2);
        };
        fetchData();
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
                        LOG Settings
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Sistem ve cihaz loglama parametrelerini yönetin.</p>
                </div>
            </div>

            <div className="space-y-4">
                {SettingsLog.map((item, index) => (
                    <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all shadow-lg group/card">
                        <div className="flex flex-wrap items-center gap-6">

                            {/* ID Badge */}
                            <div className="min-w-[100px]">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Log ID</div>
                                <div className="text-xl font-black text-blue-500">#{item.ID || "000"}</div>
                            </div>

                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Device (Read-only) */}
                                <div className="flex flex-col gap-1.5 relative group/field">
                                    <div className="flex justify-between items-end px-1 mb-0.5">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Device</label>
                                        <button
                                            onClick={() => {setActivePage("deviceSettings" )}}
                                            className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg hover:bg-slate-700 transition-all active:scale-95 group/btn"
                                        >
                                            <span className="text-[10px] font-bold uppercase">Detail</span>
                                            <Cog size={14} className="group-hover/btn:rotate-90 transition-transform" />
                                        </button>
                                    </div>
                                    <div className="w-full bg-slate-800/50 border border-slate-700 text-slate-400 text-sm font-bold rounded-xl p-3 flex justify-between items-center cursor-not-allowed">
                                        <span>
                                            {PeriperalDevicesTypedef.find(p => p.ID === item.DeviceID)?.DeviceName || "Seçili Cihaz Yok"}
                                        </span>
                                        <Lock size={14} className="text-slate-600" />
                                    </div>
                                </div>

                                {/* Status, Cycle, Size, Name, Path Inputs */}
                                {[
                                    { label: 'Status', field: 'Status' },
                                    { label: 'Cycle', field: 'Cycle' },
                                    { label: 'Size', field: 'Size' },
                                    { label: 'Name', field: 'Name' },
                                    { label: 'Path', field: 'Path' }
                                ].map((input) => (
                                    <div key={input.field} className="flex flex-col gap-1.5 group/field">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase">{input.label}</label>
                                            <Activity size={12} className="text-slate-600 group-hover/field:text-emerald-500 transition-colors" />
                                        </div>
                                        <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                                            <Network size={16} className="text-slate-500" />
                                            <input
                                                type="text"
                                                value={item[input.field] || ""}
                                                onChange={(e) => handleInputChange(index, input.field, e.target.value)}
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