import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { AddressProvider } from './context/AddressContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Account from './pages/Account'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import Search from './pages/Search'
import AddAddress from './pages/AddAddress'
import EditAddress from './pages/EditAddress'
import './App.css'

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname === '/' || location.pathname === '/cart';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/edit-address/:id" element={<EditAddress />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AddressProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AddressProvider>
    </CartProvider>
  )
}

export default App
