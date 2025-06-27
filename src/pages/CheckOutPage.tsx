import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Edit3, 
  CreditCard, 
  Wallet, 
  Building2, 
  Smartphone,
  Shield,
  Truck,
  MessageSquare,
  Tag,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('va');
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string; discount: number} | null>(null);
  const [buyerNotes, setBuyerNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    name: 'John Doe',
    phone: '+62 812-3456-7890',
    street: '123 Main Street, Apartment 4B',
    city: 'Jakarta',
    zip: '12345',
    country: 'Indonesia'
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = selectedShipping === 'express' ? 15.99 : selectedShipping === 'priority' ? 9.99 : 4.99;
  const insuranceFee = includeInsurance ? subtotal * 0.01 : 0; 
  const promoDiscount = appliedPromo ? appliedPromo.discount : 0;
  const total = subtotal + shippingFee + insuranceFee - promoDiscount;

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: 4.99 },
    { id: 'priority', name: 'Priority Shipping', time: '3-4 business days', price: 9.99 },
    { id: 'express', name: 'Express Shipping', time: '1-2 business days', price: 15.99 }
  ];

  const paymentMethods = [
    { id: 'va', name: 'Virtual Account', icon: Building2, description: 'BCA, BNI, Mandiri, BRI' },
    { id: 'ewallet', name: 'E-Wallet', icon: Smartphone, description: 'GoPay, OVO, Dana, ShopeePay' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
    { id: 'bank', name: 'Bank Transfer', icon: Wallet, description: 'Direct bank transfer' }
  ];

  const handleApplyPromo = () => {
    const promoCodes = {
      'SAVE10': { discount: 10, type: 'fixed' },
      'DISCOUNT20': { discount: subtotal * 0.2, type: 'percentage' },
      'FREESHIP': { discount: shippingFee, type: 'shipping' }
    };

    if (promoCodes[promoCode as keyof typeof promoCodes]) {
      setAppliedPromo({ 
        code: promoCode, 
        discount: promoCodes[promoCode as keyof typeof promoCodes].discount 
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  const handlePayNow = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/my-orders'); 
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 shadow text-center">
            <ShoppingBag className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
            <p className="text-amber-700 mb-6">Add some products to proceed with checkout.</p>
            <Link to="/products">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/cart">
            <Button variant="ghost" className="text-amber-700 hover:text-amber-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-amber-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-amber-600" />
                    <span className="text-lg font-semibold text-slate-800">Shipping Address</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-teal-600 hover:text-teal-700"
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    {isEditingAddress ? 'Save' : 'Change'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingAddress ? (
                  <div className="space-y-3">
                    <Input
                      placeholder="Name"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    />
                    <Input
                      placeholder="Phone"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    />
                    <Input
                      placeholder="Street Address"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      />
                      <Input
                        placeholder="ZIP"
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                      />
                    </div>
                    <Input
                      placeholder="Country"
                      value={address.country}
                      onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    />
                  </div>
                ) : (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="font-semibold text-amber-900">{address.name}</div>
                    <div className="text-amber-700 text-sm mt-1">
                      {address.street}<br />
                      {address.city}, {address.zip}<br />
                      {address.country}
                    </div>
                    <div className="text-amber-600 text-sm mt-2">{address.phone}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-semibold text-slate-800">Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-amber-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded border border-amber-200" 
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-amber-900">{item.name}</div>
                      <div className="text-amber-700 text-sm">
                        ${item.price} × {item.quantity}
                      </div>
                    </div>
                    <div className="font-bold text-amber-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <Separator className="my-4" />

                {/* Shipping Options */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-slate-700">Shipping Method</span>
                  </div>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 p-3 border border-amber-200 rounded-lg">
                        <input
                          type="radio"
                          id={option.id}
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="text-teal-500"
                        />
                        <label htmlFor={option.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-amber-900">{option.name}</div>
                              <div className="text-sm text-amber-600">{option.time}</div>
                            </div>
                            <div className="font-bold text-amber-900">${option.price}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance Option */}
                <div className="flex items-center space-x-3 p-3 border border-amber-200 rounded-lg">
                  <Checkbox
                    id="insurance"
                    checked={includeInsurance}
                    onCheckedChange={(checked) => setIncludeInsurance(checked === true)}
                    className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                  />
                  <div className="flex-1">
                    <Label htmlFor="insurance" className="flex items-center gap-2 cursor-pointer">
                      <Shield className="h-4 w-4 text-amber-600" />
                      <span className="font-medium text-amber-900">Package Insurance</span>
                    </Label>
                    <div className="text-sm text-amber-600">Protect your order (1% of subtotal)</div>
                  </div>
                  <div className="font-bold text-amber-900">${insuranceFee.toFixed(2)}</div>
                </div>

                {/* Buyer Notes */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-slate-700">Notes for Seller (Optional)</span>
                  </div>
                  <textarea
                    className="w-full p-3 border border-amber-300 rounded-lg focus:border-teal-400 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Add any special instructions or requests..."
                    value={buyerNotes}
                    onChange={(e) => setBuyerNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-semibold text-slate-800">Payment Method</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border border-amber-200 rounded-lg">
                        <input
                          type="radio"
                          id={method.id}
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="text-teal-500"
                        />
                        <label htmlFor={method.id} className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-amber-600" />
                            <div>
                              <div className="font-medium text-amber-900">{method.name}</div>
                              <div className="text-sm text-amber-600">{method.description}</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            {/* Promo Code */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-amber-600" />
                  <span className="text-lg font-semibold text-slate-800">Promo Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!appliedPromo ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="border-amber-300 focus:border-teal-400"
                    />
                    <Button 
                      onClick={handleApplyPromo}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                      disabled={!promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">{appliedPromo.code}</div>
                      <div className="text-sm text-green-600">-${appliedPromo.discount.toFixed(2)}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleRemovePromo}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <div className="mt-3 text-xs text-amber-600">
                  Try: SAVE10, DISCOUNT20, FREESHIP
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-amber-700">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>Shipping Fee</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                {includeInsurance && (
                  <div className="flex justify-between text-amber-700">
                    <span>Insurance</span>
                    <span>${insuranceFee.toFixed(2)}</span>
                  </div>
                )}
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${appliedPromo.discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold text-amber-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Pay Now Button */}
            <Button 
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-lg py-4"
              onClick={handlePayNow}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Processing...
                </div>
              ) : (
                `Pay Now - $${total.toFixed(2)}`
              )}
            </Button>

            <div className="text-xs text-center text-amber-600">
              By placing this order, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}