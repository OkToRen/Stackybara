import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/lib/AuthContext';
import Layout from '@/layout/Layout';
import StackybaraLoadingPage from '@/pages/LoadingScreen';
import SellerLayout from '@/layout/SellerLayout';

export const PrivateRoute = () => {
  const { isAuthenticated, loginLoading, authChecked } = useAuthContext();
  const location = useLocation();

  if (!authChecked || loginLoading) return <StackybaraLoadingPage />;

  const layout = location.pathname.startsWith('/seller') ? (
    <SellerLayout />
  ) : (
    <Layout />
  );

  return isAuthenticated ? layout : <Navigate to="/" replace />;
};
