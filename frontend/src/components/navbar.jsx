import { ChevronLeft } from "lucide-react";

export default function Navbar({ setActivePage, goBack, activePage }) {
  // Eğer ana sayfadaysak geri butonunu gizleyebilir veya pasif yapabiliriz
  const isDashboard = activePage === 'dashboard';

  return (
    <nav className="w-full bg-slate-950 border-b border-slate-800 text-slate-300 shadow-sm">
      <div className="w-full px-2 flex items-center h-14">
        
        {!isDashboard && (
          <button 
            onClick={goBack}
            className="flex items-center gap-2 group p-4 rounded-lg hover:bg-slate-800 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-200">
              Geri Dön
            </span>
          </button>
        )}

        {/* Logo veya Diğer Menü Elemanları Buraya Gelebilir */}
        {isDashboard && (
          <span className="px-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
            Ana Panel
          </span>
        )}
        
      </div>
    </nav>
  );
}