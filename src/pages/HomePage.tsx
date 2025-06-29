"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Star,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  ShoppingCart,
  Heart,
  TrendingUp,
  Users,
  Package,
  Award,
  CheckCircle,
  Play,
  Sparkles,
  Gift,
  Clock,
  Truck,
  ShoppingBag,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "@/components/ui/badge"
import Logo from "../assets/Logo.png"
import { useProduct } from "@/lib/ProductContext"
import { useCart } from "@/lib/CartContext"
import { useAuthContext } from "@/lib/AuthContext"
import { Product } from "@/declarations/backend/backend.did"

export default function HomePage() {
  const { product, setProduct } = useProduct()
  const navigate = useNavigate()
  const { addToCart, cart, decreaseFromCart } = useCart()
  const [cartMessage, setCartMessage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [heroInView, setHeroInView] = useState(false)
  const [featuresInView, setFeaturesInView] = useState(false)
  const [productsInView, setProductsInView] = useState(false)
  const [statsInView, setStatsInView] = useState(false)
  const [testimonialsInView, setTestimonialsInView] = useState(false)
  const [counters, setCounters] = useState({ users: 0, products: 0, transactions: 0, satisfaction: 0 })
  const auth = useAuthContext()

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true)
    setHeroInView(true)

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const createObserver = (setter: (value: boolean) => void) =>
      new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setter(true)
          }
        })
      }, observerOptions)

    const featuresObserver = createObserver(setFeaturesInView)
    const productsObserver = createObserver(setProductsInView)
    const statsObserver = createObserver(setStatsInView)
    const testimonialsObserver = createObserver(setTestimonialsInView)

    const featuresSection = document.getElementById("features-section")
    const productsSection = document.getElementById("products-section")
    const statsSection = document.getElementById("stats-section")
    const testimonialsSection = document.getElementById("testimonials-section")

    if (featuresSection) featuresObserver.observe(featuresSection)
    if (productsSection) productsObserver.observe(productsSection)
    if (statsSection) statsObserver.observe(statsSection)
    if (testimonialsSection) testimonialsObserver.observe(testimonialsSection)

    return () => {
      featuresObserver.disconnect()
      productsObserver.disconnect()
      statsObserver.disconnect()
      testimonialsObserver.disconnect()
    }
  }, [])

  // Animated counter effect
  useEffect(() => {
    if (statsInView) {
      const targets = { users: 50, products: 10, transactions: 100, satisfaction: 98 }
      const duration = 2000
      const steps = 60

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setCounters({
          users: Math.floor(targets.users * easeOut),
          products: Math.floor(targets.products * easeOut),
          transactions: Math.floor(targets.transactions * easeOut),
          satisfaction: Math.floor(targets.satisfaction * easeOut),
        })

        if (step >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [statsInView])

  const handleLogin = () => {
    console.log("login")
    auth.login()
    navigate("/postlogin")
  }

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    if (auth.isAuthenticated) {
      addToCart({
        id: product.productId,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      setCartMessage(`${product.name} added to cart!`)
      setTimeout(() => setCartMessage(null), 3000)
    } else {
      handleLogin()
    }
  }

  const featuredProducts: Product[] = [
    {
      productId: 10,
      storeId: 11,
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      stock: 5,
      rating: 4.8,
      review: 324,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      category: 'Electronics',
      description:
        'Premium quality wireless headphones with noise cancellation',
    },
    {
      productId: 11,
      storeId: 12,
      name: 'Smart Fitness Watch',
      price: 199.99,
      stock: 10,
      rating: 4.6,
      review: 156,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      category: 'Electronics',
      description: 'Track your fitness goals with this advanced smartwatch'
    },
    {
      productId: 12,
      storeId: 13,
      name: 'Ergonomic Laptop Stand',
      price: 45.99,
      stock: 7,
      rating: 4.9,
      review: 89,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      category: 'Office',
      description: 'Adjustable aluminum laptop stand for better posture',
    },
    {
      productId: 13,
      storeId: 14,
      name: 'Portable Bluetooth Speaker',
      price: 79.99,
      stock: 9,
      rating: 4.7,
      review: 203,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      category: 'Electronics',
      description: 'Waterproof speaker with 12-hour battery life'
    },
  ]

  const categories = [
    { name: "Electronics", icon: "📱", count: "2,340", color: "from-blue-500 to-purple-600" },
    { name: "Fashion", icon: "👕", count: "1,890", color: "from-pink-500 to-rose-600" },
    { name: "Home & Garden", icon: "🏠", count: "1,567", color: "from-green-500 to-emerald-600" },
    { name: "Sports", icon: "⚽", count: "987", color: "from-orange-500 to-red-600" },
    { name: "Books", icon: "📚", count: "3,456", color: "from-indigo-500 to-blue-600" },
    { name: "Beauty", icon: "💄", count: "1,234", color: "from-purple-500 to-pink-600" },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: "Amazing platform! The blockchain security gives me peace of mind when shopping online.",
      rating: 5,
      product: "Wireless Headphones",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Enthusiast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "Fast delivery and excellent customer service. The decentralized approach is revolutionary!",
      rating: 5,
      product: "Smart Watch",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Small Business Owner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "As a seller, I love the transparency and low fees. Great platform for growing my business.",
      rating: 5,
      product: "Office Equipment",
    },
  ]

  const stats = [
    { icon: Users, label: "Happy Customers", value: counters.users, suffix: "K+", color: "from-blue-500 to-blue-600" },
    {
      icon: Package,
      label: "Products Listed",
      value: counters.products,
      suffix: "K+",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      label: "Transactions",
      value: counters.transactions,
      suffix: "K+",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      label: "Satisfaction Rate",
      value: counters.satisfaction,
      suffix: "%",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 overflow-hidden">

      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-200/10 rounded-full blur-2xl animate-pulse" />

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ease-out ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
            >
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-800 px-6 py-2 text-sm font-medium animate-bounce-in hover:scale-105 transition-transform duration-300">
                  🚀 Blockchain Powered Commerce
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-amber-900">Decentralized</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 animate-gradient-x">
                    Shopping Experience
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-amber-800 leading-relaxed max-w-2xl">
                  Experience the future of e-commerce with Shoppybara. Every transaction is secure, transparent, and
                  stored on the blockchain. Shop with confidence in our decentralized marketplace.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/products">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                    >
                      Start Shopping
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-amber-300 text-amber-800 hover:bg-amber-50 px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 group bg-transparent"
                    onClick={() => navigate("/about")}
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-amber-700 font-medium">256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-amber-700 font-medium">24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-amber-700 font-medium">Free Returns</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 ease-out delay-300 ${heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
            >
              <div className="relative">
                {/* Main Hero Image */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 group">
                  <img
                    src={Logo || "/placeholder.svg"}
                    alt="Shoppybara Mascot"
                    className="w-full max-w-md mx-auto group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl opacity-20 animate-float" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl opacity-20 animate-float animation-delay-500" />

                {/* Feature Badges */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium text-amber-900">Secure</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium text-amber-900">Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features-section" className="py-20">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-out ${featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-6">Why Choose Shoppybara?</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Built on cutting-edge blockchain technology for a secure and transparent shopping experience that puts you
              in control
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Every purchase is protected by blockchain technology, ensuring your transactions are safe and immutable.",
                color: "from-green-500 to-emerald-600",
                delay: "delay-100",
              },
              {
                icon: Globe,
                title: "Decentralized Network",
                description:
                  "No single point of failure. Our distributed network ensures 24/7 availability and complete transparency.",
                color: "from-blue-500 to-cyan-600",
                delay: "delay-300",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Optimized smart contracts ensure quick processing times without compromising security or reliability.",
                color: "from-purple-500 to-pink-600",
                delay: "delay-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group cursor-pointer border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${featuresInView ? `opacity-100 translate-y-0 ${feature.delay}` : "opacity-0 translate-y-10"
                  }`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-amber-900 group-hover:text-teal-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section id="products-section" className="py-20">
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 transition-all duration-800 ease-out ${productsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-4">Featured Products</h2>
              <p className="text-lg text-amber-700">Handpicked items just for you with the best deals</p>
            </div>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-2 border-amber-300 text-amber-800 hover:bg-amber-50 px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 group bg-transparent"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Cart Message */}
          {cartMessage && (
            <div className="fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-slide-in-from-right">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                <span className="font-medium">{cartMessage}</span>
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => {
              const cartItem = cart.find((item) => item.id === product.productId)
              const discount = Math.round((product.price * 90) / 100)

              return (
                <Link key={product.productId} to="/productdetails" onClick={() => setProduct(product)}>
                  <Card
                    className={`group cursor-pointer border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl overflow-hidden ${productsInView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                      }`}
                    style={{
                      transitionDelay: productsInView ? `${index * 150}ms` : "0ms",
                    }}
                  >
                    <CardHeader className="p-0 relative">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


                        {/* Wishlist Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute bottom-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Heart className="h-4 w-4 text-amber-600" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Badge variant="outline" className="text-xs text-teal-600 border-teal-200">
                          {product.category}
                        </Badge>

                        <h3 className="font-semibold text-amber-900 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium text-amber-700 ml-1">{product.rating}</span>
                          </div>
                          <span className="text-sm text-amber-600">({product.review} reviews)</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-amber-900">${product.price}</span>
                              <span className="text-sm text-amber-600 line-through">${product.price}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="flex items-center space-x-4 text-xs text-amber-600">
                          <div className="flex items-center space-x-1">
                            <Truck className="h-3 w-3" />
                            <span>Free shipping</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>2-day delivery</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      {cartItem ? (
                        <div className="flex items-center w-full gap-3">
                          <div className="flex items-center bg-amber-100 rounded-lg">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-amber-200 rounded-l-lg"
                              onClick={(e) => {
                                e.preventDefault()
                                decreaseFromCart(product.productId)
                              }}
                            >
                              -
                            </Button>
                            <span className="px-3 py-1 font-semibold text-amber-900 min-w-[2rem] text-center">
                              {cartItem.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 hover:bg-amber-200 rounded-r-lg"
                              onClick={(e) => {
                                e.preventDefault()
                                addToCart({
                                  id: product.productId,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image,
                                })
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAddToCart(product)
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add More
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-lg transform hover:scale-105 transition-all duration-300 group/btn"
                          onClick={(e) => {
                            e.preventDefault()
                            handleAddToCart(product)
                          }}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                          Add to Cart
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-800 ease-out ${testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Real feedback from our satisfied customers and sellers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl group ${testimonialsInView ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-amber-800 mb-6 leading-relaxed italic">"{testimonial.content}"</p>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-200"
                    />
                    <div>
                      <div className="font-semibold text-amber-900">{testimonial.name}</div>
                      <div className="text-sm text-amber-600">{testimonial.role}</div>
                      <div className="text-xs text-teal-600">Purchased: {testimonial.product}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-emerald-600/90" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float animation-delay-1000" />

        <div className="relative container mx-auto px-4 text-center">
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to Start Shopping?</h2>
              <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
            </div>

            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied customers who trust Shoppybara for their online shopping needs. Experience the
              future of decentralized commerce today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                  Start Shopping Now
                </Button>
              </Link>
              <Link to="/postseller">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Become a Seller
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-teal-100 pt-8">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
