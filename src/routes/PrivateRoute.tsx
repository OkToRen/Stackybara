import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/lib/AuthContext';

export const PrivateRoute = () => {
  const auth = useAuthContext();

  if (auth.loginLoading) return <div>Loading...</div>; // Or a spinner component

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
