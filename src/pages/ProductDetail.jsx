import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import Toast from '../components/Toast';
import ProductActionButtons from '../components/ProductActionButtons';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toasts, showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Product data - same products from home
  const products = [
    {
      id: 1,
      image: '/Products/Curry leaves chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Curry Leaves Chutney Powder',
      description: 'Sweet and tangy, perfect for your breakfast toast.',
      price: '₹649',
      originalPrice: '₹799',
      discount: '18%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Rich in Omega-3 Fatty Acids',
        'Boosts Heart Health',
        'High in Fiber',
        'Improves Digestion',
        'Supports Weight Management',
        'Helps Control Cholesterol',
        'Good Source of Plant Protein',
        'Packed with Antioxidants'
      ]
    },
    {
      id: 2,
      image: '/Products/Ragi millet mix-front.jpeg',
      badge: 'Natural',
      name: 'Ragi Millet Mix',
      description: 'No sugar, ready to drink & a hint of jaggery.',
      price: '₹1200',
      originalPrice: '₹1450',
      discount: '17%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'High in Calcium',
        'Promotes Bone Health',
        'Rich in Iron',
        'Improves Immunity',
        'Aids Digestion',
        'Natural Energy Boost',
        'Good for Weight Loss',
        'Packed with Nutrients'
      ]
    },
    {
      id: 3,
      image: '/Products/Moringa chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Moringa Chutney Powder',
      description: 'Crispy, crunchy, and full of value.',
      price: '₹899',
      originalPrice: '₹1099',
      discount: '18%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Super Food Benefits',
        'Rich in Vitamins',
        'Boosts Energy',
        'Improves Immunity',
        'Anti-inflammatory',
        'Detoxifies Body',
        'Supports Digestion',
        'Natural Antioxidant'
      ]
    },
    {
      id: 4,
      image: '/Products/Garlic Chilly Chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Garlic Chilly Chutney Powder',
      description: '100% pure natural powders in bottles.',
      price: '₹550',
      originalPrice: '₹700',
      discount: '21%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Boosts Immunity',
        'Aids Digestion',
        'Rich in Antioxidants',
        'Improves Blood Circulation',
        'Supports Heart Health',
        'Natural Flavor Enhancer',
        'High in Vitamins',
        'Antimicrobial Properties'
      ]
    },
    {
      id: 5,
      image: '/Products/Moringa Nutra Bar -30g.jpg',
      badge: 'Natural',
      name: 'Moringa Nutri Bar',
      description: 'A tasty and energetic treat for any time.',
      price: '₹150',
      originalPrice: '₹200',
      discount: '25%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'High in Protein',
        'Natural Energy',
        'Rich in Fiber',
        'Supports Digestion',
        'Great for Weight Loss',
        'Full of Vitamins',
        'Convenient Snack',
        'No Artificial Ingredients'
      ]
    },
    {
      id: 6,
      image: '/Products/Flaxseed chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Flaxseed Chutney Powder',
      description: 'Start your day with a blend of nuts, and fruit.',
      price: '₹110',
      originalPrice: '₹200',
      discount: '45%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Rich in Omega-3 Fatty Acids',
        'Boosts Heart Health',
        'High in Fiber',
        'Improves Digestion',
        'Supports Weight Management',
        'Helps Control Cholesterol',
        'Good Source of Plant Protein',
        'Packed with Antioxidants'
      ]
    },
    {
      id: 7,
      image: '/Products/Curry leaves chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Millet Idly & Dosa Mix',
      description: 'Traditional taste with healthy millet goodness.',
      price: '₹299',
      originalPrice: '₹399',
      discount: '25%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Rich in Protein',
        'Gluten-Free Option',
        'Easy to Digest',
        'High in Fiber',
        'Promotes Gut Health',
        'Low Glycemic Index',
        'Packed with Nutrients',
        'Traditional Recipe'
      ]
    },
    {
      id: 8,
      image: '/Products/Ragi millet mix-front.jpeg',
      badge: 'Natural',
      name: 'Millet Chikki',
      description: 'Crunchy and sweet, a perfect healthy snack.',
      price: '₹180',
      originalPrice: '₹250',
      discount: '28%',
      features: ['100% Organic', 'No Preservatives'],
      benefits: [
        'Natural Sweetness',
        'Rich in Iron',
        'Good for Bones',
        'Energy Booster',
        'No Refined Sugar',
        'High in Protein',
        'Crunchy Texture',
        'Healthy Snacking'
      ]
    }
  ];

  const product = products.find(p => p.id === parseInt(id));

  // Effect to handle product changes dynamically
  useEffect(() => {
    // Simulate loading state
    setIsLoading(true);
    // Ensure page starts at top when opening a product
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Simulate network request delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }

  const handleQuantityChange = (value) => {
    if (value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.replace('₹', '')),
      image: product.image
    };
    
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(cartProduct);
    }
    
    showToast(`✓ ${quantity} x ${product.name} has been added to your cart!`, 'success');
    setQuantity(1); // Reset quantity after adding to cart
  };

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} x ${product.name}`);
  };

  // Get similar products (exclude current product)
  const similarProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 4);

  return (
    <div className="product-detail">
      <Toast toasts={toasts} />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      )}

      <section className="product-detail-section" style={{ opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.3s ease' }}>
        <div className="product-detail-container">
          {/* Product Image */}
          <div className="product-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="thumbnail-images">
              <img src={product.image} alt="Thumbnail 1" className="thumbnail active" loading="lazy" />
              <img src={product.image} alt="Thumbnail 2" className="thumbnail" loading="lazy" />
              <img src={product.image} alt="Thumbnail 3" className="thumbnail" loading="lazy" />
            </div>
          </div>

          {/* Product Details */}
          <div className="product-info-section">
            {/* Title */}
            <h1 className="product-title">{product.name}</h1>

            {/* Price */}
            <div className="price-section">
              <span className="current-price">{product.price}</span>
              <span className="original-price">{product.originalPrice}</span>
              <span className="discount-badge">{product.discount} OFF</span>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <button className="qty-btn" onClick={() => handleQuantityChange(quantity - 1)}>−</button>
              <span className="qty-display">{quantity}</span>
              <button className="qty-btn" onClick={() => handleQuantityChange(quantity + 1)}>+</button>
            </div>

            {/* Buttons */}
            <ProductActionButtons
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isLoading={isLoading}
            />

            {/* Features */}
            <div className="features-section">
              {product.features.map((feature, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-icon-wrapper">
                    {feature === '100% Organic' && (
                      <img src="/Icons/Icon.png" alt="100% Organic" className="feature-icon" />
                    )}
                    {feature === 'No Preservatives' && (
                      <img src="/Icons/Icon2 .png" alt="No Preservatives" className="feature-icon" />
                    )}
                  </div>
                  <span className="feature-text">{feature}</span>
                </div>
              ))}
            </div>

            {/* Health Benefits */}
            <div className="health-benefits">
              <h3>HEALTH BENEFITS</h3>
              <ul className="benefits-list">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx}>• {benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      <section className="similar-products-section">
        <h2 className="section-title">Similar Products</h2>
        <div className="similar-products-grid">
          {similarProducts.map(p => (
            <div 
              key={p.id} 
              className="similar-product-card"
              onClick={() => navigate(`/product/${p.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="similar-product-image">
                <span className="similar-badge">{p.badge}</span>
                <img src={p.image} alt={p.name} />
              </div>
              <h4 className="similar-product-name">{p.name}</h4>
              <p className="similar-product-desc">{p.description}</p>
              <div className="similar-product-footer">
                <span className="similar-price">{p.price}</span>
                <button className="similar-add-btn" onClick={(e) => {
                  e.stopPropagation();
                  addToCart({
                    ...p,
                    price: parseFloat(p.price.replace(/[^\d.]/g, ''))
                  });
                  showToast(`✓ ${p.name} has been added to your cart!`);
                }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
