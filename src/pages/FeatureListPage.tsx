"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingBag,
  ShoppingCart,
  User,
  MessageCircle,
  Package,
  BarChart3,
  HeadphonesIcon,
  Store,
  Truck,
  Grid3X3,
  UserPlus,
  Info,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Lock,
  Users,
  X,
  Play,
  Star,
  Clock,
  Award,
  HelpCircle,
  Eye,
  Search,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import aboutus from "@/assets/aboutus.jpg"
import livechat from "@/assets/livechat.jpg"
import orderprocessing from "@/assets/orderprocessing.png"
import productmanager from "@/assets/productmanager.png"
import productscatalog from "@/assets/productscatalog.jpg"
import sellerdashboard from "@/assets/sellerdashboard.png"
import sellertransformation from "@/assets/sellertransformation.jpg"
import shoppingcart from "@/assets/shoppingcart.jpg"
import smartonboarding from "@/assets/smartonboarding.png"
import storecustom from "@/assets/storecustom.png"
import supportcenter from "@/assets/supportcenter.jpg"
import userprofile from "@/assets/userprofile.png"

const FeaturesPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const customerFeatures = [
    {
      id: "products-catalog",
      title: "Products Catalog",
      description:
        "Browse and search through our extensive product collection with advanced filtering and AI-powered recommendations",
      route: "/products",
      icon: ShoppingBag,
      color: "from-emerald-500 to-teal-600",
      image: productscatalog,
      category: "Shopping",
      features: ["Advanced Search", "Smart Filters", "Product Reviews", "Wishlist Integration"],
      stats: { items: "10K+", categories: "50+" },
      benefits: ["Find products faster", "Compare prices easily", "Read authentic reviews"],
      popularity: 95,
      difficulty: "Easy",
      estimatedTime: "2 min",
    },
    {
      id: "shopping-cart",
      title: "Smart Shopping Cart",
      description: "Intelligent cart management with saved items and quick checkout",
      route: "/cart",
      icon: ShoppingCart,
      image: shoppingcart,
      category: "Shopping",
      protected: true,
      features: ["Auto-Save", "Price Tracking", "Bulk Actions", "Quick Checkout"],
      stats: { saved: "99%", speed: "3x Faster" },
      benefits: ["Never lose items", "Track price changes", "Checkout in seconds"],
      popularity: 92,
      difficulty: "Easy",
      estimatedTime: "Instant",
    },
    {
      id: "user-profile",
      title: "User Profile & Dashboard",
      description: "Comprehensive account management with personalized dashboard",
      route: "/profile",
      icon: User,
      image: userprofile,
      category: "Account",
      protected: true,
      features: ["Order History", "Preferences", "Security Settings", "Achievements"],
      stats: { orders: "Track All", security: "256-bit SSL" },
      benefits: ["Track all orders", "Secure account", "Earn rewards"],
      popularity: 88,
      difficulty: "Easy",
      estimatedTime: "5 min",
    },
    {
      id: "chat-support",
      title: "Live Chat Support",
      description: "24/7 real-time messaging with AI-powered assistance",
      route: "/chat",
      icon: MessageCircle,
      image: livechat,
      category: "Communication",
      features: ["24/7 AI Support", "Human Agents", "Multi-language", "File Sharing"],
      stats: { response: "<30s", satisfaction: "98%" },
      benefits: ["Instant help", "Multiple languages", "Share files easily"],
      popularity: 90,
      difficulty: "Easy",
      estimatedTime: "Instant",
    },
    {
      id: "support-center",
      title: "Support Center",
      description: "Comprehensive help center with ticket system and knowledge base",
      route: "/support",
      icon: HeadphonesIcon,
      image: supportcenter,
      category: "Support",
      protected: true,
      features: ["Ticket System", "Knowledge Base", "Video Tutorials", "Community Forum"],
      stats: { articles: "500+", resolution: "24h avg" },
      benefits: ["Self-service options", "Fast resolution", "Video guides"],
      popularity: 85,
      difficulty: "Easy",
      estimatedTime: "Instant",
    },
    {
      id: "about-us",
      title: "About Shoppybara",
      description: "Learn about our blockchain-powered e-commerce revolution",
      route: "/about",
      icon: Info,
      image: aboutus,
      category: "Information",
      features: ["Company Story", "Team Profiles", "Mission & Vision", "Blockchain Tech"],
      stats: { founded: "2024", team: "50+ Members" },
      benefits: ["Learn our story", "Meet the team", "Understand our mission"],
      popularity: 75,
      difficulty: "Easy",
      estimatedTime: "5 min",
    },
  ]

  const sellerFeatures = [
    {
      id: "seller-dashboard",
      title: "Seller Analytics Dashboard",
      description: "Advanced analytics and performance insights for your store",
      route: "/seller",
      icon: BarChart3,
      image: sellerdashboard,
      category: "Seller Tools",
      features: ["Real-time Analytics", "Sales Reports", "Customer Insights", "Revenue Tracking"],
      stats: { metrics: "20+", updates: "Real-time" },
      benefits: ["Data-driven decisions", "Predict trends", "Understand customers"],
      popularity: 93,
      difficulty: "Medium",
      estimatedTime: "10 min",
    },
    {
      id: "product-manager",
      title: "AI Product Manager",
      description: "Intuitive product management with bulk operations and AI assistance",
      route: "/seller/productmanager",
      icon: Grid3X3,
      image: productmanager,
      category: "Seller Tools",
      features: ["Bulk Upload", "AI Descriptions", "Image Optimization", "Inventory Sync"],
      stats: { upload: "1000+ items", time: "90% Faster" },
      benefits: ["Save time", "AI assistance", "Optimize images"],
      popularity: 89,
      difficulty: "Medium",
      estimatedTime: "15 min",
    },
    {
      id: "order-management",
      title: "Smart Order Processing",
      description: "Streamlined order processing with automated workflows",
      route: "/seller/orders",
      icon: Truck,
      image: orderprocessing,
      category: "Seller Tools",
      features: ["Auto-Processing", "Shipping Labels", "Tracking Updates", "Return Management"],
      stats: { processing: "Automated", tracking: "Real-time" },
      benefits: ["Automate workflows", "Track shipments", "Handle returns"],
      popularity: 91,
      difficulty: "Medium",
      estimatedTime: "20 min",
    },
    {
      id: "store-profile",
      title: "Store Customization Suite",
      description: "Build your brand with customizable store themes and layouts",
      route: "/seller/profile",
      icon: Store,
      image: storecustom,
      category: "Seller Tools",
      features: ["Custom Themes", "Brand Assets", "Store Analytics", "SEO Optimization"],
      stats: { themes: "50+", customization: "Unlimited" },
      benefits: ["Unique branding", "Professional look", "SEO optimized"],
      popularity: 87,
      difficulty: "Advanced",
      estimatedTime: "30 min",
    },
  ]

  const authFeatures = [
    {
      id: "post-login",
      title: "Smart Onboarding",
      description: "Guided setup process to personalize your Shoppybara experience",
      route: "/postlogin",
      icon: UserPlus,
      image: smartonboarding,
      category: "Authentication",
      features: ["Profile Setup", "Preferences", "Tutorial", "Welcome Bonus"],
      stats: { completion: "5 min", bonus: "$10 Credit" },
      benefits: ["Quick setup", "Personalized experience", "Welcome rewards"],
      popularity: 82,
      difficulty: "Easy",
      estimatedTime: "5 min",
    },
    {
      id: "become-seller",
      title: "Seller Transformation",
      description: "Transform your account into a powerful selling platform",
      route: "/postseller",
      icon: Store,
      image: sellertransformation,
      category: "Authentication",
      features: ["Verification Process", "Store Setup", "Payment Config", "First Product"],
      stats: { approval: "24h", commission: "Low Fees" },
      benefits: ["Fast approval", "Low fees", "Complete setup"],
      popularity: 78,
      difficulty: "Medium",
      estimatedTime: "30 min",
    },
  ]

  const allFeatures = [...customerFeatures, ...sellerFeatures, ...authFeatures]

  const categories = [
    { id: "all", name: "All Features", count: allFeatures.length, icon: Grid3X3 },
    {
      id: "Shopping",
      name: "Shopping",
      count: customerFeatures.filter((f) => f.category === "Shopping").length,
      icon: ShoppingBag,
    },
    {
      id: "Account",
      name: "Account",
      count: customerFeatures.filter((f) => f.category === "Account").length,
      icon: User,
    },
    { id: "Seller Tools", name: "Seller Tools", count: sellerFeatures.length, icon: Store },
    {
      id: "Communication",
      name: "Communication",
      count: customerFeatures.filter((f) => f.category === "Communication").length,
      icon: MessageCircle,
    },
    {
      id: "Support",
      name: "Support",
      count: customerFeatures.filter((f) => f.category === "Support").length,
      icon: HeadphonesIcon,
    },
  ]

  // Filter features based on search and category
  const filteredFeatures = allFeatures.filter((feature) => {
    const matchesCategory = activeCategory === "all" || feature.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  interface Feature {
    id: string
    title: string
    description: string
    route: string
    icon: React.ElementType
    image?: string
    category: string
    protected?: boolean
    features: string[]
    stats: Record<string, string | undefined>
    benefits: string[]
    popularity: number
    difficulty: string
    estimatedTime: string
  }

  const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
    const IconComponent = feature.icon

    return (
      <Card
        className={`group relative overflow-hidden border-amber-200/50 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ${
          isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => {
          setSelectedFeature(feature)
          setShowModal(true)
        }}
      >
        {/* Teal Accent Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500/30 rounded-lg transition-colors duration-300 pointer-events-none" />

        {/* Feature Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-50 to-teal-50">
          <img
            src={feature.image || "/placeholder.svg"}
            alt={feature.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Feature Icon */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <IconComponent className="h-6 w-6 text-white" />
          </div>

          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {feature.protected && (
              <Badge className="bg-red-500/90 text-white border-0 backdrop-blur-sm text-xs">
                <Lock className="h-3 w-3 mr-1" />
                Login Required
              </Badge>
            )}
            <Badge className="bg-white/90 text-teal-700 border-0 backdrop-blur-sm text-xs font-medium">
              {feature.category}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button
              size="sm"
              className="bg-white/90 text-teal-700 hover:bg-white rounded-lg backdrop-blur-sm h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedFeature(feature)
                setShowModal(true)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-teal-500 text-white hover:bg-teal-600 rounded-lg h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                // Handle demo
              }}
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>

          {/* Popularity Indicator */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-amber-900">{feature.popularity}%</span>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title and Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-amber-900 group-hover:text-teal-600 transition-colors duration-300">
                {feature.title}
              </CardTitle>
              <div
                className="relative"
                onMouseEnter={() => setHoveredTooltip(feature.id)}
                onMouseLeave={() => setHoveredTooltip(null)}
              >
                <HelpCircle className="h-5 w-5 text-amber-600 hover:text-teal-600 transition-colors cursor-help" />

                {/* Tooltip */}
                {hoveredTooltip === feature.id && (
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-teal-600 text-white text-sm rounded-lg shadow-xl z-50 animate-fade-in">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Difficulty:</span>
                        <Badge
                          className={`text-xs ${
                            feature.difficulty === "Easy"
                              ? "bg-green-500"
                              : feature.difficulty === "Medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          } text-white border-0`}
                        >
                          {feature.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Setup Time:</span>
                        <span className="text-teal-100">{feature.estimatedTime}</span>
                      </div>
                      <div className="text-teal-100 text-xs">Click to view detailed information</div>
                    </div>
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-teal-600"></div>
                  </div>
                )}
              </div>
            </div>
            <CardDescription className="text-amber-700 leading-relaxed">{feature.description}</CardDescription>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(feature.stats)
              .slice(0, 2)
              .map(([key, value], idx) => (
                <div key={idx} className="bg-teal-50 rounded-lg p-3 text-center border border-teal-100">
                  <div className="text-lg font-bold text-teal-700">{value}</div>
                  <div className="text-xs text-teal-600 capitalize">{key}</div>
                </div>
              ))}
          </div>

          {/* Key Benefits */}
          <div className="space-y-2 pb-4">
            <h4 className="text-sm font-semibold text-amber-800">Key Benefits:</h4>
            <div className="space-y-1">
              {feature.benefits.slice(0, 2).map((benefit, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-sm text-amber-700">
                  <CheckCircle className="h-3 w-3 text-teal-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Link to={feature.route}>
            <Button
              className="w-full bg-teal-500 hover:bg-teal-600 text-white transform hover:scale-105 transition-all duration-300 shadow-lg group/btn"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="group-hover/btn:mr-2 transition-all duration-300">Explore Feature</span>
              <ArrowRight className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Feature Detail Modal
  const FeatureModal = ({
    feature,
    isOpen,
    onClose,
  }: { feature: Feature | null; isOpen: boolean; onClose: () => void }) => {
    if (!feature || !isOpen) return null

    const IconComponent = feature.icon

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-bounce-in">
          {/* Modal Header */}
          <div className="relative p-6 bg-teal-500 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{feature.title}</h2>
                  <p className="text-teal-100">{feature.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Feature Image */}
            <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-teal-50">
              <img
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">About This Feature</h3>
              <p className="text-amber-700 leading-relaxed">{feature.description}</p>
            </div>

            {/* Stats Grid */}
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Performance Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(feature.stats).map(([key, value], idx) => (
                  <div key={idx} className="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
                    <div className="text-2xl font-bold text-teal-700 mb-1">{value}</div>
                    <div className="text-sm text-teal-600 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {feature.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg border border-teal-100"
                  >
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span className="text-amber-800 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {feature.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-100"
                  >
                    <Star className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span className="text-amber-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-amber-50 to-teal-50 rounded-xl border border-teal-100">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-teal-600" />
                </div>
                <div className="text-sm font-medium text-amber-900">Popularity</div>
                <div className="text-lg font-bold text-teal-700">{feature.popularity}%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                </div>
                <div className="text-sm font-medium text-amber-900">Difficulty</div>
                <Badge
                  className={`${
                    feature.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : feature.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {feature.difficulty}
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                </div>
                <div className="text-sm font-medium text-amber-900">Setup Time</div>
                <div className="text-sm font-bold text-teal-700">{feature.estimatedTime}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Link to={feature.route} className="flex-1">
                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 text-lg font-semibold">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-teal-300 text-teal-700 hover:bg-teal-50 px-8 bg-transparent"
                onClick={() => {
                  // Handle demo video
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: Store, label: "Active Stores", value: "2K+" },
    { icon: Package, label: "Products Listed", value: "100K+" },
    { icon: TrendingUp, label: "Monthly Growth", value: "25%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/10 rounded-full blur-2xl animate-pulse" />

      <main className="relative container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative inline-flex items-center justify-center p-6 bg-teal-500 rounded-3xl mb-8 shadow-2xl group">
            <div className="absolute -inset-2 bg-teal-400 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl" />
            <Grid3X3 className="h-12 w-12 text-white relative z-10 group-hover:animate-bounce" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-amber-900 via-teal-800 to-emerald-800 bg-clip-text text-transparent">
              Shoppybara Features
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-amber-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            Discover our comprehensive suite of blockchain-powered e-commerce tools designed to transform your shopping
            and selling experience.
          </p>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border-amber-200/50 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-teal-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-amber-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-amber-700">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div
          className={`mb-12 transition-all duration-1000 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
              <Input
                placeholder="Search features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full bg-white/90 border-2 border-amber-200 rounded-2xl focus:border-teal-500 focus:bg-white transition-all duration-300 text-amber-900 placeholder:text-amber-600/60"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-teal-500 text-white shadow-lg scale-105"
                    : "border-amber-300 text-amber-800 hover:bg-amber-50 hover:scale-105 bg-white/80 backdrop-blur-sm"
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
                <Badge className="ml-2 bg-white/20 text-current border-0 text-xs">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`transition-all duration-1000 ease-out delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {filteredFeatures.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
                <Search className="h-12 w-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">No Features Found</h3>
              <p className="text-amber-700 mb-6">Try adjusting your search terms or selecting a different category.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div
          className={`transition-all duration-1000 ease-out delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="relative overflow-hidden border-0 bg-teal-500 text-white shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float" />
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-float animation-delay-500" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full animate-pulse" />
            </div>

            <CardContent className="relative p-12 text-center">
              <div className="space-y-8">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                  <h3 className="text-4xl font-bold">Ready to Get Started?</h3>
                  <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                </div>

                <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of users who are already experiencing the future of blockchain-powered e-commerce.
                  Start your journey today!
                </p>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                  {[
                    { icon: Shield, title: "Secure", desc: "Blockchain protected" },
                    { icon: Zap, title: "Fast", desc: "Lightning quick" },
                    { icon: Globe, title: "Global", desc: "Worldwide access" },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <benefit.icon className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{benefit.title}</div>
                        <div className="text-sm opacity-80">{benefit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link to="/products">
                    <Button
                      size="lg"
                      className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg group"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                      Start Shopping
                    </Button>
                  </Link>
                  <Link to="/postseller">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 group bg-transparent"
                    >
                      <Store className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                      Become a Seller
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center space-x-8 text-sm opacity-80">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>No setup fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>24/7 support</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Feature Detail Modal */}
      <FeatureModal
        feature={selectedFeature}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setSelectedFeature(null)
        }}
      />
    </div>
  )
}

export default FeaturesPage
