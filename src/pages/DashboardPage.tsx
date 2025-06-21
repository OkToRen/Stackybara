import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/statcard";
import { DollarSign, Package, ShoppingCart, Users, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  // In a real app, this data would come from your backend canister
  const storeData = {
    name: "The Capy Store",
    ordersToProcess: 0,
    totalRevenue: "Rp 0",
    totalProducts: 5, // Example
    totalCustomers: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">
            Welcome back, {storeData.name}!
          </h1>
          <p className="text-lg text-amber-700">
            Here's a snapshot of your store's activity today.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard 
            title="Revenue (Today)" 
            value={storeData.totalRevenue} 
            icon={DollarSign}
            description="+0% from yesterday"
          />
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
          <StatCard 
            title="Total Customers" 
            value={storeData.totalCustomers} 
            icon={Users}
            description="Have purchased from you"
          />
        </div>

        {/* Quick Actions Card */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Link to="/seller/productmanager" className="w-full">
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                Manage My Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/seller/profile" className="w-full">
              <Button variant="outline" className="w-full border-amber-300 text-amber-800 hover:bg-amber-100">
                Edit Store Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}