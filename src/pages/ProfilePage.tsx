'use client';

import type React from 'react';

import { useCallback, useEffect, useState } from 'react';
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  MapPin,
  Shield,
  Edit3,
  Camera,
  LogOut,
  Award,
  TrendingUp,
  Calendar,
  Star,
  Package,
  Bell,
  Lock,
  Plus,
  Eye,
  Trash2,
  Check,
  Crown,
  Sparkles,
  Gift,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useAuthContext } from '@/lib/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { backend } from '@/declarations/backend';
import type { UserData } from '@/declarations/backend/backend.did';
import { useLoading } from '@/hooks/UseLoading';
import StackybaraLoadingPage from '@/pages/LoadingScreen';

export default function ProfilePage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const loading = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData>({
    principal: auth.principal,
    name: '',
    createdAt: BigInt(0),
    membershipLevel: '',
    email: '',
    address: '',
    phone: '',
    isSeller: false,
  });
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Add this line
  const [activeTab, setActiveTab] = useState('profile'); // Add this line

  // Define achievements array
  const achievements = [
    {
      id: 1,
      title: 'First Purchase',
      description: 'Completed your first order',
      icon: Award,
      earned: true,
    },
    {
      id: 2,
      title: 'Wishlist Pro',
      description: 'Added 10 items to your wishlist',
      icon: Heart,
      earned: false,
    },
    {
      id: 3,
      title: 'Top Reviewer',
      description: 'Left 5 product reviews',
      icon: Star,
      earned: false,
    },
    {
      id: 4,
      title: 'Loyal Member',
      description: 'Been a member for 1 year',
      icon: Crown,
      earned: true,
    },
  ];

  const getUser = useCallback(() => {
    return loading.withLoading(async () => {
      const response = await backend.getUser(auth.principal);
      console.log(response);
      console.log(Array.isArray(response));
      setUserInfo(
        Array.isArray(response) && response[0] !== undefined
          ? response[0]
          : userInfo,
      );
    });
  }, [loading]);

  // const registerUser = async () => {
  //   console.log('registering user');
  //   const response = await backend.registerUser(
  //     'darren',
  //     'darrenharyanto@gmail.com',
  //     'Jakarta',
  //     '08111777566',
  //     false,
  //   );
  //   console.log(response);
  //   console.log('registering user finished');
  // };

  const goToSellerPage = async () => {
    navigate('/seller/profile');
  };

  const handleBecomeSeller = async () => {
    const updatedUserData = { ...userInfo, isSeller: true };
    await loading.withLoading(async () => {
      await backend.updateUser(auth.principal, updatedUserData);
      setUserInfo(updatedUserData);
      console.log('User updated to seller:', updatedUserData);
      navigate('/seller/postseller');
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const recentOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.99,
      items: 2,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
      products: ['Wireless Headphones', 'Phone Case'],
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 199.99,
      items: 1,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
      products: ['Smart Watch'],
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Delivered',
      total: 45.99,
      items: 1,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
      products: ['Laptop Stand'],
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 149.99,
      originalPrice: 199.99,
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
      inStock: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Smart Home Hub',
      price: 99.99,
      originalPrice: 129.99,
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
      inStock: true,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Fitness Tracker Pro',
      price: 249.99,
      originalPrice: 299.99,
      image:
        'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop',
      inStock: false,
      rating: 4.9,
    },
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main St, San Francisco, CA 94102',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      name: 'John Doe',
      address: '456 Business Ave, San Francisco, CA 94105',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ];

  const handleSave = async () => {
    setIsEditing(false);
    console.log(userInfo);
    await backend.updateUser(auth.principal, userInfo);
  };

  const handleLogoutClick = () => {
    auth.logout();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'Gold':
        return 'from-yellow-400 to-yellow-600';
      case 'Silver':
        return 'from-gray-400 to-gray-600';
      case 'Platinum':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-amber-400 to-amber-600';
    }
  };

  const getMembershipProgress = (level: string) => {
    switch (level) {
      case 'Bronze':
        return 25;
      case 'Silver':
        return 50;
      case 'Gold':
        return 75;
      case 'Platinum':
        return 100;
      default:
        return 25;
    }
  };

  if (loading.isLoading) {
    return <StackybaraLoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl animate-float animation-delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/10 rounded-full blur-2xl animate-pulse" />

      <div className="relative container mx-auto px-4 py-8">
        {/* Enhanced Profile Header */}
        <div
          className={`mb-8 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
            {/* Cover Image */}
            <div className="relative h-48 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-emerald-600/20" />
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Edit Cover
                </Button>
              </div>
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
              <div className="absolute bottom-10 right-20 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-500" />
            </div>

            <CardContent className="relative px-8 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-8 -mt-20">
                {/* Enhanced Profile Picture */}
                <div className="relative group">
                  <div className="w-40 h-40 bg-white rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-300">
                    {profileImage ? (
                      <img
                        src={profileImage || '/placeholder.svg'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-20 w-20 text-amber-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group">
                        <Camera className="h-5 w-5 text-white group-hover:animate-bounce" />
                      </div>
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  {/* Online Status */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-amber-900 mb-2">
                        {userInfo?.name ?? ''}
                      </h1>
                      <p className="text-amber-700 mb-2">
                        {userInfo?.email ?? ''}
                      </p>
                      <div className="flex items-center gap-4">
                        <Badge
                          className={`bg-gradient-to-r ${getMembershipColor(userInfo?.membershipLevel ?? '')} text-white`}
                        >
                          {(userInfo?.membershipLevel ?? '') + ' Member'}
                        </Badge>
                        <span className="text-sm text-amber-600">
                          Member since{' '}
                          {userInfo?.createdAt
                            ? new Date(
                                Number(userInfo.createdAt) / 1_000_000,
                              ).toLocaleString('default', {
                                month: 'long',
                                year: 'numeric',
                              })
                            : ''}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-2 border-amber-300 text-amber-800 hover:bg-amber-50 px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 group bg-transparent"
                      >
                        <Edit3 className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>

                      {isEditing && (
                        <Button
                          onClick={handleSave}
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  {
                    icon: ShoppingBag,
                    label: 'Total Orders',
                    value: totalOrders.toString(),
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'bg-blue-50',
                    textColor: 'text-blue-900',
                  },
                  {
                    icon: TrendingUp,
                    label: 'Total Spent',
                    value: `$${totalSpent}`,
                    color: 'from-green-500 to-green-600',
                    bgColor: 'bg-green-50',
                    textColor: 'text-green-900',
                  },
                  {
                    icon: Heart,
                    label: 'Wishlist Items',
                    value: wishlistItems.length.toString(),
                    color: 'from-pink-500 to-pink-600',
                    bgColor: 'bg-pink-50',
                    textColor: 'text-pink-900',
                  },
                  {
                    icon: Award,
                    label: 'Achievements',
                    value: achievements
                      .filter((a) => a.earned)
                      .length.toString(),
                    color: 'from-purple-500 to-purple-600',
                    bgColor: 'bg-purple-50',
                    textColor: 'text-purple-900',
                  },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className={`${stat.bgColor} border-0 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group cursor-pointer`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                      >
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                      <div
                        className={`text-3xl font-bold ${stat.textColor} mb-1`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <div
          className={`transition-all duration-1000 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid h-15 w-full grid-cols-2 md:grid-cols-5 bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 rounded-2xl p-2 shadow-lg">
              {[
                { value: 'profile', icon: User, label: 'Profile' },
                { value: 'orders', icon: ShoppingBag, label: 'Orders' },
                { value: 'wishlist', icon: Heart, label: 'Wishlist' },
                { value: 'addresses', icon: MapPin, label: 'Addresses' },
                { value: 'settings', icon: Settings, label: 'Settings' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-xl px-4 py-3 font-medium transition-all duration-300 hover:scale-105"
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      {[
                        { label: 'Full Name', key: 'name', type: 'text' },
                        { label: 'Email Address', key: 'email', type: 'email' },
                        { label: 'Phone Number', key: 'phone', type: 'tel' },
                        { label: 'Address', key: 'address', type: 'text' },
                      ].map((field) => (
                        <div key={field.key} className="space-y-2">
                          <label className="block text-sm font-medium text-amber-900">
                            {field.label}
                          </label>
                          <Input
                            type={field.type}
                            value={
                              (userInfo?.[
                                field.key as keyof UserData
                              ] as string) ?? ''
                            }
                            onChange={(e) =>
                              setUserInfo(
                                userInfo
                                  ? { ...userInfo, [field.key]: e.target.value }
                                  : userInfo,
                              )
                            }
                            disabled={!isEditing}
                            className="border-2 border-amber-200 focus:border-teal-400 focus:ring-teal-400 rounded-xl transition-all duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 ${
                            achievement.earned
                              ? 'bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              achievement.earned
                                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                                : 'bg-gray-300 text-gray-500'
                            }`}
                          >
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold ${achievement.earned ? 'text-teal-900' : 'text-gray-600'}`}
                            >
                              {achievement.title}
                            </h3>
                            <p
                              className={`text-sm ${achievement.earned ? 'text-teal-700' : 'text-gray-500'}`}
                            >
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.earned && (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced Orders Tab */}
            <TabsContent value="orders">
              <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="h-5 w-5" />
                      <span>Order History</span>
                    </div>
                    <Badge className="bg-teal-100 text-teal-800">
                      {recentOrders.length} Orders
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentOrders.map((order, index) => (
                      <Card
                        key={order.id}
                        className="border-amber-200/30 hover:shadow-lg transition-all duration-300 group"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            <div className="relative">
                              <img
                                src={order.image || '/placeholder.svg'}
                                alt="Order item"
                                className="w-20 h-20 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                              />
                              <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs px-2 py-1">
                                {order.items}
                              </Badge>
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-bold text-amber-900 text-lg">
                                    {order.id}
                                  </h3>
                                  <p className="text-amber-700">
                                    {order.products.join(', ')}
                                  </p>
                                  <p className="text-sm text-amber-600 flex items-center space-x-2 mt-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(
                                        order.date,
                                      ).toLocaleDateString()}
                                    </span>
                                  </p>
                                </div>
                                <Badge
                                  className={`${getStatusColor(order.status)} border font-medium px-3 py-1`}
                                >
                                  {order.status}
                                </Badge>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-amber-900">
                                  ${order.total}
                                </div>
                                <div className="flex space-x-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-amber-300 text-amber-800 hover:bg-amber-50 rounded-xl bg-transparent"
                                    onClick={() =>
                                      navigate(`/order/${order.id}`)
                                    }
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </Button>
                                  {order.status === 'Delivered' && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl"
                                    >
                                      <Star className="h-4 w-4 mr-2" />
                                      Review
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Wishlist Tab */}
            <TabsContent value="wishlist">
              <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5" />
                      <span>My Wishlist</span>
                    </div>
                    <Badge className="bg-pink-100 text-pink-800">
                      {wishlistItems.length} Items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item, index) => (
                      <Card
                        key={item.id}
                        className="border-amber-200/30 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge className="bg-red-500 text-white">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-6">
                          <div className="space-y-3">
                            <h3 className="font-semibold text-amber-900 group-hover:text-teal-600 transition-colors duration-300">
                              {item.name}
                            </h3>

                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium text-amber-700 ml-1">
                                  {item.rating}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xl font-bold text-amber-900">
                                    ${item.price}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    ${item.originalPrice}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Button
                              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl transform hover:scale-105 transition-all duration-300"
                              disabled={!item.inStock}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              {item.inStock
                                ? 'Add to Cart'
                                : 'Notify When Available'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Addresses Tab */}
            <TabsContent value="addresses">
              <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Saved Addresses</span>
                    </div>
                    <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white rounded-xl">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Address
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {addresses.map((address) => (
                      <Card
                        key={address.id}
                        className={`border-2 transition-all duration-300 hover:shadow-lg ${
                          address.isDefault
                            ? 'border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50'
                            : 'border-amber-200/50 hover:border-amber-300'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-bold text-amber-900 text-lg">
                                  {address.type}
                                </h3>
                                {address.isDefault && (
                                  <Badge className="bg-teal-100 text-teal-800 border border-teal-200">
                                    Default
                                  </Badge>
                                )}
                              </div>
                              <div className="space-y-1 text-amber-700">
                                <p className="font-medium">{address.name}</p>
                                <p>{address.address}</p>
                                <p>{address.phone}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-amber-300 text-amber-800 hover:bg-amber-50 rounded-xl bg-transparent"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-800 hover:bg-red-50 rounded-xl bg-transparent"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center space-x-2">
                      <Bell className="h-5 w-5" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        label: 'Order Updates',
                        description:
                          'Get notified about your order status changes',
                        icon: Package,
                      },
                      {
                        label: 'Promotions & Deals',
                        description:
                          'Receive special offers and exclusive deals',
                        icon: Gift,
                      },
                      {
                        label: 'New Arrivals',
                        description: 'Be first to know about new products',
                        icon: Sparkles,
                      },
                      {
                        label: 'Price Drops',
                        description:
                          'Get alerts when wishlist items go on sale',
                        icon: TrendingUp,
                      },
                    ].map((setting, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <setting.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-amber-900">
                              {setting.label}
                            </h4>
                            <p className="text-sm text-amber-700">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          defaultChecked
                          className="data-[state=checked]:bg-teal-500"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Security */}
                <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Security & Privacy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl py-3">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-amber-300 text-amber-800 hover:bg-amber-50 rounded-xl py-3 bg-transparent"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900">
                      Change to Seller
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {userInfo?.isSeller ? (
                      <Link to={'/seller/profile'}>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                          Store Page
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                        onClick={handleBecomeSeller}
                      >
                        Become a Seller
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleLogoutClick}
                    variant="outline"
                    className="w-full border-red-300 text-red-800 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card> */}
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleLogoutClick}
            className="w-full text-white bg-red-500 hover:bg-red-600 mt-4"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
