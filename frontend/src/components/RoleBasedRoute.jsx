// components/RoleBasedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export const RoleBasedRoute = ({ allowedRoles }) => {
  const userType = localStorage.getItem("Type");

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Eğer yetkisi varsa, alt rotaları (Outlet) render et
  return <Outlet />;
};