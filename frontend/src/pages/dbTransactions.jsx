import React, { useState } from "react";


import { Settings, Droplets, Activity, ArrowLeft, Save } from "lucide-react";

import PumpSettings from "../components/PumpSettings"; 

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("menu");

  const actions = [
    { id: "pompa", title: "Pompa Ayarları", icon: <Settings />, color: "bg-blue-500" },
    { id: "akis", title: "Su Akışı", icon: <Droplets />, color: "bg-cyan-500" },
    { id: "durum", title: "Sistem Durumu", icon: <Activity />, color: "bg-emerald-500" },
  ];


  if (activeTab === "menu") {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-12">Sistem Kontrol Paneli</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {actions.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className="p-8 bg-white rounded-3xl shadow-sm border hover:shadow-md transition-all flex flex-col items-center"
            >
              <div className={`${item.color} text-white p-4 rounded-xl mb-4`}>
                {item.icon}
              </div>
              <span className="font-bold">{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto">
        <button 
          onClick={() => setActiveTab("menu")}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6"
        >
          <ArrowLeft size={20} /> Ana Menüye Dön
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
       
          {activeTab === "pompa" && <PumpSettings />}
          {activeTab === "akis" && <PumpSettings />}
          {activeTab === "durum" && <PumpSettings />}
        </div>
      </div>
    </div>
  );
}


