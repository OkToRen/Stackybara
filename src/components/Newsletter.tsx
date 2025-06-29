"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Mail, Gift, Bell, Zap, CheckCircle, ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

    const section = document.getElementById("newsletter-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubscribed(true)
    setEmail("")

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Deals",
      description: "Get early access to special offers and discounts",
    },
    {
      icon: Bell,
      title: "Product Updates",
      description: "Be first to know about new arrivals and features",
    },
    {
      icon: Zap,
      title: "Blockchain Insights",
      description: "Stay informed about the latest in decentralized commerce",
    },
  ]

  return (
    <section
      id="newsletter-section"
      className="relative py-20 bg-gradient-to-br from-amber-50 via-teal-50 to-emerald-50 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/10 rounded-full blur-2xl animate-pulse" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div
              className={`space-y-8 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-6">
                <Badge className="bg-teal-100 text-teal-800 px-4 py-2 text-sm font-medium animate-bounce-in">
                  📧 Newsletter
                </Badge>

                <h2 className="text-4xl md:text-5xl font-bold text-amber-900 leading-tight">
                  Stay{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                    Connected
                  </span>
                </h2>

                <p className="text-lg text-amber-800 leading-relaxed">
                  Join thousands of blockchain enthusiasts and get exclusive updates on new products, special deals, and
                  the latest innovations in decentralized commerce.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid sm:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`group transition-all duration-500 ${
                      isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                  >
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/80 hover:scale-105 hover:-translate-y-1 transition-all duration-300 border border-amber-200/50 shadow-lg hover:shadow-xl">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <benefit.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-amber-700 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-amber-700 font-medium">10K+ Subscribers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm text-amber-700 font-medium">Weekly Updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm text-amber-700 font-medium">No Spam</span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div
              className={`transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
                {!isSubscribed ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto animate-bounce-in">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900">Join Our Community</h3>
                      <p className="text-amber-700">Get exclusive access to deals and blockchain insights</p>
                    </div>

                    <div className="space-y-6">
                      <div className="relative group">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-6 py-4 text-lg bg-amber-50/50 border-2 border-amber-200 rounded-2xl focus:border-teal-500 focus:bg-white transition-all duration-300 placeholder:text-amber-600/60"
                          required
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !email}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Subscribing...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <span>Subscribe Now</span>
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        )}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-amber-600 leading-relaxed">
                        By subscribing, you agree to our{" "}
                        <a href="#" className="underline hover:text-teal-600 transition-colors">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline hover:text-teal-600 transition-colors">
                          Terms of Service
                        </a>
                        . Unsubscribe at any time.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-6 animate-bounce-in">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-amber-900">Welcome Aboard! 🎉</h3>
                      <p className="text-amber-700">
                        Thank you for subscribing! Check your email for a welcome message.
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 px-4 py-2">Successfully Subscribed</Badge>
                  </div>
                )}
              </div>

              {/* Additional CTA */}
              <div className="mt-8 text-center">
                <p className="text-sm text-amber-700 mb-4">Prefer social media updates?</p>
                <div className="flex justify-center space-x-4">
                  <button className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/80 hover:scale-110 transition-all duration-300 border border-amber-200/50">
                    <span className="text-lg">📱</span>
                  </button>
                  <button className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/80 hover:scale-110 transition-all duration-300 border border-amber-200/50">
                    <span className="text-lg">🐦</span>
                  </button>
                  <button className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/80 hover:scale-110 transition-all duration-300 border border-amber-200/50">
                    <span className="text-lg">💼</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
