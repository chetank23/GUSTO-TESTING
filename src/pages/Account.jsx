import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiLogOut, FiUser, FiMapPin, FiPackage, FiHeart, FiHeadphones, FiChevronRight } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';
import { RiCoupon3Line } from 'react-icons/ri';
import { useAddresses } from '../context/AddressContext';
import './Account.css';

export default function Account() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addresses } = useAddresses();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'addresses') {
      setActiveTab('addresses');
    }
  }, [searchParams]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  
  const [notifications, setNotifications] = useState({
    promotional: true,
    orderUpdates: true,
    accountActivity: false
  });

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePersonal = () => {
    alert('Personal information saved successfully!');
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved successfully!');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
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
              className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => navigate('/my-orders')}
            >
              <FiPackage className="menu-icon" />
              <span className="menu-text">Orders</span>
            </button>

            <button 
              className={`menu-item ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <FiUser className="menu-icon" />
              <span className="menu-text">Profile</span>
            </button>

            <button 
              className={`menu-item ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
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
        <main className="account-main">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="account-content">
              <h1 className="account-title">Account Settings</h1>

              {/* Personal Information Section */}
              <section className="content-section">
                <h2 className="section-title">Personal Information</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalChange}
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={handlePersonalChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={personalInfo.phone}
                      onChange={handlePersonalChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn-cancel" onClick={() => setActiveTab('personal')}>Cancel</button>
                  <button className="btn-save" onClick={handleSavePersonal}>Save Changes</button>
                </div>
              </section>

              {/* Notification Preferences Section */}
              <section className="content-section">
                <h2 className="section-title">Notification Preferences</h2>
                
                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Promotional Emails</h3>
                    <p className="notification-desc">Receive newsletters and special offers.</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.promotional}
                      onChange={() => handleNotificationChange('promotional')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Order Updates</h3>
                    <p className="notification-desc">Get notified about your order status.</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.orderUpdates}
                      onChange={() => handleNotificationChange('orderUpdates')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">Account Activity</h3>
                    <p className="notification-desc">Security alerts for your account.</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notifications.accountActivity}
                      onChange={() => handleNotificationChange('accountActivity')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-actions">
                  <button className="btn-save" onClick={handleSaveNotifications}>Save Preferences</button>
                </div>
              </section>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="account-content">
              <div className="addresses-header">
                <h1 className="account-title">Manage Your Addresses</h1>
                <button className="btn-add-address" onClick={() => navigate('/add-address')}>+ Add a New Address</button>
              </div>

              <div className="addresses-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className="address-card">
                    <div className="address-map-wrapper">
                      <img src={addr.mapImage} alt={`${addr.addressType} Address Map`} className="address-map-image" />
                    </div>
                    {addr.isDefault && <span className="default-label">Default Address</span>}
                    <div className="address-details">
                      <h3 className="address-type">{addr.addressType.charAt(0).toUpperCase() + addr.addressType.slice(1)}</h3>
                      <p className="address-text">{addr.fullName}, {addr.addressLine1}, {addr.addressLine2}, {addr.city}, {addr.state} {addr.pincode}, {addr.country}</p>
                      <p className="address-contact">Contact: {addr.phoneNumber}</p>
                      <button className="btn-edit" onClick={() => navigate(`/edit-address/${addr.id}`)}>Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order History Tab */}
          {activeTab === 'orders' && (
            <div className="account-content">
              <h1 className="account-title">Order History</h1>
              <div className="orders-container">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <p className="order-id">{order.id}</p>
                        <p className="order-date">{order.date}</p>
                      </div>
                      <div className="order-status">
                        <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="order-details">
                      <p className="order-items">{order.items} items • <strong>{order.amount}</strong></p>
                      <button className="btn-view-order">View Order Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
