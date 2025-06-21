// src/pages/seller/StoreProfilePage.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewCard, type Review } from '@/components/ui/reviewcard';
import { MapPin, Calendar, Edit, Star, Package } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from '@/assets/logo.png';

// --- Sample Data (Re-adding bannerUrl) ---
const storeInfo = {
  name: "The Capy Store",
  tagline: "Home of the finest digital goods",
  bannerUrl: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=800&h=200&fit=crop",
  logoUrl: Logo,
  location: "Jakarta, Indonesia",
  joinedDate: "October 2024",
  totalProducts: 5,
};

const sellerProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: 89.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
  { id: 2, name: 'Organic Cotton T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
];

const reviews: Review[] = [
  { id: 1, customerName: 'John Doe', rating: 5, comment: 'Amazing product, fast delivery! Highly recommended.', date: 'June 20, 2025' },
  { id: 2, customerName: 'Jane Smith', rating: 4, comment: 'Good quality, but the color was slightly different than the picture.', date: 'June 18, 2025' },
];

export default function StoreProfilePage() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Banner Image Section */}
      <div
        className="h-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${storeInfo.bannerUrl})` }}
      >
        <div className="h-full w-full bg-black/30" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-8">
        {/* ================================================================== */}
        {/* FINAL CORRECTED PROFILE HEADER */}
        {/* ================================================================== */}
        <Card className="relative -mt-20 overflow-hidden border-amber-200 shadow-lg">
          {/* Top Teal Section - Reduced height */}
          <div className="h-20 bg-gradient-to-r from-teal-500 to-emerald-600" />
          
          {/* Bottom White Section */}
          <div className="bg-white px-6 pb-6">
            {/* Store details are pushed down to make space for the overlapping avatar */}
            <div className="pt-12 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-amber-950">{storeInfo.name}</h1>
              <p className="text-sm text-amber-700">{storeInfo.tagline}</p>
            </div>
            <hr className="my-3 border-amber-100" />
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-sm text-amber-800">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-600" /> {storeInfo.location}</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-teal-600" /> Joined {storeInfo.joinedDate}</div>
              <div className="flex items-center gap-2"><Package className="h-4 w-4 text-teal-600" /> {storeInfo.totalProducts} Products</div>
            </div>
          </div>
          
          {/* Absolutely Positioned Elements that sit on top - Adjusted positions */}
          <div className="absolute top-8 left-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={storeInfo.logoUrl} alt={`${storeInfo.name} logo`} />
              <AvatarFallback>{storeInfo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4">
            <Button variant="outline" className="bg-white/90 hover:bg-white text-teal-700 border-teal-200 shadow">
              <Edit className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Edit Profile</span>
            </Button>
          </div>
        </Card>
      
        {/* ================================================================== */}
        {/* TAB NAVIGATION AND CONTENT (No changes needed) */}
        {/* ================================================================== */}
        <div className="mt-8">
          <div className="border-b border-amber-200">
            <nav className="flex space-x-6">
              <button onClick={() => setActiveTab('products')} className={`pb-3 font-medium ${activeTab === 'products' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-amber-700 hover:text-amber-900'}`}>
                Products
              </button>
              <button onClick={() => setActiveTab('feedback')} className={`pb-3 font-medium ${activeTab === 'feedback' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-amber-700 hover:text-amber-900'}`}>
                Feedback & Ratings
              </button>
            </nav>
          </div>
          <div className="mt-6">
            {activeTab === 'products' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {sellerProducts.map(product => (
                  <Card key={product.id} className="border-amber-200">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-t-lg" />
                    <CardContent className="p-3">
                      <p className="font-semibold text-amber-900 truncate">{product.name}</p>
                      <p className="text-teal-600">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map(review => <ReviewCard key={review.id} review={review} />)
                ) : (
                  <p className="text-center py-8 text-amber-700">No reviews yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
