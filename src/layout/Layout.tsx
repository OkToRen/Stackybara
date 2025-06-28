import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import FloatingChatButton from '@/components/ui/floatingchatbutton';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      <FloatingChatButton/>
      <Newsletter />
      <Footer />
    </>
  );
}
