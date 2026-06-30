import bg from "../assets/bg.jpg";

const Home = () => {
  return (
    <section id="home" className="home-page">
      <div
        className="hero-section"
        style={{
          background: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url(${bg}) center/cover no-repeat`,
        }}
      >
        <div className="hero-content container">
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

      <div className=" featured-section container">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Premium Quality</h3>
            <p>We only stock laptops from the top-rated brands globally.</p>
          </div>
          <div className="feature-card">
            <h3>Expert Support</h3>
            <p>Our technicians are always ready to help you with any issues.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>
              Get your new laptop delivered to your doorstep in record time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
