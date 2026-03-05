
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from './components/DashboardLayout';
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRoute } from "./components/RoleBasedRoute";

import Archive from "./pages/Archive";
import Pumps from './pages/Pumps';
import Login from './pages/login';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/pumps" element={<Pumps />} />




        <Route element={<RoleBasedRoute allowedRoles={['1']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>



        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;