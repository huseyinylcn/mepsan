import React, { useState } from "react";
import {useFoldersName} from "../hooks/foldersName"
import {useFoldersContent} from "../hooks/foldersContent"






export default function Archive() {
  const {loading2,FoldersName=[] } = useFoldersName();
  const { items, loading, error, processing,handleArchive,handleRestore ,load} = useFoldersContent();

  const [selectedIndex, setSelectedIndex] = useState();
  const [isOpen, setIsOpen] = useState(false);







  if (loading) {
    return (
      <div className="p-6 pt-20 md:pt-6 animate-pulse text-slate-500 text-sm">
        Archive is Loading...
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-6 pt-20 md:pt-6 text-red-600 text-sm font-medium">
        ⚠️ Error: {error?.message }
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden p-6 pt-[20px] md:pt-6">

      <div className=" flex items-center mb-4" >



<div className="relative inline-block text-left">
  <button 
    onClick={() => setIsOpen(!isOpen)} 
    className="flex items-center justify-between gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-all min-w-[110px]"
  >
    <span className="truncate" >{FoldersName[selectedIndex] || "Dosya Seç"}</span>
   
    <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {isOpen && (
    <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-100 rounded-lg shadow-2xl z-50 py-1 max-h-64 overflow-y-auto ring-1 ring-black ring-opacity-5">
      {FoldersName.length === 0 ? (
        <div className="px-4 py-2 text-sm text-slate-400 italic">Veri yok</div>
      ) : (
        FoldersName.map((x, idx) => (
          <button
            key={`${x?.id || idx}`}
            type="button"
            onClick={() => {
              load(x)
              setSelectedIndex(idx);
              setIsOpen(false); 
            }}
            className={`block w-full px-4 py-2.5 text-left text-sm transition-colors
              ${idx === selectedIndex 
                ? "bg-indigo-50 text-indigo-700 font-semibold" 
                : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"}
            `}
          >
            {x}
          </button>
        ))
      )}
    </div>
  )}
</div>

           <button
          onClick={handleRestore}
          disabled={processing}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 ml-2"
        >
          {processing ? "Being Processed..." : "Restore"}
        </button>

        <button
          onClick={handleArchive}
          disabled={processing}
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors ml-2 disabled:opacity-50"
        >
          {processing ? "Being Processed..." : "Backup"}
        </button> 



      </div>





      {!loading && !error && (
        <div className=" flex flex-col gap-2 md:flex-row">



          {/* Sağ kısım - İçerik */}
          <div className="min-w-0 w-full rounded-md border border-slate-200 bg-white md:w-12/12">
            <div className="border-b border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800">
              {FoldersName[selectedIndex]  ?? "Content"}
            </div>

            <div className="h-auto min-h-[300px] overflow-hidden p-3 md:h-[80vh] md:overflow-auto bg-white">
              {!items ? (
                <div className="text-sm text-slate-500">Select a file</div>
              ) : (
                <pre className="whitespace-pre-wrap break-words break-all font-mono text-sm text-slate-800">
                  {items.content ?? ""}
                </pre>
              )}
            </div>
          </div>

        </div>
      )}


    </div>
  );
}
