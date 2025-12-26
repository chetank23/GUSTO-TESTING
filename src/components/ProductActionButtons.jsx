import './ProductActionButtons.css';

export default function ProductActionButtons({ onAddToCart, onBuyNow, isLoading = false }) {
  return (
    <div className="product-action-buttons">
      <button
        className="product-action-btn product-action-add"
        onClick={onAddToCart}
        disabled={isLoading}
      >
        Add to Cart
      </button>
      <button
        className="product-action-btn product-action-buy"
        onClick={onBuyNow}
        disabled={isLoading}
      >
        Buy Now
      </button>
    </div>
  );
}

