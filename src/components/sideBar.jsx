// İkonlar için Lucide (Kullanmıyorsan silebilirsin)
import { LogOut, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import React from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuList = [
        { id: 1, name: "Dashboard", to: "/dashboard" },
        { id: 2, name: "Archive", to: "/archive" },
        { id: 3, name: "KillApp", to: "/killapp" }


    ]
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed left-4 top-4 z-50 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
                aria-label="Open menu"
            >
                <Menu size={18} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm transition-transform md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:z-10`}
            >

                <div className="flex h-20 items-center border-b border-slate-100 px-6">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mr-3 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>

                    <img
                        src="/logo.png"
                        alt="Mepsan"
                        className="h-12 w-12 rounded-xl object-contain"
                    />

                    <span className="ml-3 text-xl font-bold tracking-tight text-slate-800">
                        Mepsan
                    </span>
                </div>

                <nav className="flex-1 space-y-1 px-4 py-6">
                    {menuList.map(e => (
                        <NavLink
                            key={e.id}
                            to={e.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? "group flex items-center rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 transition-colors"
                                    : "group flex items-center rounded-lg px-3 py-2 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900"
                            }
                        >
                            <span className="font-medium">{e.name}</span>
                        </NavLink>
                    ))}
                </nav>


                <div className="border-t border-slate-100 p-4">
                    <div className="flex items-center rounded-xl bg-slate-50 p-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
                            HY
                        </div>

                        <div className="ml-3 flex-1 overflow-hidden text-sm">
                            <p className="truncate font-semibold text-slate-800">Hüseyin Yalçın</p>
                            <p className="truncate text-xs text-slate-500">Geliştirici</p>
                        </div>
                        <button className="text-slate-400 hover:text-red-500">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>

            </aside>
        </>
    );
};

export default Sidebar;