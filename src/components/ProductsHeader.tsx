import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Logo from '@/assets/logo.png'; // Adjust the path as necessary

export default function Header() {
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
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-1.5 py-0.5">
                3
              </Badge>
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
