import { useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, PlusCircle, ArrowLeft, UploadCloud, X, Inbox, Pencil, Trash2, Filter, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { backend } from '@/declarations/backend';
import { useAuthContext } from '@/lib/AuthContext';
import { Store } from '@/declarations/backend/backend.did';
import { useLoading } from '@/hooks/UseLoading';
import { Product } from '@/declarations/backend/backend.did';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';
type StockFilter = 'all' | 'in-stock' | 'out-of-stock' | 'low-stock';


// const getStoreId = async (): Promise<number | undefined> => {
//   const response = await backend.getStoreProfile(auth.principal);
//   const store = Array.isArray(response) ? response[0] : undefined;
//   setStore(store);
//   return store?.storeId;
// }


export default function ProductManagerPage() {
  const [sellerProducts, setSellerProducts] = useState<Product[] | undefined>();
  const [view, setView] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [priceRangeMin, setPriceRangeMin] = useState('');
  const [priceRangeMax, setPriceRangeMax] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(Number);
  const [stock, setStock] = useState(Number);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [store, setStore] = useState<Store>();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const auth = useAuthContext();
  const loading = useLoading();

  useEffect(() => {
    if (auth?.principal) {
      fetchStoreProducts();
    }
  }, [auth?.principal]);

  const getStoreId = async (): Promise<number | undefined> => {
    const response = await backend.getStoreProfile(auth.principal);
    const store = Array.isArray(response) ? response[0] : undefined;
    setStore(store);
    return store?.storeId;
  }

  const fetchStoreProducts = useCallback(() => {
    return loading.withLoading(async () => {
      let id = await getStoreId();
      if (id != undefined) {
        const response = await backend.getMyProducts(auth.principal, id)
        const products = Array.isArray(response) ? response : undefined;
        console.log(products)
        if (products != undefined && Array.isArray(products)) {
          setSellerProducts(products as Product[])
        }
      }
      else {
        console.log('fail fetch products');
      }
    });
  }, [loading]);





  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = sellerProducts?.filter(product => {
      // Text search
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Stock filter
      let matchesStock = true;
      switch (stockFilter) {
        case 'in-stock':
          matchesStock = product.stock > 0;
          break;
        case 'out-of-stock':
          matchesStock = product.stock === 0;
          break;
        case 'low-stock':
          matchesStock = product.stock > 0 && product.stock <= 10;
          break;
        default:
          matchesStock = true;
      }

      // Price range filter
      const minPrice = priceRangeMin ? parseFloat(priceRangeMin) : 0;
      const maxPrice = priceRangeMax ? parseFloat(priceRangeMax) : Infinity;
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesStock && matchesPrice;
    });

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const clearAllFilters = () => {
    setSearchQuery('');
    setSortBy('name-asc');
    setStockFilter('all');
    setPriceRangeMin('');
    setPriceRangeMax('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (stockFilter !== 'all') count++;
    if (priceRangeMin || priceRangeMax) count++;
    if (sortBy !== 'name-asc') count++;
    return count;
  };

  const getStockBadgeColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800 border-red-200';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getStockText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 10) return `${stock} left (Low Stock)`;
    return `${stock} in stock`;
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const base64String = await toBase64(file)
      setImagePreview(base64String);
    }
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice(0);
    setStock(0);
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
    setPrice(0);
    setStock(0);
    setDescription('');
    setImage(null);
    setImagePreview(product.image);
    setView('form');
  };

  const handleShowListView = () => {
    clearForm();
    setView('list');
  };


  const handleSubmit = async () => {
    if (!name || !price || !stock) {
      alert('Please fill out all fields.');
      return;
    }

    if (editingProduct) {
      console.log('Updating product:', { id: editingProduct.productId, name, description, price, stock, newImage: image?.name });
      setSellerProducts(prevProducts =>
        prevProducts?.map(p =>
          p.productId === editingProduct.productId
            ? { ...p, name, price: price, stock: stock, image: imagePreview || p.image }
            : p
        )
      );
    } else {
      if (!image) {
        alert('Please upload an image for the new product.');
        return;
      }
      console.log('Adding new product:', { name, description, imagePreview, price, stock });

      // backend product
      let id = await getStoreId();
      if (id != undefined && imagePreview !== null) {
        backend.createProduct(auth.principal, id, name, description, imagePreview, price, stock)
      }
    }
    handleShowListView();
  };

  const handleDelete = (product: Product) => {
    console.log(`Deleting product with ID: ${product.productId}`);
    setSellerProducts(prev => prev?.filter(p => p.productId !== product.productId));
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

            {/* Search and Filter Controls */}
            <Card className="mb-6 border-amber-200">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 h-4 w-4" />
                    <Input
                      placeholder="Search by product name..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Quick Sort */}
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900 focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                      <option value="stock-asc">Stock (Low to High)</option>
                      <option value="stock-desc">Stock (High to Low)</option>
                    </select>

                    <Button
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="border-amber-300 text-amber-800 hover:bg-amber-100 relative"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {getActiveFiltersCount() > 0 && (
                        <Badge className="ml-2 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {getActiveFiltersCount()}
                        </Badge>
                      )}
                    </Button>

                    <Button onClick={handleShowAddForm} className="bg-teal-500 hover:bg-teal-600 text-white">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Product
                    </Button>
                  </div>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="mt-6 pt-6 border-t border-amber-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Stock Filter */}
                      <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">Stock Status</label>
                        <select
                          value={stockFilter}
                          onChange={(e) => setStockFilter(e.target.value as StockFilter)}
                          className="w-full px-3 py-2 border border-amber-300 rounded-md bg-white text-amber-900 focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="all">All Products</option>
                          <option value="in-stock">In Stock</option>
                          <option value="out-of-stock">Out of Stock</option>
                          <option value="low-stock">Low Stock (≤10)</option>
                        </select>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-amber-800 mb-2">Price Range ($)</label>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={priceRangeMin}
                            onChange={(e) => setPriceRangeMin(e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={priceRangeMax}
                            onChange={(e) => setPriceRangeMax(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <div className="flex items-end">
                        <Button
                          variant="outline"
                          onClick={clearAllFilters}
                          className="w-full border-amber-300 text-amber-800 hover:bg-amber-100"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear All Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="mb-4 flex justify-between items-center">
              <p className="text-amber-700">
                Showing {filteredProducts?.length} of {sellerProducts?.length} products
              </p>
              {getActiveFiltersCount() > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {searchQuery && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-amber-900">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {stockFilter !== 'all' && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {stockFilter === 'in-stock' ? 'In Stock' :
                        stockFilter === 'out-of-stock' ? 'Out of Stock' : 'Low Stock'}
                      <button onClick={() => setStockFilter('all')} className="ml-1 hover:text-amber-900">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {(priceRangeMin || priceRangeMax) && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      ${priceRangeMin || '0'} - ${priceRangeMax || '∞'}
                      <button onClick={() => { setPriceRangeMin(''); setPriceRangeMax(''); }} className="ml-1 hover:text-amber-900">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border border-amber-200">
              <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-amber-800 p-4 border-b border-amber-200">
                <div className="col-span-2">PRODUCT</div>
                <div>PRICE</div>
                <div className="col-span-2">STOCK STATUS</div>
                <div className="text-right">ACTIONS</div>
              </div>
              <div className="divide-y divide-amber-100">
                {filteredProducts != undefined && filteredProducts.length > 0 ? (
                  filteredProducts?.map((product) => (
                    <div key={product.productId} className="grid grid-cols-6 gap-4 items-center p-4">
                      <div className="col-span-2 font-medium text-amber-950 flex items-center gap-3">
                        <span>{product.name}</span>
                      </div>
                      <div className="font-semibold">${product.price.toFixed(2)}</div>
                      <div className="col-span-2">
                        <Badge className={`${getStockBadgeColor(product.stock)} border`}>
                          {getStockText(product.stock)}
                        </Badge>
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
                    <p className="text-sm">
                      {searchQuery || stockFilter !== 'all' || priceRangeMin || priceRangeMax
                        ? 'Try adjusting your filters or search terms.'
                        : 'Start by adding your first product.'}
                    </p>
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

                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium text-amber-800">Product Name</label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="font-medium text-amber-800">Description</label>
                  <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="price" className="font-medium text-amber-800">Price ($)</label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="stock" className="font-medium text-amber-800">Stock</label>
                    <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.valueAsNumber)} />
                  </div>
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