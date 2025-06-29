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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authHooks } from '@ic-reactor/react/dist/helpers';
import { useAuth } from '@ic-reactor/react';
import { useAuthContext } from '@/lib/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { backend } from '@/declarations/backend';
import { UserData } from '@/declarations/backend/backend.did';
import { useLoading } from '@/hooks/UseLoading';
import StackybaraLoadingPage from '@/pages/LoadingScreen';

export default function ProfilePage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const loading = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData>();
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  const getUser = useCallback(() => {
    return loading.withLoading(async () => {
      console.log(auth.principal);
      const response = await backend.getUser(auth.principal);
      console.log(Array.isArray(response));
      setUserInfo(Array.isArray(response) ? response[0] : undefined);
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
    if (userInfo) {
      const updatedUserData = { ...userInfo, isSeller: true };
      await loading.withLoading(async () => {
        await backend.updateUser(auth.principal, updatedUserData);
        setUserInfo(updatedUserData);
        console.log('User updated to seller:', updatedUserData);
        navigate('/postseller');
      });
    } else {
      console.warn('No user info available to update.');
    }
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
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 199.99,
      items: 1,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Delivered',
      total: 45.99,
      items: 1,
      image:
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      price: 149.99,
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      name: 'Smart Home Hub',
      price: 99.99,
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      name: 'Fitness Tracker Pro',
      price: 249.99,
      image:
        'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=200&h=200&fit=crop',
    },
  ];

  const handleSave = async () => {
    setIsEditing(false);

    if (userInfo) {
      await backend.updateUser(auth.principal, userInfo);
    }
  };

  const handleLogoutClick = () => {
    auth.logout();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (loading.isLoading) {
    return <StackybaraLoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-amber-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-32"></div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="h-16 w-16 text-amber-600" />
                  </div>
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
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

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                        className="border-amber-300 text-amber-800 hover:bg-amber-100"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </Button>

                      {isEditing && (
                        <Button
                          onClick={handleSave}
                          className="bg-teal-500 hover:bg-teal-600 text-white"
                        >
                          Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-900">
                    {totalOrders}
                  </div>
                  <div className="text-amber-700">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-900">
                    ${totalSpent}
                  </div>
                  <div className="text-teal-700">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    {wishlistItems.length}
                  </div>
                  <div className="text-green-700">Wishlist Items</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-amber-200">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Full Name
                    </label>
                    <Input
                      value={userInfo?.name ?? ''}
                      onChange={(e) =>
                        setUserInfo(
                          userInfo
                            ? { ...userInfo, name: e.target.value }
                            : userInfo,
                        )
                      }
                      disabled={!isEditing}
                      className="border-amber-300 focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Email Address
                    </label>
                    <Input
                      value={userInfo?.email ?? ''}
                      onChange={(e) =>
                        setUserInfo(
                          userInfo
                            ? { ...userInfo, email: e.target.value }
                            : userInfo,
                        )
                      }
                      disabled={!isEditing}
                      className="border-amber-300 focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Phone Number
                    </label>
                    <Input
                      value={userInfo?.phone ?? ''}
                      onChange={(e) =>
                        setUserInfo(
                          userInfo
                            ? { ...userInfo, phone: e.target.value }
                            : userInfo,
                        )
                      }
                      disabled={!isEditing}
                      className="border-amber-300 focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Address
                    </label>
                    <Input
                      value={userInfo?.address ?? ''}
                      onChange={(e) =>
                        setUserInfo(
                          userInfo
                            ? { ...userInfo, address: e.target.value }
                            : userInfo,
                        )
                      }
                      disabled={!isEditing}
                      className="border-amber-300 focus:border-teal-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg"
                    >
                      <img
                        src={order.image || '/placeholder.svg'}
                        alt="Order item"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-amber-900">
                              {order.id}
                            </h3>
                            <p className="text-sm text-amber-700">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-amber-900">
                            ${order.total}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-amber-300 text-amber-800"
                            onClick={() => navigate(`/order/${order.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <Card
                      key={item.id}
                      className="border-amber-200 hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-amber-900 mb-2">
                          {item.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-amber-900">
                            ${item.price}
                          </span>
                          <Button
                            size="sm"
                            className="bg-teal-500 hover:bg-teal-600 text-white"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">
                  Saved Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-lg border-2 border-teal-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-amber-900">Home</h3>
                        <p className="text-amber-700">
                          123 Main St, San Francisco, CA 94102
                        </p>
                      </div>
                      <Badge className="bg-teal-100 text-teal-800">
                        Default
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-amber-300 text-amber-800"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
                    Add New Address
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: 'Order updates',
                      description: 'Get notified about your order status',
                    },
                    {
                      label: 'Promotions',
                      description: 'Receive special offers and deals',
                    },
                    {
                      label: 'New arrivals',
                      description: 'Be first to know about new products',
                    },
                    {
                      label: 'Price drops',
                      description: 'Get alerts when wishlist items go on sale',
                    },
                  ].map((setting, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-amber-900">
                          {setting.label}
                        </h4>
                        <p className="text-sm text-amber-700">
                          {setting.description}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-teal-600"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-amber-300 text-amber-800 hover:bg-amber-100"
                  >
                    Enable Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Change to Seller</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {userInfo?.isSeller ? (
                    <Link to={'/seller/profile'}>
                      <Button
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                      >
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
  );
}
