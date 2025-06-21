import Header from '@/components/Header';
import { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, ShoppingCart, RotateCcw, X } from 'lucide-react';
import { Product, useProduct } from '@/lib/ProductContext';
import { useCart } from '@/lib/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ProductDetailsPage(){
    const {product} = useProduct();
    const { addToCart, cart, decreaseFromCart } = useCart();
    const [cartMessage, setCartMessage] = useState<string | null>(null);
    const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setCartMessage(`${product.name} added to cart!`);
    setTimeout(() => setCartMessage(null), 2000);
  };
    return(
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
            <div className="container mx-auto px-4 py-8">
                {product ?(
                <div className="bg-white rounded-lg p-8 shadow text-center flex flex-col">
                    <div className='flex flex-row justify-start'>
                        <div className='flex flex-row w-fit'>
                        <img src={product.image} alt={product.name} className="rounded-lg w-80 h-auto object-contain border" />                      
                        </div>
                        <div className='flex flex-col justify-between mx-[1vw]  h-9/10'>
                            
                            <div className='w-max'>
                                <h2 className="text-2xl font-bold mb-2 justify-start w-fit">{product.name}</h2>
                                <p className="text-lg text-gray-700 mb-2 justify-start w-fit mt-[2vw]">${product.price}</p>
                                <p className="text-sm text-gray-500 mb-4 justify-start w-fit">{product.description}</p>                        
                            </div>
                                <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white "
                            onClick={() => handleAddToCart(product)}
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />Add to Cart
                        </Button>
                        </div>
                    </div>
                    
                    
                    
                </div>
                ):(
                <div className="bg-white rounded-lg p-8 shadow text-center">
                <p className="text-amber-700 mb-4">Failed to load selected product.</p>
                <Link to="/products">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">Products Page</Button>
                </Link>
                </div>
                )}
            </div>
            {/* Cart Message */}
            {cartMessage && (
              <div className="fixed top-4 right-4 bg-teal-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in">
                {cartMessage}
              </div>
            )}
        </div>        
    );
}