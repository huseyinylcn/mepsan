import React from 'react';
import { NavLink } from "react-router-dom";
import { LogOut, Menu, X, LayoutDashboard, Archive } from "lucide-react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const menuList = [
        { id: 1, name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { id: 2, name: "Archive", to: "/archive", icon: <Archive size={20} /> },
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

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex flex-col bg-mepsan-primary text-white shadow-2xl transition-all duration-300 ease-in-out md:w-64 md:z-10 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 w-[280px] h-[100dvh] overflow-hidden border-r border-white/5`}
            >
               
                <div className="flex h-20 shrink-0 items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                       
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl  shadow-inner">
                            <img src="/logo.png" alt="Mepsan" className="h-7 w-7 object-contain" />
                        </div>
                        <span className="text-xl font-black tracking-widest uppercase text-white">Mepsan</span>
                    </div>
                    
                    <button onClick={() => setIsOpen(false)} className="ml-auto text-white/40 hover:text-white md:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1.5 px-4 py-8 overflow-y-auto bg-mepsan-primary">
                    {menuList.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                group relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200
                                ${isActive
                                    ? "bg-mepsan-secondary text-white shadow-lg shadow-mepsan-secondary/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`absolute left-0 h-6 w-1 rounded-r-full bg-white transition-all ${isActive ? "opacity-100" : "opacity-0"}`} />
                                    
                                    <span className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-bold tracking-wide">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition-all">
                        <div className="relative h-10 w-10 shrink-0">
                            <div className="flex h-full w-full items-center justify-center rounded-xl bg-mepsan-secondary text-sm font-bold text-white">
                                HY
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-mepsan-primary bg-[#2E7D32]" />
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-bold text-white">Hüseyin Yalçın</p>
                            <p className="truncate text-[10px] font-bold uppercase tracking-widest text-slate-500">Stajer</p>
                        </div>

                        <button className="text-slate-500 hover:text-red-400 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                    
                    <p className="mt-4 text-center text-[9px] font-bold tracking-[0.2em] text-slate-600 uppercase">
                        v1.0.0 - Mepsan Tech
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;