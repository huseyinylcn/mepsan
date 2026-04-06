import { ChevronDown, Cog, Save, Trash2, Cpu, Edit3 } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function DispenserNozzles({ setActivePage, targetId,targetSetId }) {
  const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
  const [DispenserNozzles, setDispenserNozzles] = useState([]);
  const [FuelTypedef, setFuelTypedef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res1 = await triggerTableContent({ tableName: "DispenserNozzles" });
      res1 = res1.filter(obje => obje.PumpNo === targetId || targetId == -1);
      if (res1) setDispenserNozzles(res1);

      let res2 = await triggerTableContent({ tableName: "FuelTypedef" });
      if (res2) setFuelTypedef(res2);
    };
    fetchData();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...DispenserNozzles];
    updatedData[index][field] = value;
    setDispenserNozzles(updatedData);
  };

  const handleSave = async (item) => {
    await triggerTableUpdate({
      tableName: "DispenserNozzles",
      content: item
    });
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-lg shadow-emerald-500/20">
              <Cpu size={24} />
            </div>
            Dispenser Nozzle Configuration
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {loading2 && DispenserNozzles.length === 0 ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-bold">
            Loading Nozzles...
          </div>
        ) : (
          DispenserNozzles.map((item, index) => (
            <div key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-lg group/card">
              <div className="flex flex-wrap items-center gap-6">

                <div className="min-w-[80px] border-r border-slate-800 pr-6">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ID</div>
                  <div className="text-xl font-black text-emerald-400">#{item.ID}</div>
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Pump No
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.PumpNo || ""}
                        onChange={(e) => handleInputChange(index, 'PumpNo', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Nozzle No
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.NozzleNo || ""}
                        onChange={(e) => handleInputChange(index, 'NozzleNo', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 relative group/field">
                    <div className="flex justify-between items-end px-1 mb-0.5">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                        Fuel No
                      </label>
                      <button
                        onClick={() =>{ setActivePage("fueltypedef");targetSetId(item.FuelNo) }}
                        className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 border border-slate-700 text-blue-400 rounded-lg shadow-sm hover:border-blue-500 hover:bg-blue-500/10 transition-all active:scale-95 group/btn"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-tight">Detail</span>
                        <Cog size={14} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                      </button>
                    </div>

                    <div className="relative">
                      <select
                        value={item.FuelNo || ""}
                        onChange={(e) => handleInputChange(index, 'FuelNo', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm font-bold rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all appearance-none"
                      >
                        <option value="" className="bg-slate-900">Seçiniz...</option>
                        {FuelTypedef.map(p => <option key={p.No} value={p.No} className="bg-slate-900">{p.Name}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Unit Price
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.UnitPrice || ""}
                        onChange={(e) => handleInputChange(index, 'UnitPrice', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Volume Total
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.VolumeTotal || ""}
                        onChange={(e) => handleInputChange(index, 'VolumeTotal', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Amount Total
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.AmountTotal || ""}
                        onChange={(e) => handleInputChange(index, 'AmountTotal', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                </div>

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

      {/* Boş Durum */}
      {DispenserNozzles.length === 0 && !loading2 && (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500 font-bold">
          No protocols were found.
        </div>
      )}
    </div>
  );
}