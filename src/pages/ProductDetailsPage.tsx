import { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCw,
  ArrowLeft,
} from 'lucide-react';
import { useProduct } from '@/lib/ProductContext';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from '@/hooks/UseScrollToTop';
import { useAuthContext } from '@/lib/AuthContext';
import { useLoading } from '@/hooks/UseLoading';
import { Product } from '@/declarations/backend/backend.did';


// Move products array here for recommendations
const products: Product[] = [
    {
      productId: 10,
      storeId: 11,
      name: 'Wireless Bluetooth Headphones',      
      price: 129.99,
      stock: 5,
      rating: 4.8,
      review: 324,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      category: 'Electronics',
      description:
        'Premium quality wireless headphones with noise cancellation',
    },
    {
      productId: 11,
      storeId: 12,
      name: 'Smart Fitness Watch',
      price: 199.99,
      stock: 10,
      rating: 4.6,
      review: 156,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      category: 'Electronics',
      description: 'Track your fitness goals with this advanced smartwatch'
    },
    {
      productId: 12,
      storeId: 13,
      name: 'Ergonomic Laptop Stand',
      price: 45.99,
      stock: 7,
      rating: 4.9,
      review: 89,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      category: 'Office',
      description: 'Adjustable aluminum laptop stand for better posture',
    },
    {
      productId: 13,
      storeId: 14,
      name: 'Portable Bluetooth Speaker',
      price: 79.99,
      stock: 9,
      rating: 4.7,
      review: 203,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      category: 'Electronics',
      description: 'Waterproof speaker with 12-hour battery life'
    },
    {
      productId: 15,
      storeId: 16,
      name: 'Organic Cotton T-Shirt',
      price: 24.99,
      stock: 11,
      rating: 4.5,
      review: 78,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      category: 'Fashion',
      description: 'Sustainable fashion made from 100% organic cotton',
    },
    {
      productId: 16,
      storeId: 17,
      name: 'LED Desk Lamp',
      price: 39.99,
      stock: 7,
      rating: 4.4,
      review: 112,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      category: 'Home',
      description: 'Adjustable LED lamp with multiple brightness levels',
    },
  ];

const reviews = [
  {
    id: 1,
    user: 'Alice Johnson',
    rating: 5,
    comment:
      'Absolutely amazing sound quality! The noise cancellation works perfectly and the battery lasts all day. Highly recommended!',
    date: '2024-01-15',
    verified: true,
  },
  {
    id: 2,
    user: 'Bob Smith',
    rating: 4,
    comment:
      'Very comfortable to wear for long periods. The build quality is excellent, though they are a bit pricey.',
    date: '2024-01-10',
    verified: true,
  },
  {
    id: 3,
    user: 'Charlie Brown',
    rating: 5,
    comment:
      "Best headphones I've ever owned! The sound is crystal clear and the design is sleek. Worth every penny.",
    date: '2024-01-08',
    verified: false,
  },
  {
    id: 4,
    user: 'Diana Wilson',
    rating: 4,
    comment:
      'Great for workouts and commuting. The wireless connection is stable and the controls are intuitive.',
    date: '2024-01-05',
    verified: true,
  },
];

const specifications = [
  { label: 'Battery Life', value: '30 hours' },
  { label: 'Bluetooth Version', value: '5.0' },
  { label: 'Noise Cancellation', value: 'Active ANC' },
  { label: 'Weight', value: '250g' },
  { label: 'Driver Size', value: '40mm' },
  { label: 'Frequency Response', value: '20Hz - 20kHz' },
  { label: 'Charging Time', value: '2 hours' },
  { label: 'Warranty', value: '2 years' },
];

