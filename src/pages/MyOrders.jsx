import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiMapPin, FiSearch, FiPackage, FiHeart, FiHeadphones, FiChevronRight } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';
import { RiCoupon3Line } from 'react-icons/ri';
import './MyOrders.css';

export default function MyOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [userProfile] = useState({
    name: 'DCS',
    email: 'DCS@email.com',
    avatar: 'D'
  });

  const allOrders = [
    {
      id: '#GUS-10583',
      date: '15 Oct 2023',
      amount: '₹1,250.00',
      status: 'Delivered',
      products: [
        { name: 'Ragi Millet', quantity: 2, price: '₹900.00', image: '/Products/Ragi millet mix-front.jpeg' },
        { name: 'Flax Seed Chutney Powder', quantity: 1, price: '₹350.00', image: '/Products/Flaxseed chutney powder-front.jpeg' }
      ]
    },
    {
      id: '#GUS-10412',
      date: '28 Sep 2023',
      amount: '₹450.00',
      status: 'Processing',
      products: [
        { name: 'Moringa Chutney Powder', quantity: 1, price: '₹450.00', image: '/Products/Moringa chutney powder-front.jpeg' }
      ]
    },
    {
      id: '#GUS-10115',
      date: '02 Jul 2023',
      amount: '₹875.00',
      status: 'Cancelled',
      products: [
        { name: 'Curry Leaves Chutney Powder', quantity: 2, price: '₹875.00', image: '/Products/Curry leaves chutney powder-front.jpeg' }
      ]
    }
  ];

  // Filter orders based on status
  const filteredOrders = activeFilter === 'all' 
    ? allOrders 
    : allOrders.filter(order => order.status.toLowerCase() === activeFilter.toLowerCase());

  // Search filtering
  const searchedOrders = searchQuery 
    ? filteredOrders.filter(order => order.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredOrders;

  // Pagination
  const itemsPerPage = 3;
  const totalPages = Math.ceil(searchedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = searchedOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        {/* Sidebar */}
        <aside className="orders-sidebar">
          <div className="sidebar-header">
            {/* Desktop view */}
            <div className="user-avatar">
              <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="User" />
            </div>
            <div className="user-info">
              <p className="user-name">DCS</p>
              <p className="user-email">DCS@email.com</p>
            </div>
            
            {/* Mobile view */}
            <div className="user-info-top">
              <p className="user-name">DCS</p>
              <div className="user-coins">
                <span className="coin-icon">🪙</span>
                <span className="coin-count">0</span>
              </div>
            </div>
            <button className="membership-status">
              <span className="membership-text">Explore</span>
              <span className="membership-tier">Plus Silver</span>
              <FiChevronRight className="membership-arrow" />
            </button>
          </div>

          <nav className="sidebar-menu">
            <button 
              className="menu-item active"
              onClick={() => navigate('/my-orders')}
            >
              <FiPackage className="menu-icon" />
              <span className="menu-text">Orders</span>
            </button>

            <button 
              className="menu-item"
              onClick={() => navigate('/account')}
            >
              <FiUser className="menu-icon" />
              <span className="menu-text">Profile</span>
            </button>

            <button 
              className="menu-item"
              onClick={() => navigate('/account?tab=addresses')}
            >
              <FiMapPin className="menu-icon" />
              <span className="menu-text">Address</span>
            </button>

            <button 
              className="menu-item"
              onClick={() => navigate('/contact')}
            >
              <FiHeadphones className="menu-icon" />
              <span className="menu-text">Help Center</span>
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="orders-main">
          {/* Search Bar */}
          <div className="orders-search-wrapper">
            <div className="orders-search-bar">
              <FiSearch className="orders-search-icon" />
              <input 
                type="text"
                placeholder="Search by order"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="orders-search-input"
              />
            </div>

            {/* Filter Tabs */}
            <div className="orders-filter-tabs">
              <button
                className={`orders-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('all');
                  setCurrentPage(1);
                }}
              >
                All
              </button>
              <button
                className={`orders-filter-tab ${activeFilter === 'processing' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('processing');
                  setCurrentPage(1);
                }}
              >
                Processing
              </button>
              <button
                className={`orders-filter-tab ${activeFilter === 'shipped' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('shipped');
                  setCurrentPage(1);
                }}
              >
                Shipped
              </button>
              <button
                className={`orders-filter-tab ${activeFilter === 'delivered' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('delivered');
                  setCurrentPage(1);
                }}
              >
                Delivered
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="orders-list">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <div key={order.id} className="order-card">
                  {/* Order Header */}
                  <div className="order-card-header">
                    <div className="order-header-info">
                      <span className="order-id">{order.id}</span>
                      <span className="order-separator">•</span>
                      <span className="order-date">{order.date}</span>
                      <span className="order-separator">•</span>
                      <span className="order-amount">{order.amount}</span>
                    </div>
                    <div className="order-status">
                      <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Products List */}
                  <div className="order-products-list">
                    {order.products.map((product, index) => (
                      <div key={index} className="product-line-item">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-line-image"
                        />
                        <span className="product-line-id">ID: {order.id}</span>
                        <span className="product-line-name">{product.name}</span>
                        <span className="product-line-price">{product.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders">
                <p>No orders found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {searchedOrders.length > itemsPerPage && (
            <div className="orders-pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
