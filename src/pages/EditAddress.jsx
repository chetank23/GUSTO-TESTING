import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiLogOut, FiUser, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { BsBell } from 'react-icons/bs';
import { useAddresses } from '../context/AddressContext';
import './EditAddress.css';

export default function EditAddress() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAddressById, updateAddress, deleteAddress } = useAddresses();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    addressType: 'home',
    isDefault: false
  });

  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load address data
  useEffect(() => {
    const address = getAddressById(id);
    if (address) {
      setFormData(address);
    } else {
      alert('Address not found!');
      navigate('/account?tab=addresses');
    }
  }, [id, getAddressById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateAddress(id, formData);
      alert('Address updated successfully!');
      navigate('/account?tab=addresses');
    }
  };

  const handleDelete = () => {
    deleteAddress(id);
    alert('Address deleted successfully!');
    navigate('/account?tab=addresses');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="edit-address-page">
      <div className="edit-address-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="sidebar-header">
            <div className="user-avatar">
              <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" alt="User" />
            </div>
            <div className="user-info">
              <p className="user-name">DCS</p>
              <p className="user-email">DCS@email.com</p>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button 
              className="menu-item"
              onClick={() => navigate('/account')}
            >
              <FiUser className="menu-icon" />
              <span className="menu-text">My Profile</span>
            </button>

            <button 
              className="menu-item active"
              onClick={() => navigate('/account?tab=addresses')}
            >
              <FiMapPin className="menu-icon" />
              <span className="menu-text">Addresses</span>
            </button>

            <button 
              className="menu-item"
              onClick={() => navigate('/my-orders')}
            >
              <BsBell className="menu-icon" />
              <span className="menu-text">My Orders</span>
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="edit-address-main">
          <div className="page-header">
            <div className="header-left">
              <button className="back-btn" onClick={() => navigate('/account?tab=addresses')}>
                ← Back to Addresses
              </button>
              <h1 className="page-title">Edit Address</h1>
            </div>
            <button className="btn-delete" onClick={() => setShowDeleteConfirm(true)}>
              <FiTrash2 />
              Delete Address
            </button>
          </div>

          <form className="address-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="section-heading">Contact Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number <span className="required">*</span></label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={errors.phoneNumber ? 'error' : ''}
                  />
                  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-heading">Address Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode <span className="required">*</span></label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-message">{errors.pincode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City <span className="required">*</span></label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="addressLine1">Address (House No, Building, Street) <span className="required">*</span></label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="Enter house/building/street name"
                  className={errors.addressLine1 ? 'error' : ''}
                />
                {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="addressLine2">Area, Sector, Locality</label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="Enter area/sector/locality"
                />
              </div>

              <div className="form-group">
                <label htmlFor="landmark">Landmark (Optional)</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="E.g. near apollo hospital"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State <span className="required">*</span></label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-heading">Address Type</h2>
              
              <div className="address-type-options">
                <label className={`type-option ${formData.addressType === 'home' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="addressType"
                    value="home"
                    checked={formData.addressType === 'home'}
                    onChange={handleChange}
                  />
                  <span>Home</span>
                </label>

                <label className={`type-option ${formData.addressType === 'work' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="addressType"
                    value="work"
                    checked={formData.addressType === 'work'}
                    onChange={handleChange}
                  />
                  <span>Work</span>
                </label>

                <label className={`type-option ${formData.addressType === 'other' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="addressType"
                    value="other"
                    checked={formData.addressType === 'other'}
                    onChange={handleChange}
                  />
                  <span>Other</span>
                </label>
              </div>

              <div className="form-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                  />
                  <span>Set as default address</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/account?tab=addresses')}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Update Address
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Address</h3>
            <p>Are you sure you want to delete this address? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-modal-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-modal-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
