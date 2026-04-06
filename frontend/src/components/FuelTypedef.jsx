import { ChevronDown, Cog, Save, Trash2, Cpu, Edit3 } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function FuelTypedef({ setActivePage, targetId }) {
  const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
  const [FuelTypedef, setFuelTypedef] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res1 = await triggerTableContent({ tableName: "FuelTypedef" });
      res1 = res1.filter(obj => obj.No == targetId);
      if (res1) setFuelTypedef(res1);
    };
    fetchData();
  }, [targetId]); // targetId değişirse veriyi tekrar çekmesi için dependency eklendi.

  const handleInputChange = (index, field, value) => {
    const updatedData = [...FuelTypedef];
    updatedData[index][field] = value;
    setFuelTypedef(updatedData);
  };

  const handleSave = async (item) => {
    await triggerTableUpdate({
      tableName: "FuelTypedef",
      content: item
    });
  };

  return (
    // Ana Konteyner: bg-slate-950
    <div className="w-full mx-auto p-4 md:p-8 animate-in fade-in duration-700 min-h-screen bg-slate-950 text-slate-200">

      {/* Header Alanı: bg-slate-900 & border-slate-800 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white shadow-lg shadow-emerald-500/20">
              <Cpu size={24} />
            </div>
            Fuel Configuration
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {loading2 && FuelTypedef.length === 0 ? (
          <div className="text-center py-20 text-slate-500 animate-pulse font-bold">
            Loading Fuel...
          </div>
        ) : (
          FuelTypedef.map((item, index) => (
            // Kart Yapısı: bg-slate-900
            <div key={index}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-lg group/card">
              <div className="flex items-center gap-6">

                {/* ID Bölümü */}
                <div className="min-w-[80px] border-r border-slate-800 pr-6">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ID</div>
                  <div className="text-xl font-black text-emerald-400">#{item.ID}</div>
                </div>

                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* No Input */}
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> No
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.No || ""}
                        onChange={(e) => handleInputChange(index, 'No', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="flex-grow flex flex-col gap-1.5 group/field">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                        <Edit3 size={12} /> Name
                      </label>
                    </div>
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50 transition-all">
                      <input
                        type="text"
                        value={item.Name || ""}
                        onChange={(e) => handleInputChange(index, 'Name', e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                {/* İşlem Butonları */}
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

      {/* Boş Durum Görünümü */}
      {FuelTypedef.length === 0 && !loading2 && (
        <div className="text-center py-20 bg-slate-900 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500 font-bold">
          No fuel protocols were found.
        </div>
      )}
    </div>
  );
}