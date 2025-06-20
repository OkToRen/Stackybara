import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <Newsletter />
      <Footer />
    </>
  );
}
