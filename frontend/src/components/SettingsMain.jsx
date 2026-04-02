import { Save, Trash2, Cpu, Edit3,Cog,ChevronDown } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function SettingsMain({ onNavigate, targetId }) {
    const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
    const [SettingsMain, setSettingsMain] = useState([]);
    const [CountryTypedef, setCountryTypedef] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            let res1 = await triggerTableContent({ tableName: "SettingsMain" })
            console.log(targetId)

            res1 = res1.filter(obje => obje.SCPNo === targetId || targetId == -1 || targetId == null)
            if (res1) setSettingsMain(res1);



            let res2 = await triggerTableContent({ tableName: "CountryTypedef" })
            if (res2) setCountryTypedef(res2)



        };
        fetchData();
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedData = [...SettingsMain];
        updatedData[index][field] = value;
        setSettingsMain(updatedData);
    };

    const handleSave = async (item) => {
        console.log("Güncelleniyor:", item);
        await triggerTableUpdate({
            tableName: "SettingsMain",
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
                        Settings Main                     </h2>
                </div>
            </div>

            <div className="space-y-4">
                {loading2 && SettingsMain.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 animate-pulse font-bold">
                        Loading Settings Main...
                    </div>
                ) : (
                    SettingsMain.map((item, index) => (
                        <div key={index} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-emerald-400 transition-all shadow-sm">
                            <div className="flex items-center gap-8">

                                <div className="min-w-[80px] border-r border-slate-100 pr-6">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ID</div>
                                    <div className="text-xl font-black text-slate-800">#{item.ID}</div>
                                </div>


                                <div className="flex-grow flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Edit3 size={12} /> ECR Mode
                                        </label>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                                        <input
                                            type="text"
                                            value={item.ECRMode}
                                            onChange={(e) => handleInputChange(index, 'ECRMode', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-700"
                                            placeholder=" "
                                        />
                                    </div>
                                </div>





                                <div className="flex-grow flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Edit3 size={12} /> SCU Mode
                                        </label>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                                        <input
                                            type="text"
                                            value={item.SCUMode || ""}
                                            onChange={(e) => handleInputChange(index, 'SCUMode', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-700"
                                            placeholder=" "
                                        />
                                    </div>
                                </div>



                                <div className="flex flex-col gap-1.5 relative group/field">
                                    <div className="flex justify-between items-end px-1 mb-0.5">
                                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                                            Country
                                        </label>

                                        <button
                                            onClick={() => onNavigate("dispenserProtocol")}
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
                                            value={item.Country}
                                            onChange={(e) => handleInputChange(index, 'Country', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 text-sm font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all appearance-none"
                                        >
                                            <option value="">Seçiniz...</option>
                                            {CountryTypedef.map(p => <option key={p.No} value={p.ID}>{p.Name}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>



                                <div className="flex-grow flex flex-col gap-1.5 group/field">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                                            <Edit3 size={12} /> Parameters
                                        </label>
                                    </div>
                                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                                        <input
                                            type="text"
                                            value={item.Parameters || ""}
                                            onChange={(e) => handleInputChange(index, 'Parameters', e.target.value)}
                                            className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-700"
                                            placeholder=" "
                                        />
                                    </div>
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

            {SettingsMain.length === 0 && !loading2 && (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed text-slate-400">
                    No SettingsMain  found.
                </div>
            )}
        </div>
    );
}