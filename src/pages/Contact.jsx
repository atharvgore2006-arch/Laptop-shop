import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import map from '../assets/map.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="page-container container" style={{ position: "relative" }}>
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions? We're here to help. Reach out to us via phone,
            email, or visit our store.
          </p>

          <div className="info-item">
            <MapPin className="info-icon" />
            <p>123 Tech Complex,Rahata, Ahilyanager, MH</p>
          </div>
          <div className="info-item">
            <Phone className="info-icon" />
            <p>+91 8181776767</p>
          </div>
          <div className="info-item">
            <Mail className="info-icon" />
            <p>support@coretecsolutions.com</p>
          </div>

          <div className="map-placeholder">
            <img
              src={map}
              alt="Map Placeholder"
              className="map-image rounded-image"
            />
            <div className="map-overlay">Map View</div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send us a Message</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="primary-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
