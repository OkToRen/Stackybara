import Header from '@/components/Header';
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, RotateCcw, X } from 'lucide-react';
import { Product, useProduct } from '@/lib/ProductContext';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from '@/hooks/UseScrollToTop';
// Move products array here for recommendations
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
  },
];

const recommendations = [
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    oldPrice: 249.99,
    image: '/assets/Logo.png',
    tag: 'New',
    discount: '-20%',
    category: 'Electronics',
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 3,
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    oldPrice: 99.99,
    image: '/assets/react.svg',
    tag: 'Popular',
    discount: '-20%',
    category: 'Electronics',
    rating: 4.7,
    reviews: 203,
  },
  {
    id: 4,
    name: 'Wireless Gaming Mouse',
    price: 69.99,
    oldPrice: 89.99,
    image: '/assets/motoko.png',
    tag: 'Gaming',
    discount: '-22%',
    category: 'Electronics',
    rating: 4.8,
    reviews: 245,
  },
];

const youMightAlsoLike = [
  {
    id: 5,
    name: 'Ceramic Coffee Mug Set',
    price: 29.99,
    oldPrice: 39.99,
    image: '/assets/motoko_shadow.png',
    tag: 'Eco-Friendly',
    discount: '-25%',
    category: 'Home',
    rating: 4.6,
    reviews: 87,
  },
];

const reviews = [
  { user: 'Alice', rating: 5, comment: 'Great sound quality and battery life!' },
  { user: 'Bob', rating: 4, comment: 'Very comfortable, but a bit pricey.' },
  { user: 'Charlie', rating: 5, comment: 'Best headphones I have ever owned.' },
];

const specifications = [
  { label: 'Battery Life', value: '30 hours' },
  { label: 'Bluetooth', value: '5.0' },
  { label: 'Noise Cancellation', value: 'Active' },
  { label: 'Weight', value: '250g' },
];

