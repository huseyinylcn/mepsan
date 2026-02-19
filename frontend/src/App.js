import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from './components/sideBar';

import Dashboard from "./pages/Dashboard";
import Archive from "./pages/Archive";


function App() {
  return (
    <div className="flex h-screen bg-slate-50">
      
      <Sidebar />

      <main className="flex-1 pt-16 md:pt-0 md:pl-64">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/archive" element={<Archive />} />
      
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
