import React from 'react';
import { NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Mobil cihazlarda arka plan kaymasını ve dokunmatik hareketleri tamamen durdurur
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.body.style.overflow = "unset";
            document.body.style.touchAction = "auto";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.body.style.touchAction = "auto";
        };
    }, [isOpen]);

    const menuList = [
        { id: 1, name: "Dashboard", to: "/dashboard" },
        { id: 2, name: "Archive", to: "/archive" },
        { id: 3, name: "KillApp", to: "/killapp" }
    ];

    return (
        <>
         
            <header className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm active:scale-95 transition-transform"
                >
                    <Menu size={18} />
                </button>

                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Mepsan" className="h-9 w-9 rounded-lg object-contain" />
                    <span className="text-base font-bold tracking-tight text-slate-800">Mepsan</span>
                </div>
                <div className="w-10" />
            </header>

        
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}


            <aside  
                className={`fixed left-0 top-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out md:w-64 md:max-w-none md:z-10 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 w-[280px] max-w-[85vw] h-[100dvh] overflow-hidden`}
            >
                {/* Aside Header (Logo & Kapatma Butonu) */}
                <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-6">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mr-3 inline-flex items-center justify-center border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
                    >
                        <X size={18} />
                    </button>

                    <img src="/logo.png" alt="Mepsan" className="h-12 w-12 rounded-xl object-contain" />
                    <span className="ml-3 text-xl font-bold tracking-tight text-slate-800">Mepsan</span>
                </div>

                <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {menuList.map(item => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                group flex items-center rounded-lg px-3 py-2 transition-colors
                                ${isActive 
                                    ? "bg-indigo-50 text-indigo-700 font-semibold" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                            `}
                        >
                            <span className="truncate">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Profil Alanı (En alta sabitlenmiş) */}
                <div className="shrink-0 border-t border-slate-100 p-4 bg-white">
                    <div className="flex items-center rounded-xl bg-slate-50 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                            HY
                        </div>
                        <div className="ml-3 flex-1 overflow-hidden text-sm text-left">
                            <p className="truncate font-semibold text-slate-800">Hüseyin Yalçın</p>
                            <p className="truncate text-xs text-slate-500 font-medium">Stajer</p>
                        </div>
                        <button 
                            className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                            aria-label="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;