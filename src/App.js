import './App.css';
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from './components/SideBar';

import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";
import KillApp from "./pages/KillApp";

function App() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* SOL TARAF */}
      <Sidebar />

      <main className="flex-1 md:pl-64">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/killapp" element={<KillApp />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
