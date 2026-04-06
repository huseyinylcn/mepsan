import { ChevronLeft, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // AuthContext'i import ettik

export default function Navbar({ setActivePage, goBack, activePage }) {
  const { logout } = useAuth(); // Logout fonksiyonunu çektik
  const isDashboard = activePage === 'dashboard';

  const handleLogout = async () => {
    localStorage.clear();
    await logout();

  };

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 text-slate-300 shadow-sm">
      <div className="w-full px-4 flex items-center h-14">

        {/* Sol Taraf: Geri Butonu */}
        {!isDashboard ? (
          <button
            onClick={goBack}
            className="flex items-center gap-2 group p-2 rounded-lg hover:bg-slate-800 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white">
              Go Back
            </span>
          </button>
        ) : (
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Main Panel
          </span>
        )}

        {/* Sağ Taraf: Çıkış Yap Butonu */}
        <div className="ml-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 group shadow-lg shadow-red-500/5"
            title="Sistemden Çıkış Yap"
          >
            <span className="text-xs font-bold uppercase tracking-wider">Logout</span>
            <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </nav>
  );
}