import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import motokoLogo from './assets/motoko_moving.png';
// import motokoShadowLogo from './assets/motoko_shadow.png';
// import reactLogo from './assets/react.svg';
// import viteLogo from './assets/vite.svg';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
