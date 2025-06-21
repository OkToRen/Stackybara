import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle } from "lucide-react";

export type Order = {
  id: string;
  date: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'New' | 'Shipped' | 'Completed';
};

type OrderCardProps = {
  order: Order;
};

export function OrderCard({ order }: OrderCardProps) {
  const getStatusBadgeVariant = () => {
    switch (order.status) {
      case 'New':
        return 'default'; // Uses the default theme color (likely teal)
      case 'Shipped':
        return 'secondary'; // A muted/secondary color
      case 'Completed':
        return 'outline'; // An outline style
      default:
        return 'destructive'; // For canceled, etc.
    }
  };

  return (
    <Card className="border-amber-200">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div>
          <CardTitle className="text-base text-amber-900">Order #{order.id}</CardTitle>
          <p className="text-xs text-amber-700">{order.date}</p>
        </div>
        <Badge variant={getStatusBadgeVariant()}>{order.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="border-t border-amber-100 pt-4">
          <p className="text-sm font-medium text-amber-800 mb-2">Customer: {order.customerName}</p>
          <div className="space-y-1 mb-4">
            {order.items.map((item, index) => (
              <p key={index} className="text-sm text-amber-950">
                {item.quantity}x {item.name}
              </p>
            ))}
          </div>
          <div className="flex justify-between items-center border-t border-amber-100 pt-4">
            <div>
              <p className="text-xs text-amber-700">Total</p>
              <p className="font-bold text-lg text-amber-950">${order.total.toFixed(2)}</p>
            </div>
            {order.status === 'New' && (
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Truck className="h-4 w-4 mr-2" />
                Mark as Shipped
              </Button>
            )}
            {order.status === 'Shipped' && (
              <Button variant="outline" className="border-amber-300">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}