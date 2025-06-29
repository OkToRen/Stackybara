import { Outlet, useLocation } from 'react-router-dom';
import SellerHeader from '@/components/SellerHeader';
import Footer from '@/components/Footer'; 
import FloatingChatButton from "@/components/ui/floatingchatbutton"
import FloatingWalletButton from "@/components/ui/floatingwalletbutton"

export default function SellerLayout() {
  const location = useLocation()
  const isChatPage = location.pathname.startsWith("/chat")
  const isWalletPage = location.pathname.startsWith("/wallet")

  return (
    <>
      <SellerHeader />
      <main>
        <Outlet />
      </main>
      {!isChatPage && <FloatingChatButton />}
      {!isWalletPage && <FloatingWalletButton />}
      <Footer /> 
    </>
  );
}