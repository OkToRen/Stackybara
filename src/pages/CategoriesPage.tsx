'use client';

import { useState } from 'react';
import { Search, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    {
      name: 'All',
      icon: '🛍️',
      count: 12543,
      color: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Electronics',
      icon: '📱',
      count: 2340,
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Fashion',
      icon: '👕',
      count: 1890,
      color: 'from-pink-400 to-pink-600',
    },
    {
      name: 'Home & Garden',
      icon: '🏠',
      count: 1567,
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Sports & Outdoors',
      icon: '⚽',
      count: 987,
      color: 'from-orange-400 to-orange-600',
    },
    {
      name: 'Books & Media',
      icon: '📚',
      count: 3456,
      color: 'from-purple-400 to-purple-600',
    },
    {
      name: 'Beauty & Health',
      icon: '💄',
      count: 1234,
      color: 'from-red-400 to-red-600',
    },
    {
      name: 'Automotive',
      icon: '🚗',
      count: 567,
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      name: 'Toys & Games',
      icon: '🎮',
      count: 890,
      color: 'from-indigo-400 to-indigo-600',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 324,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      category: 'Electronics',
      badge: 'Best Seller',
      description:
        'Premium quality wireless headphones with active noise cancellation and 30-hour battery life.',
    },
    {
      id: 2,
      name: 'Smart Fitness Watch Series 5',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      category: 'Electronics',
      badge: 'New Arrival',
      description:
        'Advanced fitness tracking with heart rate monitoring and GPS functionality.',
    },
    {
      id: 3,
      name: 'Ergonomic Laptop Stand Aluminum',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      category: 'Home & Garden',
      badge: 'Hot Deal',
      description:
        'Adjustable aluminum laptop stand for better posture and improved airflow.',
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker Waterproof',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 203,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
      category: 'Electronics',
      badge: 'Popular',
      description:
        'Waterproof speaker with 360-degree sound and 12-hour battery life.',
    },
    {
      id: 5,
      name: 'Organic Cotton T-Shirt Collection',
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.5,
      reviews: 78,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      category: 'Fashion',
      badge: 'Eco-Friendly',
      description:
        'Sustainable fashion made from 100% organic cotton with fair trade certification.',
    },
    {
      id: 6,
      name: 'LED Desk Lamp with Wireless Charging',
      price: 39.99,
      originalPrice: 49.99,
      rating: 4.4,
      reviews: 112,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      category: 'Home & Garden',
      badge: 'Energy Efficient',
      description:
        'Adjustable LED lamp with multiple brightness levels and built-in wireless charging pad.',
    },
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our Categories
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Discover thousands of products across all categories, powered by
            blockchain technology
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-amber-700">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {categories.map((category, index) => (
              <Card
                key={index}
                className={`border-amber-200 hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                  selectedCategory === category.name
                    ? 'ring-2 ring-teal-500 bg-teal-50'
                    : 'hover:scale-105'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  ></div>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3
                    className={`font-semibold mb-2 transition-colors ${
                      selectedCategory === category.name
                        ? 'text-teal-600'
                        : 'text-amber-900 group-hover:text-teal-600'
                    }`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-sm text-amber-600">
                    {category.count.toLocaleString()} items
                  </p>
                  {selectedCategory === category.name && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
              <Input
                placeholder={`Search in ${selectedCategory}...`}
                className="pl-10 border-amber-300 focus:border-teal-400 rounded-full bg-white"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-amber-300 rounded-full bg-white focus:border-teal-400 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="flex border border-amber-300 rounded-full overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-teal-500 hover:bg-teal-600' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-amber-900">
              {selectedCategory} Products
            </h3>
            <p className="text-amber-700">
              Showing {filteredProducts.length} of {filteredProducts.length}{' '}
              results
            </p>
          </div>

          {/* Products Grid/List */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`border-amber-200 hover:shadow-xl transition-all duration-300 group ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div
                  className={viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                          viewMode === 'list'
                            ? 'w-full h-40 rounded-l-lg'
                            : 'w-full h-56 rounded-t-lg'
                        }`}
                      />
                      <Badge className="absolute top-3 left-3 bg-teal-500 text-white font-semibold">
                        {product.badge}
                      </Badge>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                    </div>
                  </CardHeader>
                </div>
                <div className="flex-1">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-teal-600 transition-colors text-lg">
                      {product.name}
                    </h3>
                    {viewMode === 'list' && (
                      <p className="text-amber-700 mb-3 text-sm leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-amber-700 ml-1 font-medium">
                          {product.rating}
                        </span>
                        <span className="text-sm text-amber-600 ml-1">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-bold text-amber-900">
                          ${product.price}
                        </span>
                        <span className="text-sm text-amber-600 line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-amber-300 text-amber-700"
                      >
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-2 border-amber-300 text-amber-800 hover:bg-amber-100 px-8 py-3 rounded-full font-semibold"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
