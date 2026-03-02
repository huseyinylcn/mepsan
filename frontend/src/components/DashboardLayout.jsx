import { Outlet } from 'react-router-dom';
import Sidebar from './sideBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 pt-16 md:pt-0 md:pl-64">
        {/* Alt rotalar (Dashboard, Pumps vb.) burada render edilecek */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;