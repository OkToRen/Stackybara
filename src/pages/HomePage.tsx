// import { useUpdateCall, useQueryCall } from '@ic-reactor/react';

// export default function HomePage() {
//   const { data: count, refetch } = useQueryCall({
//     functionName: 'get',
//   });

//   const { call: increment, loading } = useUpdateCall({
//     functionName: 'inc',
//     onSuccess: refetch,
//   });

//   const { call: register } = useUpdateCall({
//     functionName: 'registerUser',
//     onSuccess: refetch,
//   });

//   // const userData = await backend_actor.getUserData();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-4">
//         Welcome to the Home Page, {count?.toString() || 'Loading...'}
//       </h1>
//       <p className="text-lg text-gray-700">
//         This is a simple home page built with React and Tailwind CSS.
//       </p>
//     </div>
//   );
// }
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Logo from '../assets/Logo.png';

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 324,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
      badge: 'Best Seller',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
      badge: 'New',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.9,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
      badge: 'Sale',
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 203,
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
      badge: 'Popular',
    },
  ];

  // const categories = [
  //   { name: 'Electronics', icon: '📱', count: '2,340 items' },
  //   { name: 'Fashion', icon: '👕', count: '1,890 items' },
  //   { name: 'Home & Garden', icon: '🏠', count: '1,567 items' },
  //   { name: 'Sports', icon: '⚽', count: '987 items' },
  //   { name: 'Books', icon: '📚', count: '3,456 items' },
  //   { name: 'Beauty', icon: '💄', count: '1,234 items' },
  // ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-amber-900 leading-tight">
                Decentralized Shopping,{' '}
                <span className="text-teal-600">Simplified</span>
              </h1>
              <p className="text-lg text-amber-800 leading-relaxed">
                Experience the future of e-commerce with Shoppybara. Every
                transaction is secure, transparent, and stored on the
                blockchain. Shop with confidence in our decentralized
                marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3"
                  >
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-100 to-amber-100 rounded-3xl p-8 shadow-2xl">
                <img
                  src={Logo}
                  alt="Shoppybara Mascot"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Why Choose Shoppybara?
            </h2>
            <p className="text-amber-700 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology for a secure and
              transparent shopping experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <CardTitle className="text-amber-900">
                  Secure Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-center">
                  Every purchase is protected by blockchain technology, ensuring
                  your transactions are safe and immutable.
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Globe className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <CardTitle className="text-amber-900">Decentralized</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-center">
                  No single point of failure. Our distributed network ensures
                  24/7 availability and transparency.
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Zap className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                <CardTitle className="text-amber-900">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-center">
                  Optimized smart contracts ensure quick processing times
                  without compromising security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-amber-700">
              Discover amazing products across all categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* {categories.map((category, index) => (
              <Link key={index} to={`/category/${category.name.toLowerCase()}`}>
                <Card className="border-amber-200 hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-amber-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-amber-600">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))} */}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">
                Featured Products
              </h2>
              <p className="text-amber-700">Handpicked items just for you</p>
            </div>
            <Link to="/products">
              <Button
                variant="outline"
                className="border-amber-300 text-amber-800 hover:bg-amber-100"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="border-amber-200 hover:shadow-lg transition-shadow group"
              >
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-teal-500 text-white">
                      {product.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-amber-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
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
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-amber-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-amber-600 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
    </div>
  );
}
