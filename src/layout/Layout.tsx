import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Newsletter from "@/components/Newsletter"
import FloatingChatButton from "@/components/ui/floatingchatbutton"
import FloatingWalletButton from "@/components/ui/floatingwalletbutton"
import { Outlet, useLocation } from "react-router-dom"

export default function Layout() {
  const location = useLocation()
  const isChatPage = location.pathname.startsWith("/chat")
  const isWalletPage = location.pathname.startsWith("/wallet")

  return (
    <>
      <Header />
      <div className="App">
        <Outlet />
      </div>
      {!isChatPage && <FloatingChatButton />}
      {!isWalletPage && <FloatingWalletButton />}
      <Newsletter />
      <Footer />
    </>
  )
}
