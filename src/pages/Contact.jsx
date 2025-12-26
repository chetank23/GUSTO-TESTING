import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Section - Contact Info */}
        <div className="contact-info-section">
          <h1 className="contact-heading">Get in Touch</h1>
          <p className="contact-description">
            We'd love to hear from you. Whether you have a question about our products, 
            feedback, or just want to say hello, feel free to reach out to us.
          </p>

          <div className="contact-info-blocks">
            <div className="info-block">
              <h3 className="info-label">Address</h3>
              <p className="info-value">TRIDALA NUTRA FOOD PVT LTD, Corporate Office, Cityville, India</p>
            </div>

            <div className="info-block">
              <h3 className="info-label">Email</h3>
              <p className="info-value">support@gusto.com</p>
            </div>

            <div className="info-block">
              <h3 className="info-label">Phone</h3>
              <p className="info-value">+91-12345-67890</p>
            </div>

            <div className="info-block">
              <h3 className="info-label">FSSAI License</h3>
              <p className="info-value">12345678901234</p>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is your message about?"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
