import { useState, useRef, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './SearchBar.css';

// Product data - same as Home.jsx
const ALL_PRODUCTS = [
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
    name: 'Organic Orange Juice',
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
    image: '/Products/Amla Chutney powder-front.jpeg',
    badge: 'Natural',
    name: 'Amla Chutney Powder',
    description: 'Rich in Vitamin C, boosts immunity naturally.',
    price: '₹399'
  }
];

const MAX_SUGGESTIONS = 5;

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimerRef = useRef(null);
  const containerRef = useRef(null);

  // Get initial query from URL if on search results page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlQuery = params.get('q') || '';
    setQuery(urlQuery);
  }, [location.search]);

  // Debounced search function
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      const filtered = ALL_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, MAX_SUGGESTIONS);

      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          const product = suggestions[selectedIndex];
          navigate(`/product/${product.id}`);
          setShowSuggestions(false);
          setQuery('');
        } else if (query.trim()) {
          navigate(`/search?q=${encodeURIComponent(query)}`);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar-container" ref={containerRef}>
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && suggestions.length > 0 && setShowSuggestions(true)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FiSearch className="search-icon" />
        </button>
      </form>

      {/* Dropdown Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((product, index) => (
            <div
              key={product.id}
              className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(product)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div className="suggestion-image-wrapper">
                <img src={product.image} alt={product.name} className="suggestion-image" />
              </div>
              <div className="suggestion-info">
                <div className="suggestion-name">{product.name}</div>
                <div className="suggestion-description">{product.description}</div>
                <div className="suggestion-price">{product.price}</div>
              </div>
            </div>
          ))}
          {query && (
            <div
              className={`suggestion-item search-all ${selectedIndex === MAX_SUGGESTIONS ? 'selected' : ''}`}
              onClick={handleSearchSubmit}
              onMouseEnter={() => setSelectedIndex(MAX_SUGGESTIONS)}
            >
              <span className="search-all-text">Search for "{query}"</span>
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div className="suggestions-dropdown">
          <div className="no-results">
            No products found for "{query}". Press Enter to search anyway.
          </div>
        </div>
      )}
    </div>
  );
}
