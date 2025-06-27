import React, { useState, useMemo } from 'react';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  Package, 
  Store, 
  Eye, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Ergonomic Laptop Stand',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
    category: 'Office',
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
    category: 'Fashion',
  },
  {
    id: 6,
    name: 'LED Desk Lamp',
    price: 39.99,
    originalPrice: 49.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    category: 'Home',
  },
];

const stores = {
  'Electronics': 'TechHub Electronics',
  'Fashion': 'Fashion Forward',
  'Home': 'Home & Garden',
  'Office': 'Office Essentials',
  'Sports': 'Sports Central'
};

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-06-25',
    storeName: stores['Electronics'],
    storeId: 'store-1',
    status: 'completed',
    total: 369.98,
    items: [
      { 
        id: products[0].id, 
        name: products[0].name, 
        image: products[0].image, 
        quantity: 2, 
        price: products[0].price 
      },
      { 
        id: products[1].id, 
        name: products[1].name, 
        image: products[1].image, 
        quantity: 1, 
        price: products[1].price 
      }
    ],
    shippingAddress: 'Jakarta, Indonesia',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-06-20',
    storeName: stores['Fashion'],
    storeId: 'store-2',
    status: 'in-progress',
    total: 74.98,
    items: [
      { 
        id: products[4].id, 
        name: products[4].name, 
        image: products[4].image, 
        quantity: 3, 
        price: products[4].price 
      }
    ],
    shippingAddress: 'Jakarta, Indonesia',
    paymentMethod: 'E-Wallet',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-06-15',
    storeName: stores['Office'],
    storeId: 'store-3',
    status: 'completed',
    total: 125.97,
    items: [
      { 
        id: products[2].id, 
        name: products[2].name, 
        image: products[2].image, 
        quantity: 1, 
        price: products[2].price 
      },
      { 
        id: products[3].id, 
        name: products[3].name, 
        image: products[3].image, 
        quantity: 1, 
        price: products[3].price 
      }
    ],
    shippingAddress: 'Jakarta, Indonesia',
    paymentMethod: 'Virtual Account',
    trackingNumber: 'TRK111222333'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-06-10',
    storeName: stores['Home'],
    storeId: 'store-4',
    status: 'failed',
    total: 79.98,
    items: [
      { 
        id: products[5].id, 
        name: products[5].name, 
        image: products[5].image, 
        quantity: 2, 
        price: products[5].price 
      }
    ],
    shippingAddress: 'Jakarta, Indonesia',
    paymentMethod: 'Bank Transfer',
    failureReason: 'Payment not received'
  },
  {
    id: 'ORD-2024-005',
    date: '2024-06-05',
    storeName: stores['Electronics'],
    storeId: 'store-5',
    status: 'completed',
    total: 259.98,
    items: [
      { 
        id: products[0].id, 
        name: products[0].name, 
        image: products[0].image, 
        quantity: 1, 
        price: products[0].price 
      },
      { 
        id: products[3].id, 
        name: products[3].name, 
        image: products[3].image, 
        quantity: 1, 
        price: products[3].price 
      },
      { 
        id: products[1].id, 
        name: products[1].name, 
        image: products[1].image, 
        quantity: 1, 
        price: products[1].price 
      }
    ],
    shippingAddress: 'Jakarta, Indonesia',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK555666777'
  }
];

const statusConfig = {
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Clock },
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'failed': { label: 'Failed', color: 'bg-red-100 text-red-800', icon: XCircle }
};

