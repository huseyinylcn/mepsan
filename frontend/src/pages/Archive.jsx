import React, { useState, useRef } from "react";
import { useFoldersName } from "../hooks/fileNames"
import { useFoldersContent } from "../hooks/fileContent";
import { ChevronDown, FolderOpen, Database, Upload, FileText, AlertCircle } from "lucide-react";

export default function Archive() {
  const { loading2, FoldersName = [] } = useFoldersName();
  const { items, loading, error, processing, load, handleBackup, handleRestore } = useFoldersContent();

  const [selectedIndex, setSelectedIndex] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileSelect = () => fileInputRef.current.click();

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    await handleRestore(file);
    event.target.value = null;
  };

  if (loading2) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 pt-10 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 animate-pulse font-medium">
          <Database className="animate-spin" size={20} />
          Archive is Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] p-6 pt-10">
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3 text-sm">
          <AlertCircle size={18} />
          <span>Error: {error?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-slate-100 overflow-x-hidden">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
        accept=".enc"
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Dropdown Seçici */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-3 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-slate-200 shadow-xl hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all min-w-[180px]"
          >
            <div className="flex items-center gap-2 truncate">
              <FolderOpen size={16} className="text-indigo-400" />
              <span className="truncate">{FoldersName[selectedIndex] || "Select Folder"}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
              <div className="absolute left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 py-2 max-h-72 overflow-y-auto ring-1 ring-white/5">
                {FoldersName.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-slate-500 italic text-center">No data available</div>
                ) : (
                  FoldersName.map((x, idx) => (
                    <button
                      key={`${x?.id || idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedIndex(idx);
                        setIsOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-all
                        ${idx === selectedIndex
                          ? "bg-indigo-500/10 text-indigo-400 font-bold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"}
                      `}
                    >
                      {x}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Aksiyon Butonları */}
        <button
          onClick={() => load(FoldersName[selectedIndex])}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 hover:bg-indigo-500 transition-all active:scale-95 disabled:opacity-50"
        >
          <FileText size={16} />
          Show Content
        </button>

        <button
          onClick={handleBackup}
          disabled={processing}
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-30"
        >
          <Database size={16} className="text-emerald-500" />
          {processing ? "Processing..." : "Backup"}
        </button>

        <button
          onClick={triggerFileSelect}
          disabled={processing}
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-30"
        >
          <Upload size={16} className="text-blue-400" />
          {processing ? "Processing..." : "Restore"}
        </button>
      </div>

      {!loading && !error && (
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="border-b border-slate-800 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
              <FileText size={16} className="text-indigo-500" />
              Content Viewer
            </div>
            {items && (
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20 font-mono">
                ENCRYPTED_MODE
              </span>
            )}
          </div>

          <div className="min-h-[400px] md:h-[75vh] overflow-auto p-6 bg-[#01040a]">
            {!items ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3 italic">
                <Database size={48} className="opacity-10" />
                <p>Select a folder and click "Show Content"</p>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-words break-all font-mono text-sm text-indigo-100/90 leading-relaxed selection:bg-indigo-500 selection:text-white">
                {items.content ?? ""}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}