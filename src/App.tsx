import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import ProductsPage from './pages/ProductPage';
// import motokoLogo from './assets/motoko_moving.png';
// import motokoShadowLogo from './assets/motoko_shadow.png';
// import reactLogo from './assets/react.svg';
// import viteLogo from './assets/vite.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} /> 
          </Route>

          {/* <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<div>Categories Page</div>} />
          <Route path="/about" element={<div>About Page</div>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