export default function MyOrdersPage() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const ordersPerPage = 5;

  const categories = ['Electronics', 'Fashion', 'Home', 'Office'];

  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      const searchMatch = searchTerm === '' || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const statusMatch = statusFilter === 'all' || order.status === statusFilter;

      const categoryMatch = categoryFilter === 'all' || 
        order.items.some(item => {
          const product = products.find(p => p.id === item.id);
          return product && product.category === categoryFilter;
        });

      const orderDate = new Date(order.date);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;
      
      const dateMatch = (!fromDate || orderDate >= fromDate) && 
                       (!toDate || orderDate <= toDate);

      return searchMatch && statusMatch && categoryMatch && dateMatch;
    });
  }, [searchTerm, statusFilter, categoryFilter, dateFrom, dateTo]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      });
    });
    alert(`${order.items.length} items added to cart!`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">My Orders</h1>
          <p className="text-amber-700">Track and manage your order history</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-amber-600" />
              <span className="text-lg font-semibold text-slate-800">Search & Filter</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
              <Input
                placeholder="Search by order ID, store name, or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-amber-300 focus:border-teal-400"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-amber-300 rounded-md focus:border-teal-400 focus:outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-amber-300 rounded-md focus:border-teal-400 focus:outline-none bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Date From */}
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border-amber-300 focus:border-teal-400"
              />

              {/* Date To */}
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border-amber-300 focus:border-teal-400"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Clear Filters
              </Button>
              <div className="text-sm text-amber-600 flex items-center">
                Showing {filteredOrders.length} of {mockOrders.length} orders
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {currentOrders.length === 0 ? (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
            <CardContent className="py-16 text-center">
              <Package className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-amber-900 mb-2">No Orders Found</h3>
              <p className="text-amber-700 mb-6">
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo
                  ? 'No orders match your current filters.'
                  : 'You haven\'t placed any orders yet.'}
              </p>
              <div className="space-x-4">
                {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || dateFrom || dateTo) && (
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Clear Filters
                  </Button>
                )}
                <Link to="/products">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shop Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {currentOrders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Package;
              
              return (
                <Card key={order.id} className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-4 lg:mb-0">
                        <div>
                          <div className="font-semibold text-amber-900 text-lg">{order.id}</div>
                          <div className="text-amber-600 text-sm">{formatDate(order.date)}</div>
                        </div>
                        <Badge className={`${statusConfig[order.status as keyof typeof statusConfig]?.color} flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[order.status as keyof typeof statusConfig]?.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-teal-600">${order.total.toFixed(2)}</div>
                        <div className="text-amber-600 text-sm flex items-center gap-1">
                          <Store className="h-3 w-3" />
                          {order.storeName}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 bg-amber-50 p-2 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded border border-amber-200"
                            />
                            <div>
                              <div className="font-medium text-amber-900 text-sm">{item.name}</div>
                              <div className="text-amber-600 text-xs">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-amber-700">
                        <MapPin className="h-4 w-4" />
                        <span>{order.shippingAddress}</span>
                      </div>
                      <div className="flex items-center gap-2 text-amber-700">
                        <CreditCard className="h-4 w-4" />
                        <span>{order.paymentMethod}</span>
                      </div>
                      {order.trackingNumber && (
                        <div className="flex items-center gap-2 text-amber-700">
                          <Truck className="h-4 w-4" />
                          <span>Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                      {order.failureReason && (
                        <div className="flex items-center gap-2 text-red-700">
                          <XCircle className="h-4 w-4" />
                          <span>{order.failureReason}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-amber-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReorder(order)}
                        className="border-teal-300 text-teal-700 hover:bg-teal-50"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                      {order.trackingNumber && order.status !== 'failed' && (
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page 
                    ? "bg-teal-500 hover:bg-teal-600 text-white" 
                    : "border-amber-300 text-amber-700 hover:bg-amber-50"
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Details - {selectedOrder.id}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                    className="text-amber-700"
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-amber-900">Order Date</div>
                    <div className="text-amber-700">{formatDate(selectedOrder.date)}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">Status</div>
                    <Badge className={`${statusConfig[selectedOrder.status as keyof typeof statusConfig]?.color} mt-1`}>
                      {statusConfig[selectedOrder.status as keyof typeof statusConfig]?.label}
                    </Badge>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">Store</div>
                    <div className="text-amber-700">{selectedOrder.storeName}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-900">Total</div>
                    <div className="text-teal-600 font-bold">${selectedOrder.total.toFixed(2)}</div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-amber-900 mb-2">Items Ordered</div>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded border border-amber-200"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-amber-900">{item.name}</div>
                          <div className="text-amber-600 text-sm">
                            ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={() => handleReorder(selectedOrder)}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(null)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}