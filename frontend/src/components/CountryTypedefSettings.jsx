import { Orbit, Save, Trash2, Cpu, Edit3, Terminal } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function CountryTypedefSettings({ setActivePage, targetId }) {
    const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
    const [CountryTypedef, setCountryTypedef] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res1 = await triggerTableContent({ tableName: "CountryTypedef" });
            res1 = res1.filter(obj => obj.ID == targetId || targetId == -1)
            if (res1) setCountryTypedef(res1);
        };
        fetchData();
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...CountryTypedef];
        updatedData[index][field] = value;
        setCountryTypedef(updatedData);
    };

    const handleSave = async (item) => {
        await triggerTableUpdate({
            tableName: "CountryTypedef",
            content: item
        });
    };

    return (
        // Ana Konteyner: bg-slate-950
        <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">

            {/* Header: bg-slate-900 & border-slate-800 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div>
                    <h2 className="text-3xl font-black text-white flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-lg shadow-emerald-500/20">
                            <Cpu size={24} />
                        </div>
                        Country Configuration
                    </h2>
                </div>
            </div>

            <div className="space-y-4">
                {loading2 && CountryTypedef.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 animate-pulse font-bold">
                        Loading Country...
                    </div>
                ) : (
                    CountryTypedef.map((item, index) => (
                        // Kartlar: bg-slate-900
                        <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-lg group/card">
                            <div className="flex flex-wrap items-center gap-8">

                                {/* ID Bölümü */}
                                <div className="min-w-[80px] border-r border-slate-800 pr-6">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ID</div>
                                    <div className="text-xl font-black text-emerald-400">#{item.ID}</div>
                                </div>

                                {/* Country No Input */}
                                <div className="flex-grow flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Edit3 size={12} /> Country No
                                        </label>
                                    </div>
                                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                                        <input
                                            type="text"
                                            value={item.No || ""}
                                            onChange={(e) => handleInputChange(index, 'No', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder-slate-700"
                                            placeholder="Enter no..."
                                        />
                                    </div>
                                </div>

                                {/* Country Name Input */}
                                <div className="flex-grow flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Edit3 size={12} /> Country Name
                                        </label>
                                    </div>
                                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                                        <input
                                            type="text"
                                            value={item.Name || ""}
                                            onChange={(e) => handleInputChange(index, 'Name', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder-slate-700"
                                            placeholder="Enter name..."
                                        />
                                    </div>
                                </div>

                                {/* Aksiyon Butonları */}
                                <div className="flex flex-col gap-2 ml-auto border-l pl-6 border-slate-800">
                                    <button
                                        onClick={() => handleSave(item)}
                                        disabled={loading3}
                                        className="p-3 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all group disabled:opacity-20"
                                        title="Save Changes"
                                    >
                                        <Save size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>

                                    <button
                                        className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                                        title="Delete"
                                    >
                                        <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Boş Durum Görünümü */}
            {CountryTypedef.length === 0 && !loading2 && (
                <div className="text-center py-20 bg-slate-900 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500 font-bold">
                    No Country found.
                </div>
            )}
        </div>
    );
}