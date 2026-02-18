import React from 'react';
import { NavLink } from "react-router-dom";
import { LogOut, Menu, X, LayoutDashboard, Archive } from "lucide-react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

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
        { id: 1, name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { id: 2, name: "Archive", to: "/archive", icon: <Archive size={20} /> },
    ];

    return (
        <>
            {/* Mobil Header - Mepsan Primary Tonları */}
            <header className="fixed left-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-mepsan-border bg-white px-4 md:hidden">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg border border-mepsan-border bg-white p-2 text-mepsan-primary shadow-sm active:scale-95 transition-all"
                >
                    <Menu size={20} />
                </button>

                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Mepsan" className="h-9 w-9 rounded-lg object-contain" />
                    <span className="text-lg font-bold tracking-tight text-mepsan-primary">Mepsan</span>
                </div>
                <div className="w-10" />
            </header>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-mepsan-primary/40 backdrop-blur-[2px] transition-opacity md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Ana Gövde */}
            <aside
                className={`fixed left-0 top-0 z-50 flex flex-col border-r border-mepsan-border bg-mepsan-carBg shadow-xl transition-all duration-300 ease-in-out md:w-64 md:max-w-none md:z-10 md:shadow-none ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 w-[280px] h-[100dvh] overflow-hidden`}
            >
                {/* Logo Bölümü - Daha Kurumsal */}
                <div className="flex h-20 shrink-0 items-center border-b border-mepsan-background px-6 bg-white">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="mr-3 inline-flex items-center justify-center rounded-lg border border-mepsan-border p-1.5 text-mepsan-mutedText md:hidden"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Mepsan" className="h-10 w-10 rounded-lg object-contain" />
                        <span className="text-xl font-black tracking-tight text-mepsan-primary uppercase">Mepsan</span>
                    </div>
                </div>

                {/* Navigasyon */}
                <nav className="flex-1 space-y-2 px-4 py-8 overflow-y-auto custom-scrollbar bg-white">
                    {menuList.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                group relative flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-300
                                ${isActive
                                    ? "bg-mepsan-secondary/10 text-mepsan-secondary shadow-sm"
                                    : "text-mepsan-mutedText hover:bg-mepsan-background hover:text-mepsan-primary hover:pl-5"}
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    {/* Mepsan Secondary Renginde Aktif Çubuğu */}
                                    <div
                                        className={`absolute left-0 h-6 w-1 rounded-r-full bg-mepsan-secondary transition-all duration-300 ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />

                                    <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-bold tracking-wide">{item.name}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Profil Alanı - Yeni Renk Paletiyle */}
                <div className="p-4 border-t border-mepsan-background bg-white">
                    <div className="flex items-center gap-3 rounded-2xl bg-mepsan-background p-4 border border-mepsan-border shadow-sm transition-all hover:shadow-md">
                        <div className="relative h-10 w-10 shrink-0">
                            {/* Baş harf alanı Mepsan Primary yapıldı */}
                            <div className="flex h-full w-full items-center justify-center rounded-xl bg-mepsan-primary text-sm font-bold text-white shadow-inner">
                                HY
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-mepsan-alertColors-success shadow-sm" />
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-black text-mepsan-primary">Hüseyin Yalçın</p>
                            <p className="truncate text-[10px] font-bold uppercase tracking-widest text-mepsan-mutedText">Stajer</p>
                        </div>

                        <button
                            className="group flex h-9 w-9 items-center justify-center rounded-xl text-mepsan-mutedText hover:bg-mepsan-alertColors-danger/10 hover:text-mepsan-alertColors-danger transition-all active:scale-90"
                            aria-label="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                    
                    {/* Versiyon Bilgisi */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-mepsan-border"></div>
                        <p className="text-center text-[9px] font-bold uppercase tracking-widest text-mepsan-border">
                            v1.0.0 - Mepsan Tech
                        </p>
                        <div className="h-1 w-1 rounded-full bg-mepsan-border"></div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;