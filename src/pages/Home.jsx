import { useState, useEffect } from 'react';
import { FiFilter, FiMapPin, FiChevronDown, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAddresses } from '../context/AddressContext';
import { useToast } from '../components/Toast';
import Toast from '../components/Toast';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const { addToCart } = useCart();
  const { addresses } = useAddresses();
  const { toasts, showToast } = useToast();
  const [priceRange, setPriceRange] = useState([100, 900]);
  const [appliedPriceRange, setAppliedPriceRange] = useState([100, 900]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  
  // Get delivery address from localStorage or default
  const [selectedDeliveryAddressId, setSelectedDeliveryAddressId] = useState(() => {
    const saved = localStorage.getItem('deliveryAddressId');
    return saved ? parseInt(saved) : null;
  });

  const deliveryAddress = addresses.find(addr => addr.id === selectedDeliveryAddressId) 
    || addresses.find(addr => addr.isDefault) 
    || addresses[0];

  // Save to localStorage when delivery address changes
  useEffect(() => {
    if (deliveryAddress) {
      localStorage.setItem('deliveryAddressId', deliveryAddress.id.toString());
    }
  }, [deliveryAddress]);

  const handleSelectAddress = (addressId) => {
    setSelectedDeliveryAddressId(addressId);
    setAddressModalOpen(false);
  };

  const products = [
    {
      id: 1,
      image: '/Products/Curry leaves chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Curry Leaves Chutney Powder',
      description: 'Sweet and tangy, perfect for your breakfast toast.',
      price: '₹649'
    },
    {
      id: 2,
      image: '/Products/Ragi millet mix-front.jpeg',
      badge: 'Natural',
      name: 'Ragi Millet Mix',
      description: 'No sugar, ready to drink & a hint of jaggery.',
      price: '₹1200'
    },
    {
      id: 3,
      image: '/Products/Moringa chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Moringa Chutney Powder',
      description: 'Crispy, crunchy, and full of value.',
      price: '₹899'
    },
    {
      id: 4,
      image: '/Products/Garlic Chilly Chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Garlic Chilly Chutney Powder',
      description: '100% pure natural powders in bottles.',
      price: '₹550'
    },
    {
      id: 5,
      image: '/Products/Moringa Nutra Bar -30g.jpg',
      badge: 'Natural',
      name: 'Moringa Nutri Bar',
      description: 'A tasty and energetic treat for any time.',
      price: '₹150'
    },
    {
      id: 6,
      image: '/Products/Flaxseed chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Flaxseed Chutney Powder',
      description: 'Start your day with a blend of nuts, and fruit.',
      price: '₹110'
    },
    {
      id: 7,
      image: '/Products/Curry leaves chutney powder-front.jpeg',
      badge: 'Natural',
      name: 'Millet Idly & Dosa Mix',
      description: 'Traditional taste with healthy millet goodness.',
      price: '₹299'
    },
    {
      id: 8,
      image: '/Products/Ragi millet mix-front.jpeg',
      badge: 'Natural',
      name: 'Millet Chikki',
      description: 'Crunchy and sweet, a perfect healthy snack.',
      price: '₹180'
    }
  ];

  const categories = [
    'All Products',
    'Millet Idly & Dosa Mix',
    'Coffee Cubes',
    'Millet Chikki',
    'Moringa Nutri Bar',
    'Chutney Powders'
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`✓ ${product.name} has been added to your cart!`, 'success');
  };

  const handleFilterClick = () => {
    setAppliedPriceRange([...priceRange]);
  };

  // Filter products based on applied price range
  const filteredProducts = products.filter(product => {
    const price = parseInt(product.price.replace('₹', ''));
    return price >= appliedPriceRange[0] && price <= appliedPriceRange[1];
  });

  return (
    <div className="home">
      <Toast toasts={toasts} />

      {/* Location Delivery Banner */}
      {deliveryAddress && (
        <section className="location-banner">
          <div className="location-banner-container" onClick={() => setAddressModalOpen(true)}>
            <div className="location-content">
              <FiMapPin className="location-icon" />
              <div className="location-text">
                <span className="deliver-to">Deliver to</span>
                <span className="location-details">
                  {deliveryAddress.fullName} - {deliveryAddress.city} {deliveryAddress.pincode}
                </span>
              </div>
            </div>
            <FiChevronDown className="location-dropdown" />
          </div>
        </section>
      )}

      {/* Image Banner Section */}
      <section className="image-banner-section">
        <div className="banner-slider">
          <div className="banner-track">
            <img src="/Banners/Banner1.png" alt="Gusto Banner" className="banner-image" />
            <img src="/Banners/Banner2.png" alt="Gusto Banner 2" className="banner-image" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="products-container">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <h3 className="filters-title">Filters</h3>

            {/* Categories Filter */}
            <div className="filter-group">
              <h4 className="filter-category-title">Categories</h4>
              <ul className="filter-options">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <button 
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="filter-group price-filter-group">
              <h4 className="filter-category-title">Filter by Price</h4>
              <div className="price-range-container">
                <input 
                  type="range" 
                  min="100" 
                  max="900" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="price-slider slider-1"
                />
                <input 
                  type="range" 
                  min="100" 
                  max="900" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider slider-2"
                />
                <div 
                  className="price-track" 
                  style={{
                    left: `${((priceRange[0] - 100) / 800) * 100}%`,
                    width: `${((priceRange[1] - priceRange[0]) / 800) * 100}%`
                  }}
                ></div>
              </div>
              <div className="price-inputs">
                <input 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 100, priceRange[1]])}
                  className="price-input"
                  min="100"
                  max={priceRange[1]}
                />
                <input 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 900])}
                  className="price-input"
                  min={priceRange[0]}
                  max="900"
                />
              </div>
              <button className="filter-btn" onClick={handleFilterClick}>Filter</button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="products-main">
            <div className="products-header">
              <h2 className="products-title">All Products</h2>
              <button className="mobile-filter-btn" onClick={() => setFilterOpen(true)}>
                <FiFilter className="filter-icon" />
                <span>Filters</span>
              </button>
            </div>
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  badge={product.badge}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      {filterOpen && (
        <div className="filter-overlay">
          <div className="filter-overlay-content">
            <div className="filter-overlay-header">
              <h3 className="filter-overlay-title">Filters</h3>
              <button className="filter-close-btn" onClick={() => setFilterOpen(false)}>×</button>
            </div>
            
            {/* Categories Filter */}
            <div className="filter-group">
              <h4 className="filter-category-title">Categories</h4>
              <ul className="filter-options">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <button 
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="filter-group price-filter-group">
              <h4 className="filter-category-title">Filter by Price</h4>
              <div className="price-range-container">
                <input 
                  type="range" 
                  min="100" 
                  max="900" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="price-slider slider-1"
                />
                <input 
                  type="range" 
                  min="100" 
                  max="900" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider slider-2"
                />
                <div 
                  className="price-track" 
                  style={{
                    left: `${((priceRange[0] - 100) / 800) * 100}%`,
                    width: `${((priceRange[1] - priceRange[0]) / 800) * 100}%`
                  }}
                ></div>
              </div>
              <div className="price-inputs">
                <input 
                  type="number" 
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 100, priceRange[1]])}
                  className="price-input"
                  min="100"
                  max={priceRange[1]}
                />
                <input 
                  type="number" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 900])}
                  className="price-input"
                  min={priceRange[0]}
                  max="900"
                />
              </div>
            </div>

            <div className="filter-overlay-actions">
              <button className="filter-btn" onClick={() => { handleFilterClick(); setFilterOpen(false); }}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      {/* Address Selection Modal */}
      {addressModalOpen && (
        <div className="address-modal-overlay" onClick={() => setAddressModalOpen(false)}>
          <div className="address-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="address-modal-header">
              <h3 className="address-modal-title">Select Delivery Address</h3>
              <button className="address-modal-close" onClick={() => setAddressModalOpen(false)}>×</button>
            </div>
            <div className="address-modal-list">
              {addresses.map(address => (
                <div 
                  key={address.id}
                  className={`address-modal-item ${deliveryAddress?.id === address.id ? 'selected' : ''}`}
                  onClick={() => handleSelectAddress(address.id)}
                >
                  <div className="address-modal-item-content">
                    <div className="address-modal-item-header">
                      <span className="address-modal-name">{address.fullName}</span>
                      <span className="address-modal-type">{address.addressType}</span>
                    </div>
                    <p className="address-modal-details">
                      {address.addressLine1}, {address.addressLine2}
                    </p>
                    <p className="address-modal-location">
                      {address.city}, {address.state} - {address.pincode}
                    </p>
                    <p className="address-modal-phone">{address.phoneNumber}</p>
                  </div>
                  {deliveryAddress?.id === address.id && (
                    <FiCheck className="address-modal-check" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
