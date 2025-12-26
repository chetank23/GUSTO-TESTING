import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section company-info">
          <div className="company-logo">
            <span className="company-name">GUSTO</span>
          </div>
          <p className="company-desc">Deliciously natural foods from TRIDALA NUTRA FOOD PVT LTD.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/my-orders">My Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Us</h4>
          <div className="contact-item">
            <MdEmail className="contact-icon" />
            <a href="mailto:support@gusto.com">support@gusto.com</a>
          </div>
          <div className="contact-item">
            <MdPhone className="contact-icon" />
            <a href="tel:+917733988999">+91 7733988999</a>
          </div>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="social-links">
            <a href="#facebook" className="social-icon" title="Facebook">
              <FaFacebook />
            </a>
            <a href="#twitter" className="social-icon" title="Twitter">
              <FaTwitter />
            </a>
            <a href="#instagram" className="social-icon" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#youtube" className="social-icon" title="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© GUSTO — All rights reserved. Powered by <a href="#dev-creations">Dev Creations & Solutions</a></p>
      </div>
    </footer>
  );
}
