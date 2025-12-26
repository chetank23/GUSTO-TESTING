import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export { CartContext };

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const normalizeProduct = (product) => {
    const parsedPrice = typeof product.price === 'string'
      ? parseFloat(product.price.replace(/[^\d.]/g, ''))
      : Number(product.price);
    return {
      ...product,
      price: Number.isFinite(parsedPrice) ? parsedPrice : 0
    };
  };

  const addToCart = (product) => {
    const normalized = normalizeProduct(product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === normalized.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item =>
          item.id === normalized.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...normalized, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
