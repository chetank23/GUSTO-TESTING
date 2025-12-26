import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ 
  id,
  image, 
  badge, 
  name, 
  description, 
  price, 
  onAddToCart 
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card-container" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Badge */}
      {badge && <span className="product-badge">{badge}</span>}

      {/* Product Image */}
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" loading="lazy" />
      </div>

      {/* Product Details */}
      <div className="product-details">
        {/* Product Name */}
        <h3 className="product-name">{name}</h3>

        {/* Product Description */}
        <p className="product-description">{description}</p>

        {/* Price and Add to Cart */}
        <div className="product-footer">
          <span className="product-price">{price}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
