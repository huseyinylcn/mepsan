import React from 'react';
import { 
  Terminal, 
  Settings2, 
  Globe, 
  LayoutGrid,
  ChevronRight 
} from "lucide-react";





const items = [
  {
    title: "Log Settings",
    icon: Terminal,
    description: "Manage system log files and record paths.",
    id: "logSettings",
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  },
  {
    title: "Main Settings",
    icon: Settings2,
    description: "Edit general system preferences and main configuration.",
    id: "settingsMain",
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    title: "Country Settings",
    icon: Globe,
    description: "Change country settings and regional preferences.",
    id: "countrytypedef",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Dot Settings",
    icon: LayoutGrid,
    description: "Update and review point-based settings and custom terminal parameters.",
    id: "dotSettings",
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  }
];





export default function MainSettingsDashboard({ setActivePage }) {
  return (
    // min-h-screen ve flex items-center ile dikeyde; justify-center ile yatayda tam ortalar
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 bg-slate-950">
      
      <div className="w-full max-w-6xl">
        {/* 3 item olduğu için md:grid-cols-3 yaptık. 
           Eğer daha fazla eklenirse otomatik alt satıra geçer.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 
                           hover:border-emerald-500/50 transition-all duration-300 text-left
                           hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2
                           animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  {/* İkon Kutusu: Zümrüt yeşili tonları */}
                  <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform shadow-inner">
                    <Icon size={32} />
                  </div>
                  <ChevronRight className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed min-h-[40px]">
                    {item.description}
                  </p>
                </div>

                {/* Arka plan hover efekti */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none bg-emerald-400" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}