export default function ProductDetailsPage() {
  const { product, setProduct } = useProduct();
  const { addToCart } = useCart();
  const [cartMessage, setCartMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [recQuantities, setRecQuantities] = useState<Record<number, number>>(
    {},
  );
  const [likeQuantities, setLikeQuantities] = useState<Record<number, number>>(
    {},
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  // Generate multiple images for gallery (using same image with different crops for demo)
  const imageSrc = product?.image || '';
  const images = [
    imageSrc,
    imageSrc.replace('fit=crop', 'fit=crop&crop=top'),
    imageSrc.replace('fit=crop', 'fit=crop&crop=bottom'),
    imageSrc.replace('fit=crop', 'fit=crop&crop=left'),
    imageSrc.replace('fit=crop', 'fit=crop&crop=right'),
  ];

  // Dynamic recommendations based on category
  const filteredRecommendations = products
    .filter((p) => p.category === product?.category && p.productId !== product?.productId)
    .slice(0, 3);

  // You Might Also Like: products from other categories
  const youMightAlsoLike = products
    .filter((p) => p.category !== product?.category && p.productId !== product?.productId)
    .slice(0, 3);

  const auth = useAuthContext();

  const handleLogin = () => {
    console.log('login');
    auth.login();
    navigate('/postlogin');
  };

  const handleAddToCart = (product: Product) => {
    if (auth.isAuthenticated) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
      setCartMessage(`${product.name} (x${quantity}) added to cart!`);
      setTimeout(() => setCartMessage(null), 3000);
    }
    else {
      handleLogin();
    }
  };

  const handleRecommendationClick = (rec: Product) => {
    setProduct(rec);
    window.scrollTo(0, 0);
  };

  const handleRecQuantity = (id: number, delta: number) => {
    setRecQuantities((q) => ({
      ...q,
      [id]: Math.max(1, (q[id] || 1) + delta),
    }));
  };

  const handleLikeQuantity = (id: number, delta: number) => {
    setLikeQuantities((q) => ({
      ...q,
      [id]: Math.max(1, (q[id] || 1) + delta),
    }));
  };

  const handleRecAddToCart = (rec: Product) => {
    const qty = recQuantities[rec.productId] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: rec.productId,
        name: rec.name,
        price: rec.price,
        image: rec.image,
      });
    }
    setCartMessage(`${rec.name} (x${qty}) added to cart!`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const handleLikeAddToCart = (rec: Product) => {
    const qty = likeQuantities[rec.productId] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: rec.productId,
        name: rec.name,
        price: rec.price,
        image: rec.image,
      });
    }
    setCartMessage(`${rec.name} (x${qty}) added to cart!`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-teal-500';
      case 'New':
        return 'bg-blue-500';
      case 'Sale':
        return 'bg-red-500';
      case 'Popular':
        return 'bg-purple-500';
      case 'Eco-Friendly':
        return 'bg-green-500';
      case 'Energy Efficient':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const discountPercentage = product
    ? Math.round(
      ((product.price * 90) / 100),
    )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 scroll-smooth">
      <ScrollToTop />
      <div className="container mx-auto px-4 py-8">
        {product ? (
          <div className="space-y-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-amber-700">
              <Link to="/" className="hover:text-teal-600 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                to="/products"
                className="hover:text-teal-600 transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="text-amber-900 font-medium">
                {product.category}
              </span>
              <span>/</span>
              <span className="text-amber-900 font-medium">{product.name}</span>
            </div>

            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>

            {/* Main Product Section */}
            <Card className="border-amber-200 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div className="relative group">
                      <img
                        src={images[selectedImage] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-xl border border-amber-200 group-hover:scale-105 transition-transform duration-300"
                      />
                      {discountPercentage > 0 && (
                        <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                          -{discountPercentage}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || '/placeholder.svg'}
                          alt={`View ${idx + 1}`}
                          className={`w-20 h-20 object-cover rounded-lg border-2 cursor-pointer transition-all ${selectedImage === idx
                            ? 'border-teal-500 ring-2 ring-teal-200'
                            : 'border-amber-200 hover:border-teal-300'
                            }`}
                          onClick={() => setSelectedImage(idx)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-6">
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-amber-300 text-amber-800"
                      >
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-amber-900">
                          {product.rating}
                        </span>
                        <span className="text-sm text-amber-600">
                          ({product.review} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h1 className="text-3xl font-bold text-amber-900">
                      {product.name}
                    </h1>

                    {/* Price */}
                    <div className="flex items-end space-x-3">
                      <span className="text-3xl font-bold text-amber-900">
                        ${product.price}
                      </span>
                      {product.price > product.price && (
                        <>
                          <span className="text-xl line-through text-amber-600">
                            ${product.price}
                          </span>
                          <span className="text-lg font-semibold text-green-600">
                            Save $
                            {(product.price - product.price).toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-amber-800 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-amber-900">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-amber-300 rounded-full">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 rounded-full"
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >
                          -
                        </Button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-10 w-10 rounded-full"
                          onClick={() => setQuantity((q) => q + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-lg py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart - ${(product.price * quantity).toFixed(2)}
                      </Button>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full bg-transparent"
                          onClick={() => setIsWishlisted(!isWishlisted)}
                        >
                          <Heart
                            className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-amber-300 text-amber-800 hover:bg-amber-100 rounded-full px-6 bg-transparent"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        {/* Chat to Seller Button */}
                        <Button
                          className="w-full mt-2 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white text-lg py-3 flex items-center justify-center gap-2"
                          onClick={() => {
                            navigate(`/chat`);
                          }}
                        >
                          💬 Chat to Seller
                        </Button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-200">
                      <div className="text-center">
                        <Truck className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                        <span className="text-sm text-amber-800">
                          Free Shipping
                        </span>
                      </div>
                      <div className="text-center">
                        <Shield className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                        <span className="text-sm text-amber-800">
                          Secure Payment
                        </span>
                      </div>
                      <div className="text-center">
                        <RotateCw className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                        <span className="text-sm text-amber-800">
                          30-Day Returns
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Tabs */}
            <Card className="border-amber-200">
              <CardContent className="p-0">
                {/* Tab Headers */}
                <div className="flex border-b border-amber-200 bg-amber-50">
                  {[
                    { id: 'description', label: 'Description' },
                    { id: 'specs', label: 'Specifications' },
                    { id: 'reviews', label: `Reviews (${product.review})` },
                  ].map((tabItem) => (
                    <button
                      key={tabItem.id}
                      className={`px-6 py-4 font-semibold transition-colors ${tab === tabItem.id
                        ? 'border-b-2 border-teal-500 text-teal-600 bg-white'
                        : 'text-amber-700 hover:text-teal-600'
                        }`}
                      onClick={() => setTab(tabItem.id)}
                    >
                      {tabItem.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {tab === 'description' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-amber-900">
                        Product Description
                      </h3>
                      <p className="text-amber-800 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">
                          Key Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-amber-800">
                          <li>
                            Premium build quality with attention to detail
                          </li>
                          <li>Advanced technology for superior performance</li>
                          <li>Ergonomic design for maximum comfort</li>
                          <li>Backed by comprehensive warranty</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {tab === 'specs' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-amber-900">
                        Technical Specifications
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {specifications.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-3 px-4 bg-amber-50 rounded-lg"
                          >
                            <span className="font-medium text-amber-900">
                              {spec.label}
                            </span>
                            <span className="text-amber-800">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-amber-900">
                          Customer Reviews
                        </h3>
                        <Button
                          variant="outline"
                          className="border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                        >
                          Write a Review
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <Card key={review.id} className="border-amber-200">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-semibold text-amber-900">
                                      {review.user}
                                    </span>
                                    {review.verified && (
                                      <Badge className="bg-green-100 text-green-800 text-xs">
                                        Verified Purchase
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${i < review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300'
                                            }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-amber-600">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-amber-800">{review.comment}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {filteredRecommendations.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-amber-900">
                  More from {product?.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {filteredRecommendations.map((rec) => (
                    <Card
                      key={rec.productId}
                      className="border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      <ScrollToTop />
                      <CardContent className="p-6">
                        <div className="relative mb-4">
                          <img
                            src={rec.image || '/placeholder.svg'}
                            alt={rec.name}
                            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />                          
                        </div>

                        <div className="space-y-3">
                          <Badge
                            variant="outline"
                            className="border-amber-300 text-amber-700 text-xs"
                          >
                            {rec.category}
                          </Badge>
                          <h4 className="font-semibold text-amber-900 group-hover:text-teal-600 transition-colors">
                            {rec.name}
                          </h4>

                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(rec.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-amber-600">
                              ({rec.review})
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-amber-900">
                              ${rec.price}
                            </span>
                            <span className="line-through text-amber-600 text-sm">
                              ${rec.price}
                            </span>
                          </div>

                          <div
                            className="flex items-center space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center border border-amber-300 rounded-full">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleRecQuantity(rec.productId, -1)}
                              >
                                -
                              </Button>
                              <span className="px-2 text-sm">
                                {recQuantities[rec.productId] || 1}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleRecQuantity(rec.productId, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRecAddToCart(rec);
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* You Might Also Like */}
            {youMightAlsoLike.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-amber-900">
                  You Might Also Like
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {youMightAlsoLike.map((rec) => (
                    <Card
                      key={rec.productId}
                      className="border-amber-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => handleRecommendationClick(rec)}
                    >
                      <ScrollToTop />
                      <CardContent className="p-6">
                        <div className="relative mb-4">
                          <img
                            src={rec.image || '/placeholder.svg'}
                            alt={rec.name}
                            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="space-y-3">
                          <Badge
                            variant="outline"
                            className="border-amber-300 text-amber-700 text-xs"
                          >
                            {rec.category}
                          </Badge>
                          <h4 className="font-semibold text-amber-900 group-hover:text-teal-600 transition-colors">
                            {rec.name}
                          </h4>

                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(rec.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-amber-600">
                              ({rec.review})
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-amber-900">
                              ${rec.price}
                            </span>
                            <span className="line-through text-amber-600 text-sm">
                              ${rec.price}
                            </span>
                          </div>

                          <div
                            className="flex items-center space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center border border-amber-300 rounded-full">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleLikeQuantity(rec.productId, -1)}
                              >
                                -
                              </Button>
                              <span className="px-2 text-sm">
                                {likeQuantities[rec.productId] || 1}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full"
                                onClick={() => handleLikeQuantity(rec.productId, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLikeAddToCart(rec);
                              }}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card className="border-amber-200">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingCart className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-900">
                  Product Not Found
                </h2>
                <p className="text-amber-700">
                  The product you're looking for couldn't be loaded.
                </p>
                <Link to="/products">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Cart Success Message */}
      {cartMessage && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-slide-in-right">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4" />
            <span>{cartMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
