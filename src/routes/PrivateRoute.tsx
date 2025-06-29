import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/lib/AuthContext';
import Layout from '@/layout/Layout';
import StackybaraLoadingPage from '@/pages/LoadingScreen';

export const PrivateRoute = () => {
  const { isAuthenticated, loginLoading, authChecked } = useAuthContext();

  if (!authChecked || loginLoading) return <StackybaraLoadingPage />;

  return isAuthenticated ? <Layout /> : <Navigate to="/" replace />;
};
