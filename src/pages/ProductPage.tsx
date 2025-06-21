import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');

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

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home',
    'Office',
    'Sports',
  ];

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Filter by search query
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category) ||
        (selectedCategories.includes('All') && categories.includes(product.category));

      // Filter by price
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // Filter by rating
      const matchesRating = selectedRatings.length === 0 || 
        selectedRatings.some(rating => product.rating >= rating);

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [products, selectedCategories, priceRange, selectedRatings, searchQuery]);

  // Sort products based on sortOption
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'featured' or unknown: no sorting or default order
        break;
    }
    return sorted;
  }, [filteredProducts, sortOption]);

  // Handler for category selection
  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      setSelectedCategories(selectedCategories.includes('All') ? [] : ['All']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(c => c !== 'All');
        if (prev.includes(category)) {
          return newCategories.filter(c => c !== category);
        } else {
          return [...newCategories, category];
        }
      });
    }
  };

  // Handler for rating selection
  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-amber-200">
              <CardHeader>
                <h3 className="font-semibold text-amber-900 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-amber-900 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-amber-300"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                        />
                        <span className="text-amber-800">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-amber-900 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          Number.parseInt(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-amber-700">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-amber-900 mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-amber-300"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <div className="flex items-center">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-amber-800 ml-1">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 border-amber-300 focus:border-teal-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select className="w-40 border border-amber-300 rounded-md px-3 py-2" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="flex border border-amber-300 rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={
                      viewMode === 'grid' ? 'bg-teal-500 hover:bg-teal-600' : ''
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={
                      viewMode === 'list' ? 'bg-teal-500 hover:bg-teal-600' : ''
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`border-amber-200 hover:shadow-lg transition-shadow group ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                >
                  <div
                    className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}
                  >
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          className={`object-cover ${viewMode === 'list' ? 'w-full h-32 rounded-l-lg' : 'w-full h-48 rounded-t-lg'}`}
                        />
                        <Badge className="absolute top-2 left-2 bg-teal-500 text-white text-xs">
                          {product.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                  </div>
                  <div className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {product.name}
                      </h3>
                      {viewMode === 'list' && (
                        <p className="text-sm text-amber-700 mb-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-amber-700 ml-1">
                            {product.rating}
                          </span>
                          <span className="text-sm text-amber-600 ml-1">
                            ({product.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-amber-900">
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
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-800"
                >
                  Previous
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  1
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-800"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-800"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-800"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
