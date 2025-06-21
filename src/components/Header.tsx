import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Logo from '@/assets/logo.png'; // Adjust the path as necessary
import { useCart } from '@/lib/CartContext';

export default function Header() {

  const { cart } = useCart();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const isProductsRoute = location.pathname.startsWith('/products');
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setSearchValue('');    
    }, [location.pathname])

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/products?query=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="Shoppybara Logo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-2xl font-bold text-amber-900">
              Shoppybara
            </span>
          </Link>

          {/* Search Bar */}
          {!isProductsRoute && (
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                <Input
                  placeholder="Search for products, brands, and more..."
                  className="pl-10 pr-4 py-2 w-full border-amber-300 focus:border-teal-400 focus:ring-teal-400"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key == 'Enter' && handleSearch()}
                />
                <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white px-6"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6 mr-4">
              <Link
                to="/products"
                className="text-amber-800 hover:text-teal-600"
              >
                Products
              </Link>
              {/* <Link
                to="/categories"
                className="text-amber-800 hover:text-teal-600"
              >
                Categories
              </Link> */}
              <Link to="/about" className="text-amber-800 hover:text-teal-600">
                About
              </Link>
            </nav>
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-800 hover:text-teal-600"
            >
              <Link to={'/profile'} className="flex items-center">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-amber-800 hover:text-teal-600 relative"
            >
              <Link to={'/cart'} className="flex items-center">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1.5 py-0.5">
                  {cartCount}
                </Badge>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-amber-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 border-amber-300 focus:border-teal-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
