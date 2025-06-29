'use client';

import { useState, useEffect } from 'react';
import { backend } from '@/declarations/backend';
import { useAuthContext } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Shield,
} from 'lucide-react';
import StackybaraLoadingPage from './LoadingScreen';

export default function PostUserLoginPage() {
  const { actor, isAuthenticated, principal, loginError } = useAuthContext();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (
    name: string,
    email: string,
    address: string,
    phone: string,
  ) => {
    setIsLoading(true);
    try {
      console.log('registering user');
      const response = await backend.registerUser(
        name,
        email,
        phone,
        address,
        false,
        auth.principal,
      );
      console.log(Array.isArray(response) ? response[0] : undefined);
      console.log('registering user finished');
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
    console.log('principal:', principal.toText());

    const fetchUser = async () => {
      if (isAuthenticated) {
        try {
          const user = await backend.getUser(auth.principal);
          console.log(user);
          if (user.length != 0) navigate('/');
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      }
    };

    fetchUser();
  }, [isAuthenticated, principal, actor]);

  useEffect(() => {
    if (loginError) {
      console.warn('Login failed, redirecting to home.');
      navigate('/');
    }
  }, [loginError]);

  if (!isAuthenticated || (!principal && !loginError)) {
    return <StackybaraLoadingPage />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-20 right-16 w-3 h-3 bg-teal-400 rounded-full animate-bounce opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-40 animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-40 animation-delay-3000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Welcome Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              Welcome to Stackybara
            </div>
            <h1 className="text-3xl font-bold text-amber-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 text-sm">
              Just a few more details to personalize your shopping experience
            </p>
          </div>

          {/* Main Card */}
          <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-teal-500 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Account Setup</h2>
                  <p className="text-white/80 text-xs">
                    Fill in your information below
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  registerUser(name, email, address, phone);
                }}
              >
                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                      <User className="w-3 h-3" />
                      Full Name
                    </label>
                    <Input
                      className="w-full px-3 py-2 border-2 border-amber-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                      <Mail className="w-3 h-3" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      className="w-full px-3 py-2 border-2 border-amber-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                      <MapPin className="w-3 h-3" />
                      Address
                    </label>
                    <Input
                      className="w-full px-3 py-2 border-2 border-amber-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1.5">
                      <Phone className="w-3 h-3" />
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      className="w-full px-3 py-2 border-2 border-amber-200 focus:border-teal-400 focus:ring-1 focus:ring-teal-200 rounded-lg transition-all duration-300 bg-white/50 text-sm"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-medium text-teal-900">
                        Secure & Private
                      </h4>
                      <p className="text-xs text-teal-700 mt-0.5">
                        Your information is encrypted and stored securely.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Setting up your account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Complete Setup
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Progress Indicator */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Step 1 of 1</span>
                  <span>Almost there!</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-amber-500 to-teal-500 h-1.5 rounded-full w-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
