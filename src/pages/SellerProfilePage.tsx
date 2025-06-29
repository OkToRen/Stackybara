import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backend } from "@/declarations/backend";
import { Principal } from "@dfinity/principal";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/lib/ProductContext"; // adjust import if needed

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 324,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    category: 'Electronics',
    badge: 'Best Seller',
    description:
      'Premium quality wireless headphones with noise cancellation',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae', // Example principal
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 156,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    category: 'Electronics',
    badge: 'New',
    description: 'Track your fitness goals with this advanced smartwatch',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae',
  },
  {
    id: 3,
    name: 'Ergonomic Laptop Stand',
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.9,
    reviews: 89,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
    category: 'Office',
    badge: 'Sale',
    description: 'Adjustable aluminum laptop stand for better posture',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae',
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 203,
    image:
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
    category: 'Electronics',
    badge: 'Popular',
    description: 'Waterproof speaker with 12-hour battery life',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae',
  },
  {
    id: 5,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviews: 78,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
    category: 'Fashion',
    badge: 'Eco-Friendly',
    description: 'Sustainable fashion made from 100% organic cotton',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae',
  },
  {
    id: 6,
    name: 'LED Desk Lamp',
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviews: 112,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    category: 'Home',
    badge: 'Energy Efficient',
    description: 'Adjustable LED lamp with multiple brightness levels',
    sellerPrincipal: 'oova3-jr6xc-2mphk-d3oee-x2h4f-kf234-bzgr7-7yabp-kapqz-o3fqb-hae',
  },
];

export default function SellerProfilePage() {
  const { sellerPrincipal } = useParams();
  const navigate = useNavigate();
  const { setProduct } = useProduct ? useProduct() : { setProduct: undefined };
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeller() {
      if (!sellerPrincipal) return;
      setLoading(true);
      try {
        const principalObj = Principal.fromText(sellerPrincipal);
        // Fetch seller profile
        const user = await backend.getUserByPrincipal(principalObj);
        setSeller(user && user.length > 0 ? user[0] : null);
      } catch {
        setSeller(null);
      }
      setLoading(false);
    }
    fetchSeller();
  }, [sellerPrincipal]);

  // Filter products by sellerPrincipal
  const sellerProducts = products.filter(
    (product) => product.sellerPrincipal === sellerPrincipal
  );

  if (loading) return <div className="p-8 text-center text-gray-400">Loading seller profile...</div>;
  if (!seller) return <div className="p-8 text-center text-gray-400">Seller not found.</div>;

  return (
    <div className="min-h-screen bg-[#fff8ee] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Seller Profile */}
        <Card className="flex items-center gap-6 p-6 mb-8 bg-white border-amber-200 shadow-md">
          <Avatar className="h-20 w-20">
            <AvatarImage src={seller.avatar || undefined} alt={seller.name} />
            <AvatarFallback>{seller.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-2xl font-bold text-amber-900">{seller.name}</div>
            <div className="text-gray-600 mb-1">{seller.email}</div>
            <div className="text-sm text-gray-500">{seller.address}</div>
            <div className="text-sm text-gray-500">{seller.phone}</div>
            <div className="text-xs text-teal-600 mt-2">Member since {seller.createdAt ? new Date(Number(seller.createdAt) / 1000000).toLocaleDateString() : "-"}</div>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">Chat with Seller</Button>
        </Card>
        {/* Seller Products */}
        <div>
          <div className="text-xl font-semibold text-amber-900 mb-4">Products by {seller.name}</div>
          {sellerProducts.length === 0 ? (
            <div className="text-gray-400">No products found for this seller.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sellerProducts.map((product: any) => (
                <Card key={product.id} className="p-4 bg-white border-amber-200 shadow-sm flex flex-col">
                  <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded mb-3" />
                  <div className="font-bold text-lg text-amber-900 mb-1">{product.name}</div>
                  <div className="text-sm text-gray-600 mb-2">{product.description}</div>
                  <div className="text-teal-600 font-semibold mb-2">${product.price}</div>
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white mt-auto" onClick={() => {
                    if (setProduct) setProduct(product);
                    navigate('/productdetails', { state: { product } });
                  }}>View Product</Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