export default function ProductDetailsPage() {
  const { product, setProduct } = useProduct();
  const { addToCart } = useCart();
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);
  const [recQuantities, setRecQuantities] = useState<{ [id: number]: number }>({});
  const [likeQuantities, setLikeQuantities] = useState<{ [id: number]: number }>({});
  const navigate = useNavigate();

  // Dummy images for gallery
  const imageSrc = product?.image || '';
  const images: string[] = [imageSrc, imageSrc, imageSrc, imageSrc, imageSrc];

  // Dynamic recommendations based on category
  const filteredRecommendations = products.filter(
    (p) => p.category === product?.category && p.id !== product?.id
  ).slice(0, 3);

  // You Might Also Like: products from other categories
  const youMightAlsoLike = products.filter(
    (p) => p.category !== product?.category && p.id !== product?.id
  ).slice(0, 3);

  const handleAddToCart = (product: Product) => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setCartMessage(`${product.name} (x${quantity}) added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };

  const handleRecommendationClick = (rec: Product) => {
    setProduct(rec);
    navigate('/productdetails');
  };

  const handleRecQuantity = (id: number, delta: number) => {
    setRecQuantities(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) + delta) }));
  };
  const handleLikeQuantity = (id: number, delta: number) => {
    setLikeQuantities(q => ({ ...q, [id]: Math.max(1, (q[id] || 1) + delta) }));
  };
  const handleRecAddToCart = (rec: typeof products[0]) => {
    const qty = recQuantities[rec.id] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart({ id: rec.id, name: rec.name, price: rec.price, image: rec.image });
    }
    setCartMessage(`${rec.name} (x${qty}) added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };
  const handleLikeAddToCart = (rec: typeof products[0]) => {
    const qty = likeQuantities[rec.id] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart({ id: rec.id, name: rec.name, price: rec.price, image: rec.image });
    }
    setCartMessage(`${rec.name} (x${qty}) added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">

      <div className="container mx-auto px-4 py-8">
        {product ? (
          <div className="bg-white rounded-lg p-8 shadow flex flex-col gap-8">
            {/* Product Gallery & Info */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Gallery */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="rounded-lg w-80 h-80 object-contain border mb-2"
                  />
                  <span className="absolute top-2 left-2 bg-blue-600 text-xs text-white px-2 py-1 rounded font-bold">Best Seller</span>
                  <span className="absolute top-2 right-2 bg-red-500 text-xs text-white px-2 py-1 rounded font-bold">31% OFF</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-16 h-16 object-cover rounded border cursor-pointer ${selectedImage === idx ? 'ring-2 ring-teal-500' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              </div>
              {/* Product Info */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded">Electronics</span>
                  <span className="flex items-center text-yellow-500 text-sm font-semibold">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400" /> 4.8 <span className="text-gray-500 ml-1">(324 reviews)</span>
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-lg line-through text-gray-400">$129.99</span>
                  <span className="text-green-600 font-semibold">Save $40.00</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span>Quantity:</span>
                  <Button size="icon" variant="outline" className="w-8 h-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                  <span>{quantity}</span>
                  <Button size="icon" variant="outline" className="w-8 h-8" onClick={() => setQuantity(q => q + 1)}>+</Button>
                </div>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-lg py-3 flex items-center justify-center gap-2" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-5 w-5" /> Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
            {/* Tabs: Description, Specs, Reviews */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex border-b mb-4">
                <button className={`px-4 py-2 font-semibold ${tab === 'description' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`} onClick={() => setTab('description')}>Description</button>
                <button className={`px-4 py-2 font-semibold ${tab === 'specs' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`} onClick={() => setTab('specs')}>Specifications</button>
                <button className={`px-4 py-2 font-semibold ${tab === 'reviews' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`} onClick={() => setTab('reviews')}>Reviews (324)</button>
              </div>
              {tab === 'description' && (
                <div>
                  <p className="text-gray-700 mb-2">Premium quality wireless headphones with noise cancellation and 30-hour battery life</p>
                  <p className="text-gray-500 text-sm">This premium product offers exceptional quality and performance. Crafted with attention to detail and built to last, it's the perfect choice for those who demand the best. Whether you're a professional or enthusiast, this product will exceed your expectations.</p>
                </div>
              )}
              {tab === 'specs' && (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {specifications.map((spec, idx) => (
                    <li key={idx} className="flex justify-between border-b py-2 text-gray-700"><span>{spec.label}</span><span className="font-semibold">{spec.value}</span></li>
                  ))}
                </ul>
              )}
              {tab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.map((r, idx) => (
                    <div key={idx} className="bg-white rounded p-4 shadow flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">{r.user}</span>
                        <span className="text-gray-500">{r.rating} stars</span>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-bold mb-2">More from {product?.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredRecommendations.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                    <ScrollToTop />
                    <div className="relative w-full flex justify-center">
                      <img src={rec.image} alt={rec.name} className="w-32 h-32 object-contain rounded mb-2" />
                      <span className="absolute top-2 left-2 bg-purple-600 text-xs text-white px-2 py-1 rounded font-bold">{rec.badge}</span>
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <span className="text-xs text-gray-400 mb-1">{rec.category}</span>
                      <h4 className="font-semibold text-md mb-1">{rec.name}</h4>
                      <div className="flex items-end gap-2 mb-1">
                        <span className="font-bold text-gray-900">${rec.price}</span>
                        <span className="line-through text-gray-400">${rec.originalPrice}</span>
                      </div>
                      <span className="flex items-center text-yellow-500 text-xs font-semibold mb-2">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400" /> {rec.rating} <span className="text-gray-400 ml-1">({rec.reviews} reviews)</span>
                      </span>
                      <div className="w-full flex flex-row gap-2 mb-2" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => handleRecQuantity(rec.id, -1)}>-</Button>
                          <span>{recQuantities[rec.id] || 1}</span>
                          <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => handleRecQuantity(rec.id, 1)}>+</Button>
                        </div>
                        <Button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 flex items-center justify-center gap-2" onClick={e => { e.stopPropagation(); handleRecAddToCart(rec); }}>
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* You Might Also Like */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-2">You Might Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {youMightAlsoLike.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer" onClick={() => handleRecommendationClick(rec)}>
                    <ScrollToTop />
                    <div className="relative w-full flex justify-center">
                      <img src={rec.image} alt={rec.name} className="w-32 h-32 object-contain rounded mb-2" />
                      <span className="absolute top-2 left-2 bg-purple-600 text-xs text-white px-2 py-1 rounded font-bold">{rec.badge}</span>
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <span className="text-xs text-gray-400 mb-1">{rec.category}</span>
                      <h4 className="font-semibold text-md mb-1">{rec.name}</h4>
                      <div className="flex items-end gap-2 mb-1">
                        <span className="font-bold text-gray-900">${rec.price}</span>
                        <span className="line-through text-gray-400">${rec.originalPrice}</span>
                      </div>
                      <span className="flex items-center text-yellow-500 text-xs font-semibold mb-2">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400" /> {rec.rating} <span className="text-gray-400 ml-1">({rec.reviews} reviews)</span>
                      </span>
                      <div className="w-full flex flex-row gap-2 mb-2" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => handleLikeQuantity(rec.id, -1)}>-</Button>
                          <span>{likeQuantities[rec.id] || 1}</span>
                          <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => handleLikeQuantity(rec.id, 1)}>+</Button>
                        </div>
                        <Button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 flex items-center justify-center gap-2" onClick={e => { e.stopPropagation(); handleLikeAddToCart(rec); }}>
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow text-center">
            <p className="text-amber-700 mb-4">Failed to load selected product.</p>
            <Link to="/products">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Products Page</Button>
            </Link>
          </div>
        )}
      </div>
      {/* Cart Message */}
      {cartMessage && (
        <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
          {cartMessage}
        </div>
      )}
    </div>
  );
}