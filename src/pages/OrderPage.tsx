import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderCard, type Order } from '@/components/ui/ordercard';
import { Search, Inbox } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: Tab[] = ['New', 'Shipped', 'Completed', 'All'];

  const filteredOrders = allOrders
    .filter(order => {
      if (activeTab === 'All') return true;
      return order.status === activeTab;
    })
    .filter(order =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Manage Orders</h1>
          <p className="text-lg text-amber-700">View and process your incoming customer orders.</p>
        </div>

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

        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
            <Input
              placeholder="Search by Order ID or Customer Name..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-lg border border-amber-200">
              <Inbox className="mx-auto h-12 w-12 text-amber-400" />
              <h3 className="mt-2 text-lg font-medium text-amber-900">No orders found</h3>
              <p className="mt-1 text-sm text-amber-700">
                Your search did not match any orders in the "{activeTab}" status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
