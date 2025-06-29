"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  ArrowUp,
  Shield,
  Zap,
  Globe,
  Heart,
  Send,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/assets/Logo.png"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    const footerElement = document.getElementById("footer")
    if (footerElement) observer.observe(footerElement)

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Handle newsletter subscription
      console.log("Newsletter subscription:", email)
      setEmail("")
    }
  }

  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "All Products", path: "/products", icon: ChevronRight },
        { name: "New Arrivals", path: "/new-arrivals", icon: ChevronRight },
        { name: "Best Sellers", path: "/bestsellers", icon: ChevronRight },
        { name: "Sale Items", path: "/sale", icon: ChevronRight },
        { name: "Gift Cards", path: "/gift-cards", icon: ChevronRight },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help", icon: ChevronRight },
        { name: "Contact Us", path: "/contact", icon: ChevronRight },
        { name: "Shipping Info", path: "/shipping", icon: ChevronRight },
        { name: "Returns & Exchanges", path: "/returns", icon: ChevronRight },
        { name: "Size Guide", path: "/size-guide", icon: ChevronRight },
      ],
    },
    {
      title: "Blockchain",
      links: [
        { name: "How It Works", path: "/how-it-works", icon: ChevronRight },
        { name: "Security", path: "/security", icon: ChevronRight },
        { name: "Transparency", path: "/transparency", icon: ChevronRight },
        { name: "Whitepaper", path: "/whitepaper", icon: ChevronRight },
        { name: "Developer API", path: "/api", icon: ChevronRight },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about", icon: ChevronRight },
        { name: "Careers", path: "/careers", icon: ChevronRight },
        { name: "Press Kit", path: "/press", icon: ChevronRight },
        { name: "Investor Relations", path: "/investors", icon: ChevronRight },
        { name: "Sustainability", path: "/sustainability", icon: ChevronRight },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com", color: "hover:text-blue-400" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", color: "hover:text-sky-400" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", color: "hover:text-pink-400" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, url: "https://youtube.com", color: "hover:text-red-500" },
    { name: "GitHub", icon: Github, url: "https://github.com", color: "hover:text-gray-400" },
  ]

  const features = [
    { icon: Shield, title: "Secure Payments", description: "256-bit SSL encryption" },
    { icon: Zap, title: "Fast Delivery", description: "Same-day shipping available" },
    { icon: Globe, title: "Global Reach", description: "Shipping to 50+ countries" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "GDPR Compliance", path: "/gdpr" },
  ]

  return (
    <>
      <footer
        id="footer"
        className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-teal-900 text-amber-100 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl animate-float animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-2xl animate-pulse" />

        {/* Main Footer Content */}
        <div className="relative container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div
              className={`lg:col-span-2 space-y-6 transition-all duration-800 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-4">
                <Link to="/" className="flex items-center space-x-3 group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
                    <div className="relative w-12 h-12 bg-gradient-to-br from-amber-100 to-teal-100 rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg group-hover:scale-110 transition-all duration-300">
                      <img
                        src={Logo || "/placeholder.svg"}
                        alt="Shoppybara Logo"
                        className="w-8 h-8 group-hover:animate-bounce"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-white group-hover:text-teal-300 transition-colors duration-300">
                      Shoppybara
                    </span>
                    <div className="text-sm text-amber-300 font-medium">Blockchain Commerce</div>
                  </div>
                </Link>

                <p className="text-amber-200 leading-relaxed">
                  Revolutionizing e-commerce through blockchain technology. Experience secure, transparent, and
                  decentralized shopping like never before.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-amber-200">
                    <MapPin className="h-5 w-5 text-teal-400" />
                    <span>123 Blockchain Street, Crypto City, CC 12345</span>
                  </div>
                  <div className="flex items-center space-x-3 text-amber-200">
                    <Phone className="h-5 w-5 text-teal-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-amber-200">
                    <Mail className="h-5 w-5 text-teal-400" />
                    <span>hello@shoppybara.com</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Why Choose Us</h4>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <div className="w-8 h-8 bg-teal-600/20 rounded-lg flex items-center justify-center group-hover:bg-teal-600/30 transition-colors duration-300">
                        <feature.icon className="h-4 w-4 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{feature.title}</div>
                        <div className="text-amber-300 text-xs">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={`space-y-4 transition-all duration-800 ease-out ${
                    isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${(sectionIndex + 1) * 200}ms` }}
                >
                  <h3 className="text-white font-bold text-lg mb-4 relative">
                    {section.title}
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.path}
                          className="flex items-center space-x-2 text-amber-200 hover:text-teal-300 transition-all duration-300 group"
                        >
                          <link.icon className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="relative border-t border-amber-700/50 bg-gradient-to-r from-amber-900/50 to-teal-900/50">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              {/* Social Media */}
              <div
                className={`flex items-center space-x-6 transition-all duration-800 ease-out ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <span className="text-white font-medium">Follow Us:</span>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-200 ${social.color} hover:bg-white/20 transform hover:scale-110 transition-all duration-300 group`}
                    >
                      <social.icon className="h-5 w-5 group-hover:animate-bounce" />
                    </a>
                  ))}
                </div>
              </div>

              {/* App Download Badges */}
              <div
                className={`flex items-center space-x-4 transition-all duration-800 ease-out ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <span className="text-white font-medium hidden sm:block">Download App:</span>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300 group"
                  >
                    <span className="text-sm">App Store</span>
                    <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-300 group"
                  >
                    <span className="text-sm">Google Play</span>
                    <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Legal Links & Copyright */}
            <div className="mt-8 pt-8 border-t border-amber-700/30">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm">
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="text-amber-300 hover:text-teal-300 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-amber-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">© 2024 Shoppybara. All rights reserved.</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">Made with</span>
                    <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                    <span className="text-sm">for the blockchain community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
