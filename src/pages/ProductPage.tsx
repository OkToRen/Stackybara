import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState, useMemo } from 'react';
import { useProduct } from '@/lib/ProductContext';
import { Search, Filter, Grid, List, Star, ShoppingCart, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/CartContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";

export default function ProductsPage() {
  const location = useLocation();
  const {product, setProduct} = useProduct();
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const { addToCart, cart, decreaseFromCart } = useCart();
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  useEffect(() =>{
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    setSearchQuery(query);
  }, [location.search]);

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
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by category
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(product.category) ||
        (selectedCategories.includes('All') &&
          categories.includes(product.category));

      // Filter by price
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

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
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((c) => c !== 'All');
        if (prev.includes(category)) {
          return newCategories.filter((c) => c !== category);
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

  // Add to cart handler
  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000 || selectedRatings.length > 0

  const clearAllFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 1000])
    setSelectedRatings([])
  }

  const removeRating = (rating: number) => {
    setSelectedRatings((prev) => prev.filter((r) => r !== rating))
  }

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category))
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="w-full max-w-sm">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg">
                      <Filter className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-lg font-semibold text-slate-800">Filters</span>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-slate-500 hover:text-slate-700 h-8 px-2"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </CardTitle>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {category}
                        <button
                          onClick={() => removeCategory(category)}
                          className="ml-1 hover:bg-blue-300 rounded-full p-0.5"
                        >
                          <X className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                    {selectedRatings.map((rating) => (
                      <Badge
                        key={rating}
                        variant="secondary"
                        className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        {rating}+ stars
                        <button onClick={() => removeRating(rating)} className="ml-1 hover:bg-yellow-300 rounded-full p-0.5">
                          <X className="h-2 w-2" />
                        </button>
                      </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        ${priceRange[0]} - ${priceRange[1]}
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <Accordion type="multiple" defaultValue={["categories", "price", "rating"]} className="w-full">
                  {/* Categories */}
                  <AccordionItem value="categories" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-3 px-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Categories</span>
                        {selectedCategories.length > 0 && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                            {selectedCategories.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="grid gap-3">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-3 group">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                              className="data-[state=checked]:bg-white-600 data-[state=checked]:border-blue-600"
                            />
                            <Label
                              htmlFor={`category-${category}`}
                              className="text-sm font-medium text-slate-600 cursor-pointer group-hover:text-slate-800 transition-colors"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <Separator className="my-2" />

                  {/* Price Range */}
                  <AccordionItem value="price" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-3 px-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Price Range</span>
                        {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                            ${priceRange[0]} - ${priceRange[1]}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <Label htmlFor="min-price" className="text-xs text-slate-500 mb-1 block">
                              Min Price
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
                                $
                              </span>
                              <Input
                                id="min-price"
                                type="number"
                                min="0"
                                max={priceRange[1]}
                                value={priceRange[0]}
                                onChange={(e) => {
                                  const val = Math.min(Number(e.target.value) || 0, priceRange[1]);
                                  setPriceRange([val, priceRange[1]]);
                                }}
                                className="pl-7 text-center border-slate-300 focus:border-blue-500"
                                placeholder="0"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-center pt-6">
                            <div className="w-4 h-px bg-slate-300"></div>
                          </div>

                          <div className="flex-1">
                            <Label htmlFor="max-price" className="text-xs text-slate-500 mb-1 block">
                              Max Price
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">
                                $
                              </span>
                              <Input
                                id="max-price"
                                type="number"
                                min={priceRange[0]}
                                max="10000"
                                value={priceRange[1]}
                                onChange={(e) => {
                                  const val = Math.max(Number(e.target.value) || 0, priceRange[0]);
                                  setPriceRange([priceRange[0], val]);
                                }}
                                className="pl-7 text-center border-slate-300 focus:border-blue-500"
                                placeholder="1000"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Quick Price Range Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPriceRange([0, 50])}
                            className="text-xs h-8 border-slate-300 hover:bg-slate-50"
                          >
                            Under $50
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPriceRange([50, 100])}
                            className="text-xs h-8 border-slate-300 hover:bg-slate-50"
                          >
                            $50 - $100
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPriceRange([100, 200])}
                            className="text-xs h-8 border-slate-300 hover:bg-slate-50"
                          >
                            $100 - $200
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPriceRange([200, 1000])}
                            className="text-xs h-8 border-slate-300 hover:bg-slate-50"
                          >
                            $200+
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <Separator className="my-2" />

                  {/* Rating */}
                  <AccordionItem value="rating" className="border-none">
                    <AccordionTrigger className="hover:no-underline py-3 px-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-700">Rating</span>
                        {selectedRatings.length > 0 && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-600 border-yellow-200">
                            {selectedRatings.length}
                          </Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <div className="grid gap-3">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-3 group">
                            <Checkbox
                              id={`rating-${rating}`}
                              checked={selectedRatings.includes(rating)}
                              onCheckedChange={() => handleRatingChange(rating)}
                              className="data-[state=checked]:bg-white-500 data-[state=checked]:border-yellow-500"
                            />
                            <Label
                              htmlFor={`rating-${rating}`}
                              className="flex items-center cursor-pointer group-hover:opacity-80 transition-opacity"
                            >
                              <div className="flex items-center gap-1">
                                {Array.from({ length: rating }).map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                                {Array.from({ length: 5 - rating }).map((_, i) => (
                                  <Star key={i + rating} className="h-3.5 w-3.5 text-slate-300" />
                                ))}
                                <span className="text-sm font-medium text-slate-600 ml-2">{rating} & up</span>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
                <select
                  className="w-40 border border-amber-300 rounded-md px-3 py-2"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
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

            {/* Cart Message */}
            {cartMessage && (
              <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
                {cartMessage}
              </div>
            )}

            {/* Products Grid/List */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedProducts.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                return (
                  <Link to="/productdetails" onClick={() =>setProduct(product)}>
                  <Card
                    key={product.id}
                    className={`border-amber-200 hover:shadow-lg transition-shadow group ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                    >
                    <div
                      className={
                        viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                      }
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
                        {cartItem ? (
                          <div className="flex items-center w-full gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-amber-100" onClick={(e) => {
                                e.preventDefault();  decreaseFromCart(product.id);}}>-</Button>
                            <span className="font-semibold text-amber-900">{cartItem.quantity}</span>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-amber-100" onClick={(e) => {
                                e.preventDefault(); addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });}}>+</Button>
                            <Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white" onClick={() => handleAddToCart(product)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add More
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
                             onClick={(e) => {
                                e.preventDefault();     
                                handleAddToCart(product);
                              }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                  </Card>
                  </Link>
                );
              })}
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
