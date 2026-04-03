import { Settings2, Save, Trash2, Cpu, Edit3, Activity } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";
import { useEffect, useState } from 'react';

export default function AutomationProtocolSettings({ setActivePage, targetId }) {
  const { triggerTableContent, loading2, triggerTableUpdate, loading3 } = useTables();
  const [AutomationProtocols, setAutomationProtocols] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let res1 = await triggerTableContent({ tableName: "AutomationProtocols" });
      if (res1) {
        // targetId kontrolü ile filtreleme
        const filtered = res1.filter(obj => obj.ID == targetId);
        setAutomationProtocols(filtered);
      }
    };
    fetchData();
  }, [targetId]); // targetId değişirse veriyi tazele

  const handleInputChange = (index, field, value) => {
    const updatedData = [...AutomationProtocols];
    updatedData[index][field] = value;
    setAutomationProtocols(updatedData);
  };

  const handleSave = async (item) => {
    await triggerTableUpdate({
      tableName: "AutomationProtocols",
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
            Automation Protocol Configuration
          </h2>
          <p className="text-slate-400 text-sm mt-1">Protokol detaylarını ve haberleşme parametrelerini düzenleyin.</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading2 && AutomationProtocols.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 animate-pulse">
            <Activity size={40} className="animate-spin mb-4 text-emerald-500" />
            <span className="font-bold tracking-widest uppercase text-xs">Loading protocols...</span>
          </div>
        ) : (
          AutomationProtocols.map((item, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 transition-all shadow-lg group/card">
              <div className="flex flex-wrap md:flex-nowrap items-center gap-8">

                {/* ID Badge */}
                <div className="min-w-[80px] border-r border-slate-800 pr-6">
                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">ID</div>
                  <div className="text-xl font-black text-emerald-500">#{item.ID}</div>
                </div>

                {/* Protocol Name Input */}
                <div className="flex-grow flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Edit3 size={12} className="text-emerald-500" /> Protocol Name
                    </label>
                  </div>
                  <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                    <input
                      type="text"
                      value={item.Name || ""}
                      onChange={(e) => handleInputChange(index, 'Name', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="Enter the protocol name..."
                    />
                  </div>
                </div>

                {/* Protocol Identifier Input */}
                <div className="flex-grow flex flex-col gap-1.5 group/field">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase flex items-center gap-1">
                      <Edit3 size={12} className="text-emerald-500" /> Protocol
                    </label>
                  </div>
                  <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-xl px-4 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
                    <input
                      type="text"
                      value={item.Protocol || ""}
                      onChange={(e) => handleInputChange(index, 'Protocol', e.target.value)}
                      className="bg-transparent border-none w-full text-sm font-bold p-3 outline-none text-slate-200 placeholder:text-slate-600"
                      placeholder="Enter the protocol..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row md:flex-col gap-2 ml-auto border-l border-slate-800 pl-6">
                  <button
                    onClick={() => handleSave(item)}
                    disabled={loading3}
                    className={`p-3 rounded-xl transition-all group ${
                      loading3 ? "opacity-30 cursor-not-allowed" : "text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                    }`}
                    title="Save Changes"
                  >
                    {loading3 ? (
                      <Activity size={20} className="animate-spin" />
                    ) : (
                      <Save size={20} className="group-hover:scale-110 transition-transform" />
                    )}
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
          )
        ))}
      </div>

      {/* Empty State */}
      {AutomationProtocols.length === 0 && !loading2 && (
        <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800 text-slate-500">
          <div className="flex justify-center mb-4 text-slate-700">
             <Cpu size={48} />
          </div>
          <p className="font-bold">No protocols were found.</p>
          <p className="text-sm mt-1">Lütfen targetId parametresini kontrol edin veya yeni bir protokol ekleyin.</p>
        </div>
      )}
    </div>
  );
}