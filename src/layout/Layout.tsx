import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import FloatingChatButton from '@/components/ui/floatingchatbutton';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');
  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      {!isChatPage && <FloatingChatButton/>}
      <Newsletter />
      <Footer />
    </>
  );
}
