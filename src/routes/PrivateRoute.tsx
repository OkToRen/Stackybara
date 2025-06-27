import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/lib/AuthContext';
import Layout from '@/layout/Layout';

export const PrivateRoute = () => {
  const auth = useAuthContext();

  if (auth.loginLoading) return <div>Loading...</div>; // Or a spinner component

  return auth.isAuthenticated ? <Layout /> : <Navigate to="/" replace />;
};
