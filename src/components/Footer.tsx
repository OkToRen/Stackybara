import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={Logo}
                alt="Shoppybara Logo"
                className="w-8 h-8 rounded"
              />
              <span className="text-xl font-bold text-white">Shoppybara</span>
            </div>
            <p className="text-amber-200 mb-4">
              The future of decentralized e-commerce, powered by blockchain
              technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="hover:text-teal-300 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-teal-300 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="hover:text-teal-300 transition-colors"
                >
                  Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="hover:text-teal-300 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help"
                  className="hover:text-teal-300 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-teal-300 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-teal-300 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="hover:text-teal-300 transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Blockchain</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-teal-300 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/security"
                  className="hover:text-teal-300 transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  to="/transparency"
                  className="hover:text-teal-300 transition-colors"
                >
                  Transparency
                </Link>
              </li>
              <li>
                <Link
                  to="/whitepaper"
                  className="hover:text-teal-300 transition-colors"
                >
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-200">
            © 2024 Shoppybara. All rights reserved. Built on blockchain
            technology.
          </p>
        </div>
      </div>
    </footer>
  );
}
