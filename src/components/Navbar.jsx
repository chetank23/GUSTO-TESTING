import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import SearchBar from './SearchBar';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogoClick = () => {
    navigate('/');
    setMenuOpen(false);
  };

  const handleAccountClick = () => {
    navigate('/account');
    setMenuOpen(false);
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
    setMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'My Orders', to: '/my-orders' },
    { label: 'Account', to: '/account' },
  ];

  const handleNavClick = (to) => {
    navigate(to);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Logo */}
          <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/Gusto.png" alt="Gusto Logo" className="logo-image" />
          </div>
        </div>

        {/* Desktop Search */}
        <div className="navbar-search desktop-only">
          <SearchBar />
        </div>

        {/* Right Icons */}
        <div className="navbar-icons">
          <button className="icon-btn desktop-account" onClick={handleAccountClick} aria-label="Account">
            <FiUser className="icon" />
          </button>
          <button className="icon-btn cart-btn" onClick={() => navigate('/cart')} aria-label="Cart">
            <FiShoppingCart className="icon" />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
          <button
            className="icon-btn hamburger-btn"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMenuOpen(false)}>
          <div className="mobile-drawer open" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-content">
              <div className="mobile-links">
                {navLinks.map(link => (
                  <button
                    key={link.to}
                    className="mobile-link"
                    onClick={() => handleNavClick(link.to)}
                  >
                    {link.label}
                  </button>
                ))}
                <button className="mobile-link logout-link" onClick={handleLogout}>
                  <FiLogOut className="logout-icon" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="search-overlay">
          <div className="search-overlay-inner">
            <div className="search-overlay-header">
              <button className="icon-btn" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <FiX className="icon" />
              </button>
              <span className="search-overlay-title">Search</span>
            </div>
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
}
