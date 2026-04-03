import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Bileşenler (Kendi yollarınıza göre kontrol edin)
import Navbar from './components/navbar';
import Pumps from './pages/Pumps';
import Archive from './pages/Archive';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';

import AutomationSettings from './components/AutomationSettings';
import PumpSettings from './components/PumpSettings';
import ECRSettings from './components/ECRSettings';
import SettingsPorts from './components/SettingsPorts';
import LogSettings from './components/LogSettings';
import DeviceSettings from './components/DeviceSettings';
import DispenserProtocolSettings from './components/DİspenserProtocolSettings';
import AutomationProtocolSettings from './components/AutomationProtocolSettings';
import ECRProtocolsSettings from './components/ECRProtocolsSettings';






function App() {
  const { user, loading } = useAuth();
  const [id,setId] = useState(()=>{
      return localStorage.getItem('id') || -1;
  })

  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem('activePage') || 'dashboard';
  });

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
    localStorage.setItem('id', id);

 
  }, [activePage]);

  useEffect(() => {
    if (!loading && !user && activePage !== 'login') {
      setActivePage('login');
    }
  }, [user, loading, activePage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        Yükleniyor...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Login setActivePage={setActivePage} />
      </div>
    );
  }

  const checkRole = (allowedRoles) => {
    return allowedRoles.includes(String(user.Type));
  };

const handlePageChange = (newPage) => {
  if (newPage !== activePage) {
    localStorage.setItem('prevPage', activePage); 
    setActivePage(newPage);
  }
};
const goBack = () => {
  const previous = localStorage.getItem('prevPage') || 'dashboard';
  setActivePage(previous);
};
  const renderContent = () => {
    if (activePage === 'admin' && !checkRole(['1', 'admin'])) {
      setActivePage('dashboard');
      return <Dashboard setActivePage={setActivePage} targetId={setId} />;
    }


    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={setActivePage} targetId={setId} />;
      case 'pumps':
        return <Pumps setActivePage={setActivePage} />;
      case 'archive':
        return <Archive setActivePage={setActivePage} />;
      case 'admin':
        return <AdminDashboard setActivePage={setActivePage} />;
      case 'pumpSettings':
        return <PumpSettings setActivePage={setActivePage} targetId={setId} />;
      case 'automationSettings':
        return <AutomationSettings setActivePage={setActivePage} targetId={setId} />;
      case 'ecrSettings':
        return <ECRSettings setActivePage={setActivePage} targetId={setId} />;
      case 'portSettings':
        return <SettingsPorts setActivePage={setActivePage}  targetId={id} />;
      case 'logSettings':
        return <LogSettings setActivePage={setActivePage}  targetId={id} />;
      case 'deviceSettings':
        return <DeviceSettings setActivePage={setActivePage} targetId={id} />;
      case 'pumpProtocol':
        return <DispenserProtocolSettings setActivePage={setActivePage} targetId={id} />;
      case 'automationProtocol':
        return <AutomationProtocolSettings setActivePage={setActivePage} targetId={id} />;
      case 'ecrProtocol':
        return <ECRProtocolsSettings setActivePage={setActivePage} targetId={id} />;


        
        
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="dashboard-layout flex flex-col min-h-screen bg-slate-950 text-white">
      {user && <Navbar
        setActivePage={handlePageChange}
        goBack={goBack}
        activePage={activePage}
      />}

      <main className="content flex-grow">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;