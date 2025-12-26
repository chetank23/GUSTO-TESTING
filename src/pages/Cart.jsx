import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 5.00 : 0;
  const tax = (subtotal * 0.08);
  const grandTotal = (parseFloat(subtotal) + shipping + parseFloat(tax));

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-subtitle">Review your items before proceeding to checkout.</p>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon-wrapper">
              <svg className="cart-icon" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 95C38.685 95 36 97.685 36 101C36 104.315 38.685 107 42 107C45.315 107 48 104.315 48 101C48 97.685 45.315 95 42 95Z" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M82 95C78.685 95 76 97.685 76 101C76 104.315 78.685 107 82 107C85.315 107 88 104.315 88 101C88 97.685 85.315 95 82 95Z" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 15H24L35.6 70.59C36.1778 73.3326 37.6738 75.7908 39.8393 77.5684C42.0047 79.3461 44.708 80.3303 47.5 80.36H79.7C82.4929 80.3319 85.1975 79.3487 87.3637 77.5709C89.5299 75.793 91.0267 73.3343 91.605 70.591L97 41H28" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="92" cy="28" r="12" fill="#ff8f38" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="empty-cart-title">Your Cart Is Currently Empty!</h2>
            <p className="empty-cart-text">
              Before proceed to checkout you must add some products to your shopping cart.<br />
              You will find a lot of interesting products on our "Shop" page.
            </p>
            <button className="btn-return-shop" onClick={() => navigate('/')}>
              Return To Shop
            </button>
          </div>
        ) : (
          <div className="cart-content-wrapper">
            {/* Order Summary - Left Side */}
            <div className="order-summary-card">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">Subtotal</span>
                  <span className="summary-value">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Tax</span>
                  <span className="summary-value">₹{tax.toFixed(2)}</span>
                </div>
                <div className="summary-row grand-total-row">
                  <span className="summary-label">Grand Total</span>
                  <span className="summary-value grand-total">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="discount-code-section">
                <label className="discount-label">Discount Code</label>
                <div className="discount-input-wrapper">
                  <input 
                    type="text"
                    placeholder="Enter coupon code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="discount-input"
                  />
                  <button className="apply-btn">Apply</button>
                </div>
              </div>

              <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>

              <button className="continue-shopping-link" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>

            {/* Cart Items Table - Right Side */}
            <div className="cart-items-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th className="th-product">Product</th>
                    <th className="th-price">Price</th>
                    <th className="th-quantity">Quantity</th>
                    <th className="th-total">Total</th>
                    <th className="th-action"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="cart-item-row">
                      <td className="td-product">
                        <div className="product-cell">
                          <img src={item.image} alt={item.name} className="product-thumbnail" />
                          <div className="product-info">
                            <p className="product-name">{item.name}</p>
                            <p className="product-weight">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="td-price">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="td-quantity">
                        <div className="quantity-selector">
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.quantity}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="td-total">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="td-action">
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mobile-checkout-bar">
          <div className="mobile-total">
            <span className="mobile-total-label">Total</span>
            <span className="mobile-total-value">₹{grandTotal.toFixed(2)}</span>
          </div>
          <button className="mobile-checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
