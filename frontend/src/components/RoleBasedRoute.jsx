
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export const RoleBasedRoute = ({ allowedRoles }) => {
    const { user, loading,logout } = useAuth();
  const userType =String(user.Type)

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};