import { useState, useEffect } from "react";
import { useTablesName } from "../hooks/dbTransactions";

// Alt Bileşen: Her bir satırı yönetir
function TableRow({ row, columnNames, onUpdate, loading3 }) {
  // Satırdaki verileri yerel bir state'te tutuyoruz ki inputlar değişebilsin
  const [formData, setFormData] = useState(row);

  // Eğer dışarıdan gelen row değişirse (tablo değiştiğinde) state'i güncelle
  useEffect(() => {
    setFormData(row);
  }, [row]);

  const handleChange = (col, value) => {
    setFormData((prev) => ({ ...prev, [col]: value }));
  };

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 whitespace-nowrap border-b">
        <button
          onClick={() => onUpdate(formData)}
          disabled={loading3}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors disabled:bg-slate-300"
        >
          {loading3 ? "..." : "Güncelle"}
        </button>
      </td>
      {columnNames.map((col) => (
        <td key={col} className="px-4 py-3 whitespace-nowrap border-b">
          {/* rowid_key (veya id) değiştirilmemeli, sadece gösterilmeli */}
          {col === "rowid" || col === "rowid_key" || col === "id" ? (
            <span className="text-slate-400 font-mono text-xs">{formData[col]}</span>
          ) : (
            <input
              type="text"
              value={formData[col] || ""}
              onChange={(e) => handleChange(col, e.target.value)}
              className="border border-slate-200 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none w-full"
            />
          )}
        </td>
      ))}
    </tr>
  );
}

export default function DBTransactions() {
  const {
    TablesNames = [],
    loading,
    TableContent,
    loading2,
    triggerTableContent,
    loading3,
    triggerTableUpdate,
  } = useTablesName();

  const [selectedTable, setSelectedTable] = useState("");

  if (loading) {
    return (
      <div className="p-6 pt-20 md:pt-6 animate-pulse text-slate-500 text-sm">
        Tablo listesi yükleniyor...
      </div>
    );
  }

  const handleTableChange = (event) => {
    const tableName = event.target.value;
    setSelectedTable(tableName);
    if (tableName) {
      triggerTableContent({ tableName: tableName });
    }
  };

  const handleRowUpdate = (updatedRow) => {
 
    triggerTableUpdate({
      tableName: selectedTable,
      content: updatedRow,
    });
  };

  const columnNames = TableContent && TableContent.length > 0 ? Object.keys(TableContent[0]) : [];

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-12 md:pt-6">
      <div className="flex flex-col gap-6">
        {/* Seçim Alanı */}
        <div className="flex items-center gap-4">
          <select
            className="p-2.5 border border-slate-300 rounded-lg bg-white shadow-sm outline-none text-sm min-w-[200px] focus:ring-2 focus:ring-blue-500"
            onChange={handleTableChange}
            disabled={loading2 || loading3}
          >
            <option value="">Bir tablo seçin...</option>
            {TablesNames?.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          {(loading2 || loading3) && (
            <div className="text-blue-500 text-xs animate-pulse font-medium">
              {loading3 ? "Güncelleniyor..." : "Veriler çekiliyor..."}
            </div>
          )}
        </div>

        {/* Dinamik Tablo */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead className="bg-slate-100 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold border-b w-20">İşlem</th>
                {columnNames.map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold border-b">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TableContent && TableContent.length > 0 ? (
                TableContent.map((row, index) => (
                  <TableRow
                    key={row.rowid || row.rowid_key || index}
                    row={row}
                    columnNames={columnNames}
                    onUpdate={handleRowUpdate}
                    loading3={loading3}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={columnNames.length + 1} className="px-4 py-10 text-center text-slate-400 italic">
                    {loading2 ? "Yükleniyor..." : "Görüntülenecek veri yok."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}