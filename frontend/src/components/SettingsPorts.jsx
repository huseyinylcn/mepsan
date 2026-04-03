import { Save, Trash2, Cpu, Edit3, Activity } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function SettingsPorts({ setActivePage, targetId }) {
    const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
    const [SettingsPorts, setSettingsPorts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res1 = await triggerTableContent({ tableName: "SettingsPorts" });
            if (res1) {
                const filtered = res1.filter(obje => obje.SCPNo === targetId || targetId == -1);
                setSettingsPorts(filtered);
            }
        };
        fetchData();
    }, [targetId]); // targetId değiştiğinde veriyi güncelle

    const handleInputChange = (index, field, value) => {
        const updatedData = [...SettingsPorts];
        updatedData[index][field] = value;
        setSettingsPorts(updatedData);
    };

    const handleSave = async (item) => {
        await triggerTableUpdate({
            tableName: "SettingsPorts",
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
                        Settings Ports Configuration
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Seri port ve haberleşme parametrelerini yönetin.</p>
                </div>
            </div>

            <div className="space-y-4">
                {loading2 && SettingsPorts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-pulse">
                        <Activity size={40} className="animate-spin mb-4 text-emerald-500" />
                        <span className="font-bold tracking-widest uppercase text-xs">Loading Ports...</span>
                    </div>
                ) : (
                    SettingsPorts.map((item, index) => (
                        <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all shadow-lg group/card">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">

                                {/* Port ID Badge */}
                                <div className="min-w-[100px] border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-6">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PORT ID</div>
                                    <div className="text-2xl font-black text-emerald-500">#{item.PortID}</div>
                                </div>

                                {/* Form Grid */}
                                <div className="flex-grow grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 w-full">
                                    {[
                                        { label: 'SCP No', field: 'SCPNo' },
                                        { label: 'Name', field: 'Name' },
                                        { label: 'Baudrate', field: 'Baudrate' },
                                        { label: 'Parity', field: 'Parity' },
                                        { label: 'StopBit', field: 'StopBit' },
                                        { label: 'DataBit', field: 'DataBit' },
                                        { label: 'FlowControl', field: 'FlowControl' }
                                    ].map((input) => (
                                        <div key={input.field} className="flex flex-col gap-1.5 group/field">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 px-1">
                                                <Edit3 size={10} className="text-emerald-500" /> {input.label}
                                            </label>
                                            <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-3 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                                                <input
                                                    type="text"
                                                    value={item[input.field] || ""}
                                                    onChange={(e) => handleInputChange(index, input.field, e.target.value)}
                                                    className="bg-transparent border-none w-full text-xs font-bold py-2.5 outline-none text-slate-200"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-row lg:flex-col gap-2 ml-auto lg:border-l border-slate-800 lg:pl-6 pt-4 lg:pt-0">
                                    <button
                                        onClick={() => handleSave(item)}
                                        disabled={loading3}
                                        className={`p-3 rounded-xl transition-all group ${
                                            loading3 ? "opacity-30 cursor-not-allowed" : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                                        }`}
                                        title="Save Changes"
                                    >
                                        {loading3 ? (
                                            <Activity size={20} className="animate-spin text-emerald-500" />
                                        ) : (
                                            <Save size={20} className="group-hover:scale-110 transition-transform" />
                                        )}
                                    </button>

                                    <button
                                        className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
                                        title="Delete Port"
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
            {SettingsPorts.length === 0 && !loading2 && (
                <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500">
                    <div className="flex justify-center mb-4 text-slate-700">
                        <Cpu size={48} />
                    </div>
                    <p className="font-bold uppercase tracking-widest text-xs">No Settings Ports found.</p>
                </div>
            )}
        </div>
    );
}