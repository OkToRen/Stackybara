"use client"

import { backend } from "@/declarations/backend"
import { useAuthContext } from "@/lib/AuthContext"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import {
  Store,
  FileText,
  MapPin,
  Sparkles,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  DollarSign,
  Award,
} from "lucide-react"

export default function PostUserToSellerPage() {
  const auth = useAuthContext()
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkStore = async () => {
      console.log(auth.principal)
      try {
        const store = await backend.getStoreProfile(auth.principal)
        console.log(store)
        if (store.length != 0) navigate("/seller/profile")
      } catch (err) {
        console.error("Error fetching store:", err)
      }
    }

    checkStore()
  }, [])

  const bindStore = async (name: string, desc: string, location: string) => {
    setIsLoading(true)
    try {
      console.log("binding store to user")
      await backend.bindNewStore(auth.principal, name, desc, location)
      console.log("store successfully binded")
      navigate("/seller/profile")
    } catch (error) {
      console.error("Store binding error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-teal-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-20 right-16 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-40 animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-40 animation-delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          {/* Welcome Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-sm font-medium mb-3">
              <Store className="w-3 h-3" />
              Become a Seller
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">Launch Your Store</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Join thousands of successful sellers on Stackybara and start your entrepreneurial journey today
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Benefits Section */}
            <div className="space-y-4">
              <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 rounded-2xl p-5">
                <h3 className="text-xl font-bold text-amber-900 mb-4">Why Sell on Stackybara?</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-1.5 rounded-lg flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm">Grow Your Business</h4>
                      <p className="text-xs text-gray-600">
                        Access powerful analytics and tools to scale your operations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg flex-shrink-0">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm">Reach More Customers</h4>
                      <p className="text-xs text-gray-600">Connect with buyers from around the world</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-1.5 rounded-lg flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm">Competitive Fees</h4>
                      <p className="text-xs text-gray-600">Keep more of your earnings with our low commission rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-1.5 rounded-lg flex-shrink-0">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm">Seller Support</h4>
                      <p className="text-xs text-gray-600">Get dedicated support to help you succeed</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <Card className="backdrop-blur-sm bg-white/90 shadow-lg border-0 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-teal-600">10K+</div>
                  <div className="text-xs text-gray-600">Active Sellers</div>
                </Card>
                <Card className="backdrop-blur-sm bg-white/90 shadow-lg border-0 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-purple-600">50K+</div>
                  <div className="text-xs text-gray-600">Products Sold</div>
                </Card>
                <Card className="backdrop-blur-sm bg-white/90 shadow-lg border-0 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-amber-600">95%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </Card>
              </div>
            </div>

            {/* Form Section */}
            <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-purple-500 text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Store Setup</h2>
                    <p className="text-white/80 text-xs">Create your seller profile</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    bindStore(name, desc, location)
                  }}
                >
                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                        <Store className="w-3 h-3" />
                        Store Name
                      </label>
                      <Input
                        className="w-full px-3 py-2 border-2 border-teal-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                        placeholder="Enter your store name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                        <FileText className="w-3 h-3" />
                        Store Description
                      </label>
                      <textarea
                        className="w-full px-3 py-2 border-2 border-teal-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200 rounded-lg transition-all duration-300 bg-white/50 resize-none h-20 text-sm"
                        placeholder="Describe what you sell and what makes your store special"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      />
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                        <MapPin className="w-3 h-3" />
                        Store Location
                      </label>
                      <Input
                        className="w-full px-3 py-2 border-2 border-teal-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                        placeholder="Enter your business location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Terms Notice */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-xs font-medium text-purple-900">Ready to Start Selling</h4>
                        <p className="text-xs text-purple-700 mt-0.5">
                          By creating your store, you agree to our seller terms and conditions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating your store...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Launch My Store
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Progress Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Store Setup</span>
                    <span>Ready to launch!</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-teal-500 to-purple-500 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
