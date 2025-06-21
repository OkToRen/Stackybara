import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import SellerLayout from './layout/SellerLayout';
import ProductsPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import DashboardPage from './pages/DashboardPage';
import ProductManagerPage from './pages/ProductManagerPage';
import OrderPage from './pages/OrderPage';
import StoreProfilePage from './pages/StoreProfilePage';
import { CartProvider } from './lib/CartContext';
import CartPage from './pages/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              {/* <Route path="categories" element={<CategoriesPage />} /> */}
              <Route path="products" element={<ProductsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route path="/seller/" element={<SellerLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="productmanager" element={<ProductManagerPage />} />
              <Route path="orders" element={<OrderPage />} />
              <Route path="profile" element={<StoreProfilePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
