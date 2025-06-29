import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ReviewCard, type Review } from '@/components/ui/reviewcard';
import {
  MapPin,
  Calendar,
  Edit3,
  Star,
  Package,
  Save,
  XCircle,
  Store as StoreIcon,
  MessageSquare,
  Settings,
  User,
  Camera,
  Shield,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { useAuthContext } from '@/lib/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/hooks/UseLoading';
import StackybaraLoadingPage from '@/pages/LoadingScreen';
import Logo from '@/assets/logo.png';
import { backend } from '@/declarations/backend';
import { Store, UserData } from '@/declarations/backend/backend.did';

const initialStoreInfo = {
  name: "The Capy Store",
  tagline: "Home of the finest digital goods",
  bannerUrl: "https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=800&h=200&fit=crop",
  logoUrl: Logo,
  location: "Jakarta, Indonesia",
  joinedDate: "October 2024",
  totalProducts: 5,
  totalSales: 142,
  totalRevenue: 3247.50,
  rating: 4.8,
  totalReviews: 87
};

const sellerProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', price: 89.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', stock: 15 },
  { id: 2, name: 'Organic Cotton T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop', stock: 32 },
  { id: 3, name: 'Smartphone Case', price: 15.99, image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop', stock: 8 },
  { id: 4, name: 'USB-C Cable', price: 12.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop', stock: 25 },
  { id: 5, name: 'Portable Charger', price: 34.99, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop', stock: 12 },
];

const reviews: Review[] = [
  { id: 1, customerName: 'John Doe', rating: 5, comment: 'Amazing product, fast delivery! Highly recommended.', date: 'June 20, 2025' },
  { id: 2, customerName: 'Jane Smith', rating: 4, comment: 'Good quality, but the color was slightly different than the picture.', date: 'June 18, 2025' },
  { id: 3, customerName: 'Mike Johnson', rating: 5, comment: 'Excellent seller, great communication throughout the process.', date: 'June 15, 2025' },
  { id: 4, customerName: 'Sarah Wilson', rating: 4, comment: 'Product arrived quickly and was well-packaged.', date: 'June 10, 2025' },
];

export default function StoreProfilePage() {
  const auth = useAuthContext();
  const loading = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [isSeller, setIsSeller] = useState(true);
  const [storeInfo, setStoreInfo] = useState<Store>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialStoreInfo.name,
    tagline: initialStoreInfo.tagline,
    location: initialStoreInfo.location,
  });

  useEffect(() => {
    const fetchStore = async () => {
      console.log(auth.principal)
      try {
        const response = await backend.getStoreProfile(auth.principal);
        console.log(response);
        setStoreInfo(Array.isArray(response) ? response[0] : undefined);
      } catch (err) {
        console.error("Error fetching store:", err);
      }
    };
    fetchStore();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (storeInfo) {
      await loading.withLoading(async () => {
        const success = await backend.updateStoreProfile(
          auth.principal,
          storeInfo.storeId,
          formData.name,
          formData.tagline,
          formData.location
        );
        if (success) {
          setStoreInfo(prev => ({
            ...prev!,
            storeName: formData.name,
            storeDesc: formData.tagline,
            storeLocation: formData.location,
          } as Store));
          setIsEditing(false);
          console.log('Store profile updated:', storeInfo);
        } else {
          console.error('Failed to update store profile.');
        }
      });
    }
  };

  const handleCancel = () => {
    if (storeInfo) {
      setFormData({
        name: storeInfo.storeName,
        tagline: storeInfo.storeDesc,
        location: storeInfo.storeLocation,
      });
    }
    setIsEditing(false);
  };

  const handleToggleSellerMode = async () => {
    await loading.withLoading(async () => {
      try {
        // Here you would call your backend to update user seller status
        // For now, we'll just toggle the local state
        setIsSeller(!isSeller);
        console.log(`User switched to ${!isSeller ? 'seller' : 'buyer'} mode`);
        navigate('/profile');
      } catch (error) {
        console.error('Failed to toggle seller mode:', error);
      }
    });
  };

  if (loading.isLoading) {
    return <StackybaraLoadingPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Store Header */}
        <div className="mb-8">
          <Card className="border-amber-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 h-32"></div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={storeInfo?.storeDesc || initialStoreInfo.logoUrl} alt={`${storeInfo?.storeName || initialStoreInfo.name} logo`} />
                      <AvatarFallback className="text-2xl text-amber-600">
                        <StoreIcon className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
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
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-3xl font-bold border-amber-300 focus:border-teal-400"
                          />
                          <Input
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleInputChange}
                            className="border-amber-300 focus:border-teal-400"
                          />
                          <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="border-amber-300 focus:border-teal-400"
                          />
                        </div>
                      ) : (
                        <>
                          <h1 className="text-3xl font-bold text-amber-900 mb-2">
                            {storeInfo?.storeName}
                          </h1>
                          <p className="text-amber-700 mb-2">{storeInfo?.storeDesc || initialStoreInfo.tagline}</p>
                          <div className="flex items-center gap-4 flex-wrap">
                            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              {initialStoreInfo.rating} ({initialStoreInfo.totalReviews} reviews)
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-amber-600">
                              <MapPin className="h-4 w-4" />
                              {storeInfo?.storeLocation || initialStoreInfo.location}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-amber-600">
                              <Calendar className="h-4 w-4" />
                              Joined {initialStoreInfo.joinedDate}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {isEditing ? (
                        <>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-red-300 text-red-800 hover:bg-red-100"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSaveChanges}
                            className="bg-teal-500 hover:bg-teal-600 text-white"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                          className="border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit Store
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-2xl font-bold text-amber-900">
                    {sellerProducts.length}
                  </div>
                  <div className="text-amber-700">Products</div>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <div className="text-2xl font-bold text-teal-900">
                    {initialStoreInfo.totalSales}
                  </div>
                  <div className="text-teal-700">Total Sales</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">
                    ${initialStoreInfo.totalRevenue}
                  </div>
                  <div className="text-green-700">Revenue</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-900">
                    {initialStoreInfo.rating}
                  </div>
                  <div className="text-purple-700">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-amber-200">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  My Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sellerProducts.map(product => (
                    <Card key={product.id} className="border-amber-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold text-amber-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-bold text-teal-600">
                            ${product.price}
                          </span>
                          <Badge
                            variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 border-amber-300 text-amber-800">
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white">
                    Add New Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Customer Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-amber-300 mx-auto mb-4" />
                      <p className="text-amber-700">No reviews yet.</p>
                      <p className="text-sm text-amber-600 mt-2">
                        Reviews will appear here once customers start buying your products.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Store Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      label: 'Order notifications',
                      description: 'Get notified when you receive new orders',
                    },
                    {
                      label: 'Inventory alerts',
                      description: 'Receive alerts when products are running low',
                    },
                    {
                      label: 'Customer messages',
                      description: 'Get notified when customers send messages',
                    },
                    {
                      label: 'Review notifications',
                      description: 'Be notified when customers leave reviews',
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
                  <CardTitle className="text-amber-900">Account Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-amber-900">Seller Mode</h4>
                        <p className="text-sm text-amber-700">
                          {isSeller
                            ? 'You are currently in seller mode. You can manage your store and products.'
                            : 'Switch to seller mode to manage your store and sell products.'
                          }
                        </p>
                      </div>
                      <Button
                        onClick={handleToggleSellerMode}
                        variant="outline"
                        className={`border-2 ${isSeller
                          ? 'border-teal-300 text-teal-800 bg-teal-50'
                          : 'border-amber-300 text-amber-800 bg-amber-50'
                          }`}
                      >
                        {isSeller ? (
                          <>
                            <ToggleRight className="h-4 w-4 mr-2" />
                            Switch to Buyer
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-4 w-4 mr-2" />
                            Switch to Seller
                          </>
                        )}
                      </Button>
                    </div>

                    {isSeller && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Switching to buyer mode will hide your store from customers temporarily.
                          You can switch back to seller mode at any time to reactivate your store.
                        </p>
                      </div>
                    )}
                  </div>
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
                  <CardTitle className="text-amber-900">Store Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-lg font-bold text-blue-900">2.4k</div>
                      <div className="text-sm text-blue-700">Profile Views</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                      <div className="text-lg font-bold text-green-900">95%</div>
                      <div className="text-sm text-green-700">Satisfaction Rate</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-amber-300 text-amber-800"
                  >
                    View Detailed Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}