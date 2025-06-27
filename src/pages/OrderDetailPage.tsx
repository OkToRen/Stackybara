"use client"

import { ArrowLeft, Package, Truck, MapPin, CreditCard, Eye, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock order data - in a real app, this would come from your API/database
const orderData = {
  id: "ORD-2024-001234",
  date: "March 15, 2024",
  status: "Shipped",
  trackingNumber: "1Z999AA1234567890",
  estimatedDelivery: "March 18, 2024",
  customer: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
  },
  shippingAddress: {
    name: "Sarah Johnson",
    street: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
  },
  billingAddress: {
    name: "Sarah Johnson",
    street: "123 Oak Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States",
  },
  paymentMethod: {
    type: "Credit Card",
    last4: "4242",
    brand: "Visa",
  },
  items: [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      image: "/placeholder.svg?height=80&width=80",
      sku: "WH-001",
      quantity: 1,
      price: 199.99,
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      image: "/placeholder.svg?height=80&width=80",
      sku: "BS-002",
      quantity: 2,
      price: 79.99,
    },
    {
      id: 3,
      name: "USB-C Cable (3ft)",
      image: "/placeholder.svg?height=80&width=80",
      sku: "CB-003",
      quantity: 3,
      price: 12.99,
    },
  ],
  pricing: {
    subtotal: 398.95,
    shipping: 9.99,
    tax: 32.71,
    total: 441.65,
  },
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "processing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "shipped":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "processing":
      return <Package className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <Check className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function OrderDetailsPage() {
  const [copiedTracking, setCopiedTracking] = useState(false)
  const navigate = useNavigate()

  const copyTrackingNumber = async () => {
    try {
      await navigator.clipboard.writeText(orderData.trackingNumber)
      setCopiedTracking(true)
      setTimeout(() => setCopiedTracking(false), 2000)
    } catch (err) {
      console.error("Failed to copy tracking number:", err)
    }
  }

  return (
    <div className="min-h-screen bg-amber-50/30">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="border-amber-200 bg-transparent"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to orders</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900">Order {orderData.id}</h1>
            <p className="text-amber-700 mt-1">Placed on {orderData.date}</p>
          </div>
          <Badge className={`${getStatusColor(orderData.status)} flex items-center gap-2`}>
            {getStatusIcon(orderData.status)}
            {orderData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({orderData.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-amber-100"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-amber-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-amber-900 truncate">{item.name}</h3>
                        <p className="text-sm text-amber-600 mt-1">SKU: {item.sku}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-amber-700">Qty: {item.quantity}</span>
                          <span className="font-semibold text-amber-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-amber-200">
                        <TableHead className="text-amber-900">Product</TableHead>
                        <TableHead className="text-amber-900">SKU</TableHead>
                        <TableHead className="text-amber-900 text-center">Quantity</TableHead>
                        <TableHead className="text-amber-900 text-right">Unit Price</TableHead>
                        <TableHead className="text-amber-900 text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData.items.map((item) => (
                        <TableRow key={item.id} className="border-amber-100">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded border border-amber-200"
                              />
                              <span className="font-medium text-amber-900">{item.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-amber-700">{item.sku}</TableCell>
                          <TableCell className="text-center text-amber-700">{item.quantity}</TableCell>
                          <TableCell className="text-right text-amber-700">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold text-amber-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Information */}
            {orderData.status.toLowerCase() === "shipped" && (
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Tracking Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-semibold text-blue-900">Tracking Number</p>
                        <p className="text-blue-700 font-mono">{orderData.trackingNumber}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyTrackingNumber}
                        className="border-blue-300 text-blue-800 bg-transparent"
                      >
                        {copiedTracking ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">Copy tracking number</span>
                      </Button>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-900">Estimated Delivery</p>
                      <p className="text-green-700">{orderData.estimatedDelivery}</p>
                    </div>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      Track Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal</span>
                  <span>${orderData.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Shipping</span>
                  <span>${orderData.pricing.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Tax</span>
                  <span>${orderData.pricing.tax.toFixed(2)}</span>
                </div>
                <Separator className="bg-amber-200" />
                <div className="flex justify-between font-bold text-lg text-amber-900">
                  <span>Total</span>
                  <span>${orderData.pricing.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-amber-900">{orderData.customer.name}</p>
                  <p className="text-amber-700 text-sm">{orderData.customer.email}</p>
                  <p className="text-amber-700 text-sm">{orderData.customer.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-amber-700 text-sm space-y-1">
                  <p className="font-semibold text-amber-900">{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.street}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                    {orderData.shippingAddress.zipCode}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-amber-700 text-sm space-y-1">
                  <p className="font-semibold text-amber-900">{orderData.billingAddress.name}</p>
                  <p>{orderData.billingAddress.street}</p>
                  <p>
                    {orderData.billingAddress.city}, {orderData.billingAddress.state} {orderData.billingAddress.zipCode}
                  </p>
                  <p>{orderData.billingAddress.country}</p>
                </div>
                <Separator className="bg-amber-200 my-3" />
                <div className="text-amber-700 text-sm">
                  <p className="font-semibold text-amber-900">Payment Method</p>
                  <p>
                    {orderData.paymentMethod.brand} ending in {orderData.paymentMethod.last4}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
