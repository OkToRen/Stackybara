'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function PageNotFound() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const popularPages = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '🛍️' },
    { name: 'Categories', path: '/categories', icon: '📂' },
    { name: 'About', path: '/about', icon: 'ℹ️' },
    { name: 'Support', path: '/support', icon: '🎧' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}
        ></div>

        {/* Floating Capybaras */}
        <div
          className="absolute top-1/4 left-1/4 text-6xl animate-pulse opacity-30"
          style={{ animationDuration: '2s' }}
        >
          🦫
        </div>
        <div
          className="absolute top-1/3 right-1/4 text-4xl animate-pulse opacity-30"
          style={{ animationDuration: '3s', animationDelay: '1s' }}
        >
          🦫
        </div>
        <div
          className="absolute bottom-1/3 left-1/3 text-5xl animate-pulse opacity-30"
          style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}
        >
          🦫
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Main 404 Content */}
        <div
          className={`text-center mb-8 transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Large 404 Number */}
          <div className="relative mb-6">
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-teal-500 bg-clip-text animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-amber-200 opacity-20 blur-sm">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Looks like this capybara wandered off the beaten path! 🦫
            </p>
            <p className="text-gray-500">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <Card
          className={`w-full max-w-md p-6 mb-8 bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h3 className="text-xl font-semibold text-amber-900 mb-4 text-center">
            🔍 Search for Products
          </h3>
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-amber-300 focus:border-teal-400 focus:ring-teal-400"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Search Products
            </Button>
          </form>
        </Card>

        {/* Quick Navigation */}
        <Card
          className={`w-full max-w-2xl p-6 mb-8 bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h3 className="text-xl font-semibold text-amber-900 mb-4 text-center">
            🧭 Quick Navigation
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {popularPages.map((page, index) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                variant="outline"
                className="flex items-center justify-center space-x-2 p-3 border-amber-300 hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-lg">{page.icon}</span>
                <span className="text-sm font-medium">{page.name}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🏠 Go Home
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-amber-300 text-amber-700 hover:border-teal-400 hover:bg-teal-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            ← Go Back
          </Button>
        </div>

        {/* Fun Facts Section */}
        <Card
          className={`w-full max-w-lg mt-8 p-6 bg-gradient-to-r from-teal-100 to-cyan-100 border-teal-200 shadow-xl transition-all duration-1000 delay-900 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <h3 className="text-lg font-semibold text-teal-800 mb-3 text-center">
            🦫 Fun Capybara Fact!
          </h3>
          <p className="text-teal-700 text-center text-sm">
            Did you know? Capybaras are excellent swimmers and can hold their
            breath underwater for up to 5 minutes! Just like how we're excellent
            at helping you find what you need on Stackybara! 🏊‍♂️
          </p>
        </Card>

        {/* Help Section */}
        <div
          className={`mt-8 text-center transition-all duration-1000 delay-1100 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <p className="text-gray-600 mb-2">Still need help?</p>
          <Button
            onClick={() => navigate('/support')}
            variant="link"
            className="text-teal-600 hover:text-teal-700 font-semibold underline"
          >
            Contact Support 🎧
          </Button>
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
