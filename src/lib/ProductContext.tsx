import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  sellerPrincipal: string;
};

interface ProductContextType{
    product: Product | null;
    setProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({children} : { children: ReactNode}){
    const [product, setProduct] = useState<Product | null>(null);

    return(
        <ProductContext.Provider value={{product, setProduct}}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProduct(){
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be used within a ProductProvider');
  return ctx;
}