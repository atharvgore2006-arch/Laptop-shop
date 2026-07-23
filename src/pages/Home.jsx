import bg from "../assets/bg.jpg";
import core from '../assets/core2.png'
import clientsupport from '../assets/clientsupport.jpg'
import premium from '../assets/pq.png'
import fast from '../assets/fast.jpg'
// import { Globe, Info, Truck } from "lucide-react";
const Home = () => {
  return (
    <section id="home" className="home-page ">
      <div
        className="hero-section"
        style={{
          background: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url(${bg}) center/cover no-repeat`,
        }}
      >
        <div className="hero-content container">
          <img src={core} alt="core"
            height={100}
          />

          <h1>Next Generation Laptop Store</h1>
          <p>
            Discover the most powerful and stylish laptops for your work,
            gaming, and creative needs.
          </p>
          <a href="/#products" className="cta-button">
            Shop Now
          </a>
        </div>
      </div>

      <div className="featured-section">
        <div className="container">
          <div className="featured-header">
            <span className="featured-subtitle">OUR ADVANTAGES</span>
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="featured-divider"></div>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img src={premium} alt="Premium Quality" className="feature-image contain" />
              </div>
              <h3>Premium Quality</h3>
              <p>We only stock laptops from the top-rated brands globally.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img src={clientsupport} alt="Expert Support" className="feature-image cover" />
              </div>
              <h3>Expert Support</h3>
              <p>Our technicians are always ready to help you with any issues.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image-wrapper">
                <img src={fast} alt="Fast Delivery" className="feature-image cover" />
              </div>
              <h3>Fast Delivery</h3>
              <p>
                Get your new laptop delivered to your doorstep in record time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
