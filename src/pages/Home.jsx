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

      <div className=" featured-section container" style={{
        background: "linear-gradient(135deg, #746666 0%, #3e556d 45%, #e0f2fe 100%)"
      }}>
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            {/* <Globe size={30} /> */}
            <img src={premium} alt="" style={{ width: '104%', height: '170px', objectFit: 'contain' }} />
            <h3>Premium Quality</h3>
            <p>We only stock laptops from the top-rated brands globally.</p>
          </div>
          <div className="feature-card">
            {/* <Info size={30} /> */}
            {/* <img src={clientsupport} alt="no img" /> */}
            <img src={clientsupport} alt='no img' style={{ height: '200px', width: '250px' }} />
            <h3>Expert Support</h3>
            <p>Our technicians are always ready to help you with any issues.</p>
          </div>
          <div className="feature-card">

            {/* <Truck size={30} /> */}
            <img src={fast} alt="no img" style={{
              width: "270px",
              height: "200px",
              marginRight:'10px'
              // display: "flex",   
              // alignItems: "center",
              // gap: "85px",
              // border: "1px solid black",
              // margin: "10px"
            }} />
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
