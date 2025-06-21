// src/pages/seller/OrderPage.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderCard, type Order } from '@/components/ui/ordercard';
import { Search, Inbox } from 'lucide-react';

// Sample Data: This would come from your backend canister
const allOrders: Order[] = [
  {
    id: 'A1B2C',
    date: '21 June 2025',
    customerName: 'John Doe',
    items: [{ name: 'Wireless Bluetooth Headphones', quantity: 1 }],
    total: 89.99,
    status: 'New',
  },
  {
    id: 'Z1B2C',
    date: '21 June 2025',
    customerName: 'John BO',
    items: [{ name: 'Wireless Bluetooth Headphones', quantity: 1 }],
    total: 199.99,
    status: 'New',
  },
  {
    id: 'Z5B2C',
    date: '21 June 2025',
    customerName: 'John AB',
    items: [{ name: 'Wireless Bluetooth Headphones', quantity: 1 }],
    total: 29.99,
    status: 'New',
  },
  {
    id: 'D3E4F',
    date: '20 June 2025',
    customerName: 'Jane Smith',
    items: [{ name: 'Organic Cotton T-Shirt', quantity: 2 }],
    total: 49.98,
    status: 'Shipped',
  },
  {
    id: 'D5E4F',
    date: '20 June 2025',
    customerName: 'Jane DOE',
    items: [{ name: 'Organic Cotton T-Shirt', quantity: 2 }],
    total: 299.98,
    status: 'Shipped',
  },
  {
    id: 'G5H6I',
    date: '18 June 2025',
    customerName: 'Mike Chen',
    items: [{ name: 'Ergonomic Laptop Stand', quantity: 1 }],
    total: 45.99,
    status: 'Completed',
  },
];

type Tab = 'New' | 'Shipped' | 'Completed' | 'All';

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<Tab>('New');

  const tabs: Tab[] = ['New', 'Shipped', 'Completed', 'All'];

  const filteredOrders = allOrders.filter(order => {
    if (activeTab === 'All') return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Manage Orders</h1>
          <p className="text-lg text-amber-700">View and process your incoming customer orders.</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-amber-200 mb-6">
          <div className="flex space-x-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab 
                  ? 'border-b-2 border-teal-500 text-teal-600' 
                  : 'text-amber-700 hover:text-amber-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
          ) : (
            // Empty State View
            <div className="text-center py-16 px-6 bg-white rounded-lg border border-amber-200">
              <Inbox className="mx-auto h-12 w-12 text-amber-400" />
              <h3 className="mt-2 text-lg font-medium text-amber-900">No orders here</h3>
              <p className="mt-1 text-sm text-amber-700">
                You currently have no orders in the "{activeTab}" status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}