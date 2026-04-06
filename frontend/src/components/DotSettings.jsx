import { Save, Network, Trash2, Settings2, Activity, Cog, Lock } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function DotSettings({ setActivePage, targetId, targetSetId }) {
    const { triggerTableContent, triggerTableUpdate, loading3 } = useTables();
    const [SettingsDot, setSettingsDot] = useState([]);
    const [PeriperalDevicesTypedef, setPeriperalDevicesTypedef] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res1 = await triggerTableContent({ tableName: "SettingsDot" });
            res1 = res1.filter(obj => obj.DeviceID == targetId || targetId == -1)
            if (res1) setSettingsDot(res1)

            const res2 = await triggerTableContent({ tableName: "PeriperalDevicesTypedef" });
            if (res2) setPeriperalDevicesTypedef(res2)
        }
        fetchData()
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...SettingsDot];
        updatedData[index][field] = value;
        setSettingsDot(updatedData);
    };

    const handleSave = async (item) => {
        try {
            const result = await triggerTableUpdate({
                tableName: "SettingsDot",
                content: item
            });
            if (result) console.log("ok!");
        } catch (err) {
            console.error(":", err);
        }
    };

    return (
        // Arka plan koyulaştırıldı: bg-slate-950
        <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">

            {/* Header Alanı: bg-slate-900, border-slate-800 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg text-white shadow-lg shadow-blue-500/20">
                            <Settings2 size={24} />
                        </div>
                        Dot Settings
                    </h2>
                </div>
            </div>

            <div className="space-y-4">
                {SettingsDot.map((item, index) => (
                    // Kartlar: bg-slate-900, hover:border-blue-500/50
                    <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all shadow-lg group/card">
                        <div className="flex flex-wrap items-center gap-6">

                            <div className="min-w-[100px]">
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Row ID</div>
                                <div className="text-xl font-black text-blue-400">#{item.ID || "000"}</div>
                            </div>

                            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">

                                <div className="flex flex-col gap-1.5 relative group/field">
                                    <div className="flex justify-between items-end px-1 mb-0.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                                            Device
                                        </label>

                                        <button
                                            onClick={() => {setActivePage("deviceSettings"); targetSetId(item.DeviceID)   }}
                                            className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-500/10 transition-all active:scale-95 group/btn"
                                        >
                                            <span className="text-[10px] font-bold uppercase tracking-tight">Detail</span>
                                            <Cog size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <div className="w-full bg-slate-950 border border-slate-800 text-slate-400 text-sm font-bold rounded-xl p-3 flex justify-between items-center cursor-not-allowed select-none">
                                            <span>
                                                {PeriperalDevicesTypedef.find(p => p.ID === item.DeviceID)?.DeviceName || "No Device Selected"}
                                            </span>
                                            <Lock size={14} className="text-slate-600" />
                                        </div>
                                        <input type="hidden" value={item.DeviceID || ""} />
                                    </div>
                                </div>

                                {/* Dinamik Input Alanları için Ortak Stil Fonksiyonu Değil, Direkt Uygulama: */}
                                {[
                                    { label: 'Volume', field: 'Volume' },
                                    { label: 'Amount', field: 'Amount' },
                                    { label: 'UnitPrice', field: 'UnitPrice' },
                                    { label: 'TotalVolume', field: 'TotalVolume' },
                                    { label: 'TotalAmount', field: 'TotalAmount' }
                                ].map((input) => (
                                    <div key={input.field} className="flex flex-col gap-1.5 group/field">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[11px] font-bold text-slate-500 uppercase">{input.label}</label>
                                            <button className="text-slate-600 hover:text-emerald-400 transition-colors">
                                                <Activity size={12} />
                                            </button>
                                        </div>
                                        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all">
                                            <Network size={16} className="text-slate-600 group-focus-within/field:text-blue-400" />
                                            <input
                                                type="text"
                                                value={item[input.field] || ""}
                                                onChange={(e) => handleInputChange(index, input.field, e.target.value)}
                                                className="bg-transparent border-none w-full text-slate-200 text-sm font-bold p-3 outline-none placeholder-slate-700"
                                            />
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Action Buttons: Border rengi güncellendi */}
                            <div className="flex flex-col gap-2 ml-auto md:border-l md:pl-6 border-slate-800 justify-center">
                                <button
                                    disabled={loading3}
                                    onClick={() => handleSave(item)}
                                    className={`p-3 rounded-xl transition-all group ${
                                        loading3 
                                        ? "text-blue-400 bg-blue-500/10 cursor-not-allowed" 
                                        : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                                    }`}
                                    title="Kaydet"
                                >
                                    {loading3 ? (
                                        <Activity size={20} className="animate-spin" />
                                    ) : (
                                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                                    )}
                                </button>

                                <button
                                    className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
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