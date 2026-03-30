import { Save, Thermometer, Gauge, List } from "lucide-react";
import { useTables } from "./../hooks/dbTransactions";

export default function PumpSettings() {
  const { triggerTableContent, TableContent, loading } = useTables();
  

  return (
    <div className="animate-in fade-in duration-500">
      {/* Üst Başlık ve Kaydet Butonu */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pompa Konfigürasyonu</h2>
          <p className="text-slate-500">Basınç ve akış hızını buradan kalibre edebilirsiniz.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md">
          <Save size={18} /> Ayarları Kaydet
        </button>
      </div>


      {/* --- TABLO ALANI --- */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <List size={18} className="text-slate-500" />
          <h3 className="font-semibold text-slate-700">Geçmiş Kayıtlar ve Loglar</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Device ID</th>
                <th className="px-6 py-4 font-semibold">SCPNo</th>
                <th className="px-6 py-4 font-semibold">Address </th>
                <th className="px-6 py-4 font-semibold text-right">Protocol</th>
                <th className="px-6 py-4 font-semibold text-right">Timeout</th>
                <th className="px-6 py-4 font-semibold text-right">ErrorCycle</th>


              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400 animate-pulse">Veriler yükleniyor...</td>
                </tr>
              ) : TableContent?.length > 0 ? (
                TableContent.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{item.date || "20.03.2024"}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.action || "Otomatik Kalibrasyon"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.pressure || "4.2"} Bar</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[10px] font-bold uppercase">Başarılı</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-slate-400 italic">Henüz bir kayıt bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}