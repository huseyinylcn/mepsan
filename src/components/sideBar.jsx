
// İkonlar için Lucide (Kullanmıyorsan silebilirsin)
import { Settings, LogOut, LayoutGrid } from "lucide-react";

const Sidebar = ({setSeciliId,seciliId}) => {
 

    const menuClick = (id) => {
        setSeciliId(id)
    }

    const menuList = [
        { id: 1, name: "Dashboard" },
        { id: 2, name: "Archive" },
        { id: 3, name: "KillApp" }


    ]
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-sm">

            {/* Üst Kısım: Logo ve Marka */}
            <div className="flex h-20 items-center border-b border-slate-100 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <LayoutGrid size={22} />
                </div>
                <span className="ml-3 text-xl font-bold tracking-tight text-slate-800">
                    Mepsan
                </span>
            </div>

            {/* Orta Kısım: Menü Linkleri */}
            <nav className="flex-1 space-y-1 px-4 py-6">
                {menuList.map(e => (
                    //     <div className="group flex items-center rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 transition-colors">
                    //   <Home size={20} className="mr-3" />
                    //   <span className="font-semibold">{e.name}</span>
                    // </div>

                    <div
                        key={e.id}
                        onClick={() => menuClick(e.id)}

                        className={seciliId === e.id ? "group flex items-center rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 transition-colors" : "group flex items-center rounded-lg px-3 py-2 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900"}>
                        <Settings size={20} className="mr-3 group-hover:text-indigo-600" />
                        <span className="font-medium">{e.name}</span>
                    </div>

                ))}





            </nav>

            {/* Alt Kısım: Profil ve Çıkış */}
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
    );
};

export default Sidebar;