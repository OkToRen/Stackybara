"use client"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, X, Heart, Bell, ChevronDown, Sparkles, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Logo from "@/assets/Logo.png"
import { useCart } from "@/lib/CartContext"
import { useAuthContext } from "@/lib/AuthContext"

export default function Header() {
  const auth = useAuthContext()
  const { cart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const isProductsRoute = location.pathname.startsWith("/products")
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Header background opacity
      setScrolled(currentScrollY > 20)

      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Clear search on route change
  useEffect(() => {
    setSearchValue("")
    setMobileMenuOpen(false)
  }, [location.pathname])

  const handleLogin = () => {
    console.log("login")
    auth.login()
    navigate("/postlogin")
  }

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchValue)}`)
    }
  }

  const navigationItems = [
    { name: "Features", path: "/features", icon: Sparkles },
    { name: "Products", path: "/products", icon: ShoppingCart },
    { name: "About", path: "/about", icon: Shield },
  ]

  const quickActions = [
    { name: "Deals", badge: "Hot", color: "bg-red-500" },
    { name: "New", badge: "Fresh", color: "bg-green-500" },
    { name: "Trending", badge: "🔥", color: "bg-orange-500" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-amber-200/50"
            : "bg-white/80 backdrop-blur-sm border-b border-amber-200/30"
        }`}
      >
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 px-4 text-center text-sm font-medium">
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>🎉 Free shipping on orders over $50! Limited time offer</span>
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-amber-100 to-teal-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-all duration-300">
                  <img
                    src={Logo || "/placeholder.svg"}
                    alt="Shoppybara Logo"
                    className="w-8 h-8 group-hover:animate-bounce"
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-900 to-teal-800 bg-clip-text text-transparent group-hover:from-teal-600 group-hover:to-emerald-600 transition-all duration-300">
                  Shoppybara
                </span>
                <div className="text-xs text-amber-600 font-medium">Blockchain Commerce</div>
              </div>
            </Link>

            {/* Enhanced Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 transition-opacity duration-300 ${
                    searchFocused ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="relative flex items-center">
                  <div className="absolute left-4 z-10">
                    <Search className="h-5 w-5 text-amber-600 group-focus-within:text-teal-600 transition-colors duration-300" />
                  </div>
                  <Input
                    placeholder="Search for products, brands, and more..."
                    className="pl-12 pr-32 py-3 w-full bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-teal-500 focus:bg-white transition-all duration-300 text-amber-900 placeholder:text-amber-600/60"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <Button
                    className="absolute right-0 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-2 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>

                {/* Search Suggestions */}
                {searchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-200/50 p-4 animate-fade-in">
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-amber-800 mb-2">Quick Actions</div>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action, index) => (
                          <button
                            key={index}
                            className="flex items-center space-x-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors duration-200 text-sm"
                          >
                            <span className="text-amber-800">{action.name}</span>
                            <Badge className={`${action.color} text-white text-xs px-2 py-0.5`}>{action.badge}</Badge>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                {navigationItems.map((item, index) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                        isActive ? "bg-teal-100 text-teal-700" : "text-amber-800 hover:text-teal-600 hover:bg-teal-50"
                      }`}
                    >
                      <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-amber-800 hover:text-teal-600 hover:bg-teal-50 rounded-xl p-3 group"
                >
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </Badge>
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-amber-800 hover:text-teal-600 hover:bg-teal-50 rounded-xl p-3 group"
                >
                  <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </Button>

                {/* Cart */}
                {auth.isAuthenticated && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative text-amber-800 hover:text-teal-600 hover:bg-teal-50 rounded-xl p-3 group"
                  >
                    <Link to="/cart" className="flex items-center">
                      <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full animate-bounce-in">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                )}

                {/* User Account */}
                {auth.isAuthenticated ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-amber-800 hover:text-teal-600 hover:bg-teal-50 rounded-xl p-3 group"
                  >
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-2 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-amber-800 hover:text-teal-600 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300" />
              )}
            </Button>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4 py-3 w-full bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-teal-500 focus:bg-white transition-all duration-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 w-80 h-full bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="p-6 space-y-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between pb-4 border-b border-amber-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-teal-100 rounded-xl flex items-center justify-center">
                    <img src={Logo || "/placeholder.svg"} alt="Logo" className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold text-amber-900">Menu</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)} className="text-amber-800">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navigationItems.map((item, index) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isActive ? "bg-teal-100 text-teal-700" : "text-amber-800 hover:text-teal-600 hover:bg-teal-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-3 pt-4 border-t border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-800">Quick Actions</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 justify-center py-3 border-amber-200 text-amber-800 hover:bg-teal-50 bg-transparent"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Button>

                  {auth.isAuthenticated && (
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 justify-center py-3 border-amber-200 text-amber-800 hover:bg-teal-50 bg-transparent"
                    >
                      <Link to="/cart" className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span>Cart ({cartCount})</span>
                      </Link>
                    </Button>
                  )}
                </div>

                {/* Mobile Auth */}
                <div className="pt-4">
                  {auth.isAuthenticated ? (
                    <Link to="/profile">
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 rounded-xl">
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 rounded-xl"
                    >
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-32" />
    </>
  )
}
