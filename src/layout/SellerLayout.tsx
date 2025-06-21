import { Outlet } from 'react-router-dom';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer'; 



export default function SellerLayout() {
  return (
    <>
      <SellerHeader />
      <main>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}