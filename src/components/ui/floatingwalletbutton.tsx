"use client"

import { useState, useEffect } from "react"
import { Wallet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/lib/AuthContext"

export default function FloatingWalletButton() {
  const [isVisible, setIsVisible] = useState(true)
  const [hasNotification, setHasNotification] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const auth = useAuthContext()

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleWalletClick = () => {
    if (auth.isAuthenticated) {
      navigate("/wallet")
      setHasNotification(false)
    } else {
      auth.login()
    }
  }

  if (!isVisible || !auth.isAuthenticated) return null

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="relative">
        {/* Notification Badge */}
        {hasNotification && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce z-10">
            <Plus className="h-3 w-3" />
          </div>
        )}

        {/* Pulsing Ring */}
        {hasNotification && (
          <div className="absolute inset-0 w-14 h-14 bg-amber-500 rounded-full animate-ping opacity-20"></div>
        )}

        {/* Main Button */}
        <Button
          onClick={handleWalletClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 relative z-10"
        >
          <Wallet className="h-6 w-6" />
        </Button>

        {/* Balance Preview (Optional) */}
        {isHovered && (
          <div className="absolute bottom-20 left-0 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-900 px-4 py-3 rounded-lg shadow-lg border border-amber-200 whitespace-nowrap">
            <div className="text-xs text-amber-700 mb-1">Current Balance</div>
            <div className="text-lg font-bold">1,247.85 ICP</div>
            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-50"></div>
          </div>
        )}
      </div>
    </div>
  )
}
