import Header from '@/components/Header';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-6">Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow text-center">
            <p className="text-amber-700 mb-4">Your cart is empty.</p>
            <Link to="/products">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">Shop Products</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <ul className="divide-y divide-amber-100 mb-6">
              {cart.map(item => (
                <li key={item.id} className="flex items-center py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4 border border-amber-200" />
                  <div className="flex-1">
                    <div className="font-semibold text-amber-900">{item.name}</div>
                    <div className="text-amber-700 text-sm flex items-center gap-2">
                      ${item.price} x
                      <Button size="sm" variant="outline" className="px-2 py-0" onClick={() => decreaseFromCart(item.id)}>-</Button>
                      <span className="mx-1">{item.quantity}</span>
                      <Button size="sm" variant="outline" className="px-2 py-0" onClick={() => addToCart({id: item.id, name: item.name, price: item.price, image: item.image})}>+</Button>
                    </div>
                  </div>
                  <div className="font-bold text-amber-900 ml-4">${(item.price * item.quantity).toFixed(2)}</div>
                  <Button size="sm" variant="ghost" className="ml-4 text-red-500" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-amber-900">Total:</span>
              <span className="text-xl font-bold text-teal-600">${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
