import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { useToast } from '../components/Toast';
import Toast from '../components/Toast';
import './Search.css';

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

export default function Search() {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const { toasts, showToast } = useToast();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  const query = searchParams.get('q') || '';

  useEffect(() => {
    let results;
    if (!query.trim()) {
      results = [];
    } else {
      results = ALL_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    // Sort results
    if (sortBy === 'price-low') {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('₹', ''));
        const priceB = parseFloat(b.price.replace('₹', ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-high') {
      results.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('₹', ''));
        const priceB = parseFloat(b.price.replace('₹', ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }
    }

    setFilteredProducts(results);
  }, [query, sortBy]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price.replace('₹', '')),
      image: product.image
    });
    showToast(`✓ ${product.name} has been added to your cart!`, 'success');
  };

  return (
    <div className="search-results-page">
      <Toast toasts={toasts} />
      {/* Search Header */}
      <div className="search-header">
        <div className="search-header-content">
          <h1>Search Results</h1>
          <p className="search-query">
            {query ? (
              <>
                Results for "<strong>{query}</strong>" ({filteredProducts.length} found)
              </>
            ) : (
              'Enter a search term to see results'
            )}
          </p>

          {/* Sort Options */}
          {filteredProducts.length > 0 && (
            <div className="sort-container">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Results Container */}
      <div className="search-results-container">
        {filteredProducts.length > 0 ? (
          <div className="results-grid">
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
        ) : (
          <div className="no-results-message">
            {query ? (
              <>
                <h2>No products found</h2>
                <p>We couldn't find any products matching "{query}". Try searching with different keywords.</p>
              </>
            ) : (
              <>
                <h2>Search for products</h2>
                <p>Use the search bar to find products you're looking for.</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
