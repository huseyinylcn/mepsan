import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
     
      <main className="flex-1 pt-16 md:pt-0 ">
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;