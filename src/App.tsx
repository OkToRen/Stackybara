import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import { ProductProvider } from './lib/ProductContext';
import { TicketProvider } from './lib/TicketContext';

import ScrollToTop from '@/hooks/UseScrollToTop';
import { PrivateRoute } from '@/routes/PrivateRoute';

// Layouts
import Layout from './layout/Layout';
import SellerLayout from './layout/SellerLayout';

// Public Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AboutPage from './pages/AboutPage';
import FeatureListPage from './pages/FeatureListPage';
import PostUserLoginPage from './pages/PostUserLoginPage';
import PageNotFound from './pages/PageNotFound';

// Protected User Pages
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import MyOrdersPage from './pages/MyOrdersPage';
import CheckoutPage from './pages/CheckOutPage';
import CartPage from './pages/CartPage';
import ChatRoomPage from './pages/ChatRoomPage';
import SupportPage from './pages/SupportPage';
import OrderDetailPage from './pages/OrderDetailPage';

// Seller Pages
import DashboardPage from './pages/DashboardPage';
import ProductManagerPage from './pages/ProductManagerPage';
import OrderPage from './pages/OrderPage';
import StoreProfilePage from './pages/StoreProfilePage';
import PostUserToSellerPage from './pages/PostUserToSellerPage';
import SellerProfilePage from './pages/SellerProfilePage';

function App() {
  return (
    <TicketProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public layout and routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="productdetails" element={<ProductDetailsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="features" element={<FeatureListPage />} />
                <Route path="postlogin" element={<PostUserLoginPage />} />
              </Route>

              {/* Protected user routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/chat" element={<ChatRoomPage />} />
                <Route
                  path="/chat/:sellerPrincipal"
                  element={<ChatRoomPage />}
                />
                <Route path="/support" element={<SupportPage />} />
              </Route>

              {/* Seller routes */}
              <Route path="/seller" element={<PrivateRoute />}>
                <Route index element={<DashboardPage />} />
                <Route path="productmanager" element={<ProductManagerPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="profile" element={<StoreProfilePage />} />
                <Route path="postseller" element={<PostUserToSellerPage />} />
              </Route>

              {/* Public seller profile */}
              <Route
                path="/seller/:sellerPrincipal"
                element={<SellerProfilePage />}
              />

              {/* Order Detail Route (accessible to both?) */}
              <Route path="/order/:orderId" element={<OrderDetailPage />} />

              {/* Fallback */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </ProductProvider>
      </CartProvider>
    </TicketProvider>
  );
}

export default App;
