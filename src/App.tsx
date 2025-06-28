import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import SellerLayout from './layout/SellerLayout';
import ProductsPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import ProductManagerPage from './pages/ProductManagerPage';
import OrderPage from './pages/OrderPage';
import StoreProfilePage from './pages/StoreProfilePage';
import { CartProvider } from './lib/CartContext';
import CartPage from './pages/CartPage';
import { ProductProvider } from './lib/ProductContext';
import { PrivateRoute } from './routes/PrivateRoute';
import CheckoutPage from './pages/CheckOutPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import PostUserLoginPage from './pages/PostUserLoginPage';
import LoadingScreen from './pages/LoadingScreen';
import ChatPage from './pages/ChatPage';
import ScrollToTop from './hooks/UseScrollToTop';

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                {/* <Route path="categories" element={<CategoriesPage />} /> */}
                <Route path="products" element={<ProductsPage />} />
                <Route path="productdetails" element={<ProductDetailsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="/postlogin" element={<PostUserLoginPage />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Route>

              <Route path="/order/:orderId" element={<OrderDetailPage />} />

              <Route path="/seller" element={<SellerLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="productmanager" element={<ProductManagerPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="profile" element={<StoreProfilePage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
