import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PlusCircle, ArrowLeft, UploadCloud, X, Inbox, Pencil, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
};

const initialSellerProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 89.99,
    stock: 50,
    image: 'https://placehold.co/200x200/a7f3d0/1e293b?text=Headphones'
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    stock: 120,
    image: 'https://placehold.co/200x200/a7f3d0/1e293b?text=T-Shirt'
  },
  {
    id: 3,
    name: 'Ergonomic Laptop Stand',
    price: 45.99,
    stock: 0,
    image: 'https://placehold.co/200x200/a7f3d0/1e293b?text=Stand'
  },
  {
    id: 4,
    name: 'Washing Machine',
    price: 499.99,
    stock: 15,
    image: 'https://placehold.co/200x200/a7f3d0/1e293b?text=Washer'
  },
  {
    id: 5,
    name: 'Windows 11 Pro Key',
    price: 129.99,
    stock: 200,
    image: 'https://placehold.co/200x200/a7f3d0/1e293b?text=Windows'
  }
];

export default function ProductManagerPage() {
  const [sellerProducts, setSellerProducts] = useState(initialSellerProducts);
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const filteredProducts = sellerProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    setStock('');
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setEditingProduct(null);
  };

  const handleShowAddForm = () => {
    clearForm();
    setView('form');
  };

  const handleShowEditForm = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setDescription('');
    setImage(null);
    setImagePreview(product.image);
    setView('form');
  };

  const handleShowListView = () => {
    clearForm();
    setView('list');
  };

  const handleSubmit = () => {
    if (!name || !price || !stock) {
      alert('Please fill out all fields.');
      return;
    }
    
    if (editingProduct) {
      console.log('Updating product:', { id: editingProduct.id, name, description, price, stock, newImage: image?.name });
      setSellerProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === editingProduct.id 
            ? { ...p, name, price: parseFloat(price), stock: parseInt(stock), image: imagePreview || p.image } 
            : p
        )
      );
    } else {
      if (!image) {
        alert('Please upload an image for the new product.');
        return;
      }
      const newId = Math.max(...sellerProducts.map(p => p.id), 0) + 1;
      console.log('Adding new product:', { id: newId, name, description, price, stock, imageName: image.name });
      setSellerProducts(prev => [
        ...prev, 
        { id: newId, name, price: parseFloat(price), stock: parseInt(stock), image: imagePreview || '' }
      ]);
    }
    handleShowListView();
  };

  const handleDelete = (product: Product) => {
    console.log(`Deleting product with ID: ${product.id}`);
    setSellerProducts(prev => prev.filter(p => p.id !== product.id));
    setDeletingProduct(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="container mx-auto">
        
        {view === 'list' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-900">My Products</h1>
              <p className="text-lg text-amber-700">Manage, add, and update your product listings.</p>
            </div>
            <Card className="mb-6 border-amber-200 p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1 relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                  <Input 
                    placeholder="Search by product name..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={handleShowAddForm} className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" /> Add Product
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-5 gap-4 items-center p-4">
                      <div className="col-span-2 font-medium text-amber-950 flex items-center gap-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                        <span>{product.name}</span>
                      </div>
                      <div>${product.price.toFixed(2)}</div>
                      <div className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                      </div>
                      <div className="text-right flex justify-end gap-2">
                        <Button onClick={() => handleShowEditForm(product)} variant="ghost" size="icon" className="h-8 w-8 text-amber-700 hover:text-teal-600">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => setDeletingProduct(product)} variant="ghost" size="icon" className="h-8 w-8 text-amber-700 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 text-amber-700">
                    <Inbox className="mx-auto h-10 w-10 text-amber-400 mb-2" />
                    <p className="font-medium">No products found</p>
                    <p className="text-sm">Your search for "{searchQuery}" did not match any products.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'form' && (
          <div>
            <Button onClick={handleShowListView} variant="ghost" className="mb-4 text-amber-800 hover:text-amber-950">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Product List
            </Button>
            <Card className="max-w-2xl mx-auto border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">{editingProduct ? 'Edit Product' : 'Add a New Product'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="font-medium text-amber-800">Product Image</label>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Product preview" className="w-full h-48 object-cover rounded-lg" />
                      <label htmlFor="image-upload" className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-amber-100 border border-amber-200">
                        <Pencil className="h-4 w-4 text-teal-600" />
                        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-dashed rounded-lg cursor-pointer bg-amber-50 hover:bg-amber-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-2 text-amber-600" />
                        <p className="mb-2 text-sm text-amber-700"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-amber-600">PNG, JPG</p>
                      </div>
                      <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  )}
                </div>
                
                <div className="space-y-2"><label htmlFor="name" className="font-medium text-amber-800">Product Name</label><Input id="name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div className="space-y-2"><label htmlFor="description" className="font-medium text-amber-800">Description</label><Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label htmlFor="price" className="font-medium text-amber-800">Price ($)</label><Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
                  <div className="space-y-2"><label htmlFor="stock" className="font-medium text-amber-800">Stock</label><Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} /></div>
                </div>
                <Button onClick={handleSubmit} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  {editingProduct ? 'Save Changes' : 'Confirm and Add Product'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {deletingProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="max-w-sm bg-amber-50/90 backdrop-blur-lg border-amber-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-amber-900">Confirm Deletion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800">Are you sure you want to delete the product "{deletingProduct.name}"? This action cannot be undone.</p>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="ghost" className="text-amber-800 hover:bg-amber-100" onClick={() => setDeletingProduct(null)}>Cancel</Button>
                  <Button variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleDelete(deletingProduct)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
}
