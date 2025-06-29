"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Heart,
  Truck,
  X,
  Sparkles,
  CheckCircle,
  Star,
  Clock,
  Package,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useCart } from "@/lib/CartContext"
import Header from "@/components/Header"

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set())
  const [updatingQuantities, setUpdatingQuantities] = useState<Set<number>>(new Set())

  // Animation trigger
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 9.99

  // Free shipping progress
  const freeShippingThreshold = 50
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const amountForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0)

  // Handle quantity updates with animation
  const handleQuantityUpdate = async (itemId: number, action: "increase" | "decrease") => {
    setUpdatingQuantities((prev) => new Set(prev).add(itemId))

    setTimeout(() => {
      if (action === "increase") {
        const item = cart.find((item) => item.id === itemId)
        if (item) {
          addToCart({ id: item.id, name: item.name, price: item.price, image: item.image })
        }
      } else {
        decreaseFromCart(itemId)
      }
      setUpdatingQuantities((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 200)
  }

  // Handle item removal with animation
  const handleRemoveItem = async (itemId: number) => {
    setRemovingItems((prev) => new Set(prev).add(itemId))

    setTimeout(() => {
      removeFromCart(itemId)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 300)
  }

  // Checkout progress steps
  const checkoutSteps = [
    { id: 1, name: "Cart", active: true, completed: false },
    { id: 2, name: "Shipping", active: false, completed: false },
    { id: 3, name: "Payment", active: false, completed: false },
    { id: 4, name: "Confirmation", active: false, completed: false },
  ]

  // Recommended products (mock data)
  const recommendedProducts = [
    {
      id: 101,
      name: "Wireless Mouse",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      rating: 4.5,
    },
    {
      id: 102,
      name: "USB-C Cable",
      price: 19.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      rating: 4.8,
    },
    {
      id: 103,
      name: "Phone Stand",
      price: 15.99,
      originalPrice: 19.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop",
      rating: 4.6,
    },
    {
      id: 104,
      name: "Bluetooth Speaker",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop",
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />

      <Header />

      <div className="relative container mx-auto px-4 py-8">
        {/* Checkout Progress */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="border-amber-200/50 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {checkoutSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                          step.active
                            ? "bg-teal-500 text-white shadow-lg"
                            : step.completed
                              ? "bg-green-500 text-white"
                              : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {step.completed ? <CheckCircle className="h-5 w-5" /> : step.id}
                      </div>
                      <span
                        className={`ml-3 font-medium ${
                          step.active ? "text-teal-600" : step.completed ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                    {index < checkoutSteps.length - 1 && (
                      <div className="w-16 h-0.5 bg-amber-200 mx-4 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Header */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-900">Shopping Cart</h1>
                <p className="text-amber-700">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>
            </div>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-800 hover:bg-amber-50 bg-transparent group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Free Shipping Progress */}
          {subtotal > 0 && subtotal < freeShippingThreshold && (
            <Card className="border-teal-200/50 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Truck className="h-5 w-5 text-teal-600" />
                  <span className="text-teal-800 font-medium">
                    Add ${amountForFreeShipping.toFixed(2)} more for FREE shipping!
                  </span>
                </div>
                <Progress value={freeShippingProgress} className="h-2 bg-teal-100" />
              </CardContent>
            </Card>
          )}

          {/* Free Shipping Achieved */}
          {subtotal >= freeShippingThreshold && subtotal > 0 && (
            <Card className="border-green-200/50 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">🎉 You've qualified for FREE shipping!</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div
            className={`transition-all duration-1000 ease-out delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Card className="border-amber-200/50 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-teal-500" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
                <p className="text-amber-700 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start exploring our amazing products!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/products">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg group">
                      <ShoppingBag className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                      Start Shopping
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button
                      variant="outline"
                      className="border-amber-300 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-xl bg-transparent"
                    >
                      Explore Features
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Cart with Items */
          <div className="space-y-8">
            {/* Cart Items */}
            <div
              className={`transition-all duration-1000 ease-out delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="border-amber-200/50 bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center justify-between">
                    <span>Cart Items</span>
                    <Badge className="bg-teal-100 text-teal-800">{cart.length} items</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {cart.map((item, index) => (
                      <div
                        key={item.id}
                        className={`p-6 border-b border-amber-100 last:border-b-0 transition-all duration-300 ${
                          removingItems.has(item.id) ? "opacity-50 scale-95" : "opacity-100 scale-100"
                        } ${updatingQuantities.has(item.id) ? "bg-teal-50" : "hover:bg-amber-50"}`}
                      >
                        <div className="flex items-start space-x-4">
                          {/* Product Image */}
                          <div className="relative group">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-xl border-2 border-amber-200 group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute -top-2 -right-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="w-6 h-6 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                              <div className="flex-1">
                                <h3 className="font-semibold text-amber-900 mb-1 text-lg">{item.name}</h3>
                                <p className="text-sm text-amber-600 mb-2">SKU: #{item.id}</p>
                                <div className="flex items-center space-x-4">
                                  <Badge className="bg-teal-100 text-teal-800 text-xs">In Stock</Badge>
                                  <div className="flex items-center text-sm text-amber-600">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>Ships in 1-2 days</span>
                                  </div>
                                </div>
                              </div>

                              {/* Quantity and Price Section */}
                              <div className="flex items-center space-x-6">
                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm font-medium text-amber-800">Qty:</span>
                                  <div className="flex items-center bg-amber-50 rounded-lg border border-amber-200">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-10 w-10 p-0 hover:bg-amber-100 rounded-l-lg"
                                      onClick={() => handleQuantityUpdate(item.id, "decrease")}
                                      disabled={item.quantity <= 1 || updatingQuantities.has(item.id)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span
                                      className={`px-4 py-2 font-semibold text-amber-900 min-w-[3rem] text-center transition-all duration-300 ${
                                        updatingQuantities.has(item.id) ? "bg-teal-100 text-teal-700" : ""
                                      }`}
                                    >
                                      {item.quantity}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-10 w-10 p-0 hover:bg-amber-100 rounded-r-lg"
                                      onClick={() => handleQuantityUpdate(item.id, "increase")}
                                      disabled={updatingQuantities.has(item.id)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                  <div className="text-xl font-bold text-amber-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-sm text-amber-600">${item.price.toFixed(2)} each</div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col space-y-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg"
                                    onClick={() => handleRemoveItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-2 rounded-lg"
                                  >
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cart Summary Bar */}
            <div
              className={`transition-all duration-1000 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="border-teal-200/50 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-700">{cart.length}</div>
                        <div className="text-sm text-teal-600">Items</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-700">${subtotal.toFixed(2)}</div>
                        <div className="text-sm text-teal-600">Subtotal</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-teal-700">
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </div>
                        <div className="text-sm text-teal-600">Shipping</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-teal-600 mb-1">Total</div>
                        <div className="text-3xl font-bold text-teal-700">${(subtotal + shipping).toFixed(2)}</div>
                      </div>
                      <Link to="/checkout">
                        <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg group text-lg font-semibold">
                          <span className="group-hover:mr-2 transition-all duration-300">Proceed to Checkout</span>
                          <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Products */}
            <div
              className={`transition-all duration-1000 ease-out delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Card className="border-amber-200/50 bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-teal-500" />
                    <span>You might also like</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recommendedProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="border-amber-200/30 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-3 right-3 bg-red-500 text-white text-xs">
                            Save ${(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-amber-900">{product.rating}</span>
                            </div>
                          </div>
                        </div>

                        <CardContent className="p-4">
                          <h4 className="font-medium text-amber-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <span className="text-lg font-bold text-amber-900">${product.price}</span>
                              <span className="text-sm text-amber-600 line-through ml-2">${product.originalPrice}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white transform hover:scale-105 transition-all duration-300 group/btn"
                            onClick={() =>
                              addToCart({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                              })
                            }
                          >
                            <Package className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
