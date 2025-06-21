import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, ShoppingCart, Store, LogOut } from 'lucide-react';

export default function SellerHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        {/* Left Side: Logo and Branding */}
        <Link to="/seller/dashboard" className="flex items-center gap-2">
          <img src={Logo} alt="ShoppyBara Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-amber-900">ShoppyBara</span>
          <span className="text-sm font-medium text-teal-600 border-l-2 pl-3 ml-3">
            Seller Centre
          </span>
        </Link>

        {/* Right Side: Navigation and User */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            <Link 
              to="/seller" 
              className="flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-teal-600 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/seller/productmanager" 
              className="flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-teal-600 transition-colors"
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link 
              to="/seller/orders" 
              className="flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-teal-600 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </Link>
          </nav>

          <div className="border-l border-amber-200 pl-4 flex items-center gap-3">
            <Link to="/seller/profile">
                <Store className="h-7 w-7 p-1 rounded-full text-amber-800 bg-amber-100 hover:bg-teal-100 hover:text-teal-700 transition-colors" />
            </Link>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}