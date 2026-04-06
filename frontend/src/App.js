import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';

import Navbar from './components/navbar';
import Pumps from './pages/Pumps';
import Archive from './pages/Archive';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import MainSettingsDashboard from './pages/MainSettingsDashboard';

import Login from './pages/login';

import AutomationSettings from './components/AutomationSettings';
import PumpSettings from './components/PumpSettings';
import ECRSettings from './components/ECRSettings';
import SettingsPorts from './components/SettingsPorts';
import LogSettings from './components/LogSettings';
import DotSettings from './components/DotSettings';
import DeviceSettings from './components/DeviceSettings';
import DispenserProtocolSettings from './components/DİspenserProtocolSettings';
import AutomationProtocolSettings from './components/AutomationProtocolSettings';
import ECRProtocolsSettings from './components/ECRProtocolsSettings';
import SettingsMain from './components/SettingsMain';
import CountryTypedefSettings from './components/CountryTypedefSettings';
import DispenserNozzles from './components/DispenserNozzles';
import FuelTypedef from './components/FuelTypedef';










function App() {
  const { user, loading } = useAuth();

  // const [id, setId] = useState(() => {
  //   return localStorage.getItem('id') || -1;
  // })


  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('pageHistory');
    return saved ? JSON.parse(saved) : [{ page: 'dashboard', targetId: -1 }];
  });

  const currentState = history[history.length - 1];
  const activePage = currentState.page;
  const id = currentState.targetId;

  useEffect(() => {
    localStorage.setItem('activePage', activePage);
    localStorage.setItem('id', id);

  }, [activePage]);



  const handlePageChange = (newPage, newId = -1) => {
    if (newPage !== activePage || newId !== id) {
      setHistory(prev => [...prev, { page: newPage, targetId: newId }]);
    }
  };


  useEffect(() => {
    if (!loading && !user && activePage !== 'login') {

      handlePageChange('login');
    }
  }, [user, loading, activePage]);







  useEffect(() => {
    localStorage.setItem('pageHistory', JSON.stringify(history));
  }, [history]);

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
        <Login setActivePage={handlePageChange} />
      </div>
    );
  }

  const checkRole = (allowedRoles) => {
    return allowedRoles.includes(String(user.Type));
  };





  const goBack = () => {
    if (history.length > 1) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      });
    }
  };

  const updateTargetId = (newId) => {
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[newHistory.length - 1].targetId = newId;
      return newHistory;
    });
  };





  const renderContent = () => {
    if (activePage === 'admin' && !checkRole(['1', 'admin'])) {
      handlePageChange('dashboard');
      return <Dashboard setActivePage={handlePageChange} targetId={updateTargetId} />;
    }


    switch (activePage) {
      case 'dashboard':
        return <Dashboard setActivePage={handlePageChange} targetSetId={updateTargetId} />;
      case 'pumps':
        return <Pumps setActivePage={handlePageChange} />;
      case 'archive':
        return <Archive setActivePage={handlePageChange} />;
      case 'admin':
        return <AdminDashboard setActivePage={handlePageChange} />;
      case 'pumpSettings':
        return <PumpSettings setActivePage={handlePageChange} targetSetId={updateTargetId} />;
      case 'automationSettings':
        return <AutomationSettings setActivePage={handlePageChange} targetId={updateTargetId} />;
      case 'ecrSettings':
        return <ECRSettings setActivePage={handlePageChange} targetId={updateTargetId} />;
      case 'portSettings':
        return <SettingsPorts setActivePage={handlePageChange} targetId={id} />;
      case 'logSettings':
        return <LogSettings setActivePage={handlePageChange} targetId={id} />;
      case 'deviceSettings':
        return <DeviceSettings setActivePage={handlePageChange} targetId={id} targetSetId={updateTargetId} />;
      case 'pumpProtocol':
        return <DispenserProtocolSettings setActivePage={handlePageChange} targetId={id} />;
      case 'automationProtocol':
        return <AutomationProtocolSettings setActivePage={handlePageChange} targetId={id} />;
      case 'ecrProtocol':
        return <ECRProtocolsSettings setActivePage={handlePageChange} targetId={id} />;
      case 'dotSettings':
        return <DotSettings setActivePage={handlePageChange} targetId={id} targetSetId={updateTargetId} />;
      case 'settingsMain':
        return <SettingsMain setActivePage={handlePageChange} targetSetId={updateTargetId} />;
      case 'countrytypedef':
        return <CountryTypedefSettings setActivePage={handlePageChange} targetId={id} />;
      case 'dispenserNozzle':
        return <DispenserNozzles setActivePage={handlePageChange} targetId={id} targetSetId={updateTargetId} />;
      case 'fueltypedef':
        return <FuelTypedef setActivePage={handlePageChange} targetId={id} />;



      case 'MainSettingsDashboard':
        return <MainSettingsDashboard setActivePage={handlePageChange} targetId={id} />;




      default:
        return <Dashboard setActivePage={handlePageChange} targetSetId={updateTargetId} />;
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