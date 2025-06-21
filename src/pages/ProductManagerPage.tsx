// src/pages/seller/ProductManagerPage.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PlusCircle, Settings, ArrowLeft, UploadCloud, X } from "lucide-react";

// Sample Data: In a real app, this would come from a backend call
const sellerProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    stock: 50,
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    stock: 120,
  },
  {
    id: 3,
    name: 'Ergonomic Laptop Stand',
    price: 45.99,
    stock: 0,
  },
];

export default function ProductManagerPage() {
  // State to control which view we are showing: the list or the form.
  const [view, setView] = useState('list'); // 'list' or 'form'

  // State for the form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // Clean up the object URL
    }
    setImagePreview(null);
  };

  const handleShowAddForm = () => {
    setView('form');
  };

  const handleShowListView = () => {
    clearForm();
    setView('list');
  };

  const handleSubmitProduct = () => {
    if (!name || !price || !image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    console.log('Adding new product:', { name, description, price, imageName: image.name });
    // In a real app, you would handle the file upload to the backend here.
    // After a successful submission, switch back to the list view.
    handleShowListView();
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        
        {/* CONDITIONAL RENDERING: Show either the List View or the Form View */}
        {view === 'list' ? (
          
          // --- 1. THE LIST VIEW ---
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-900">My Products</h1>
              <p className="text-lg text-amber-700">Manage, add, and update your product listings.</p>
            </div>

            <Card className="mb-6 border-amber-200 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                  <Input placeholder="Search by product name..." className="pl-10" />
                </div>
                <Button onClick={handleShowAddForm} className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </Card>

            <div className="bg-white rounded-lg shadow-sm border border-amber-200">
              <div className="grid grid-cols-5 gap-4 font-semibold text-sm text-amber-800 p-4 border-b border-amber-200">
                <div className="col-span-2">PRODUCT</div>
                <div>PRICE</div>
                <div>STOCK</div>
                <div className="text-right">ACTIONS</div>
              </div>
              <div className="divide-y divide-amber-100">
                {sellerProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-5 gap-4 items-center p-4">
                    <div className="col-span-2 font-medium text-amber-950">{product.name}</div>
                    <div>${product.price.toFixed(2)}</div>
                    <div className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm"><Settings className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        ) : (

          // --- 2. THE ADD PRODUCT FORM VIEW ---
          <div>
            <Button onClick={handleShowListView} variant="ghost" className="mb-4 text-amber-800 hover:text-amber-950">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Product List
            </Button>
            <Card className="max-w-2xl mx-auto border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Add a New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="font-medium text-amber-800">Product Image</label>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-lg" />
                      <Button onClick={() => { setImage(null); setImagePreview(null); }} size="icon" variant="destructive" className="absolute top-2 right-2 h-7 w-7">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-amber-600" />
                        <p className="mb-2 text-sm text-amber-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-amber-600">PNG, JPG or GIF</p>
                      </div>
                      <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium text-amber-800">Product Name</label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Wireless Headphones" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="font-medium text-amber-800">Description</label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="font-medium text-amber-800">Price ($)</label>
                  <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 89.99" />
                </div>
                <Button onClick={handleSubmitProduct} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Confirm and Add Product
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
