import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/statcard"; 
import { DollarSign, Package, ShoppingCart, Users, ArrowRight, TrendingUp, MoreHorizontal } from "lucide-react";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Period = 'Today' | 'This Month' | 'This Year';

export default function DashboardPage() {
  const [revenuePeriod, setRevenuePeriod] = useState<Period>('Today');
  const [customerPeriod, setCustomerPeriod] = useState<Period>('Today');

  const storeData = {
    name: "The Capy Store",
    ordersToProcess: 1,
    totalProducts: 5,
  };

  const revenueData: Record<Period, { value: string; change: string }> = {
    Today: { value: "Rp 1,350,000", change: "+10%" },
    'This Month': { value: "Rp 25,700,000", change: "+8%" },
    'This Year': { value: "Rp 150,250,000", change: "+15%" },
  };
  
  const customerData: Record<Period, { value: number; change: string }> = {
    Today: { value: 12, change: "+2" },
    'This Month': { value: 88, change: "+15" },
    'This Year': { value: 450, change: "+50" },
  };

  const recentOrders = [
    { id: 'A1B2C', customer: 'John Doe', amount: 89.99, status: 'New' },
    { id: 'D3E4F', customer: 'Jane Smith', amount: 49.98, status: 'Shipped' },
    { id: 'G5H6I', customer: 'Mike Chen', amount: 45.99, status: 'Completed' },
  ];

  const bestSellers = [
    { name: 'Wireless Headphones', orders: 15, revenue: 1349.85, image: 'https://placehold.co/40x40/a7f3d0/1e293b?text=H' },
    { name: 'Organic T-Shirt', orders: 12, revenue: 299.88, image: 'https://placehold.co/40x40/a7f3d0/1e293b?text=T' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">
            Welcome back, {storeData.name}!
          </h1>
          <p className="text-lg text-amber-700">
            Here's a snapshot of your store's performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Revenue</CardTitle>
              <select 
                value={revenuePeriod} 
                onChange={(e) => setRevenuePeriod(e.target.value as Period)}
                className="text-xs bg-transparent border-none p-1 rounded focus:ring-0"
              >
                <option>Today</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-950">{revenueData[revenuePeriod].value}</div>
              <p className="text-xs text-amber-700">{revenueData[revenuePeriod].change} from last period</p>
            </CardContent>
          </Card>
          
          <StatCard 
            title="Orders to Process" 
            value={storeData.ordersToProcess} 
            icon={ShoppingCart}
            description="Ready to be shipped"
          />
          <StatCard 
            title="Total Products" 
            value={storeData.totalProducts} 
            icon={Package}
            description="Currently listed for sale"
          />
          
           <Card className="border-amber-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Total Customers</CardTitle>
              <select 
                value={customerPeriod} 
                onChange={(e) => setCustomerPeriod(e.target.value as Period)}
                className="text-xs bg-transparent border-none p-1 rounded focus:ring-0"
              >
                <option>Today</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-950">{customerData[customerPeriod].value}</div>
              <p className="text-xs text-amber-700">{customerData[customerPeriod].change} new customers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-3 text-teal-600"/>
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-amber-100">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="font-semibold text-amber-950">{order.customer}</p>
                      <p className="text-sm text-amber-700">Order #{order.id}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold text-amber-950">${order.amount.toFixed(2)}</p>
                       <Badge variant={order.status === 'New' ? 'default' : 'secondary'} className={order.status === 'New' ? 'bg-teal-500' : ''}>
                         {order.status}
                       </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/seller/orders">
                <Button variant="outline" className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100">
                    View All Orders
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center">
                <TrendingUp className="h-5 w-5 mr-3 text-teal-600"/>
                Best Sellers
              </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="divide-y divide-amber-100">
                {bestSellers.map(product => (
                  <div key={product.name} className="flex items-center gap-4 py-3">
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-md" />
                    <div className="flex-1">
                      <p className="font-semibold text-amber-950">{product.name}</p>
                      <p className="text-sm text-amber-700">{product.orders} orders</p>
                    </div>
                    <p className="font-semibold text-amber-950">${product.revenue.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Link to="/seller/productmanager">
                <Button variant="outline" className="w-full mt-4 border-amber-300 text-amber-800 hover:bg-amber-100">
                    View All Products
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
