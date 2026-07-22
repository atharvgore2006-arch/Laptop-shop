import { ShieldCheck, Award, ThumbsUp, Quote } from 'lucide-react';
import team from '../assets/team.jpg';
import shop from '../assets/Shop.png';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-header">
          <span className="about-subtitle">WHO WE ARE</span>
          <h2 className="about-title">About Us</h2>
          <div className="about-divider"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text-column">
            <h3 className="about-headline">Welcome to Core Tec Solutions</h3>
            <p className="about-lead">
              Founded in 2020, Core Tec Solutions is your ultimate destination for all your computing needs. 
              We pride ourselves on offering a curated selection of the best laptops on the market, 
              backed by unparalleled customer service and technical support.
            </p>
            <p className="about-description">
              Whether you are a professional looking for a high-performance workstation, a student needing 
              a reliable daily driver, or a gamer seeking the ultimate rig, we have something perfect for you.
            </p>
            
            <div className="about-highlights-grid">
              <div className="highlight-item">
                <div className="highlight-icon-wrapper">
                  <ShieldCheck className="highlight-icon" />
                </div>
                <div className="highlight-info">
                  <h4>100% Quality</h4>
                  <p>Certified products & full warranty</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon-wrapper">
                  <Award className="highlight-icon" />
                </div>
                <div className="highlight-info">
                  <h4>5+ Years</h4>
                  <p>Of elite tech industry experience</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon-wrapper">
                  <ThumbsUp className="highlight-icon" />
                </div>
                <div className="highlight-info">
                  <h4>Expert Support</h4>
                  <p>Friendly guidance & technical assistance</p>
                </div>
              </div>
            </div>

            <div className="owner-quote-card">
              <Quote className="quote-icon" />
              <div className="quote-content">
                <blockquote className="quote-text">
                  “Our goal is to provide reliable, high-performance technology tailored to every single customer's needs.”
                </blockquote>
                <div className="quote-author">
                  <span className="author-name">Atharv Gore</span>
                  <span className="author-title">Founder & Owner, Core Tec Solutions</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-images-column">
            <div className="about-image-collage">
              <div className="image-wrapper main-image-wrapper">
                <img 
                  src={team} 
                  alt="Owner and Team" 
                  className="collage-image main-image"
                />
              </div>
              <div className="image-wrapper secondary-image-wrapper">
                <img 
                  src={shop} 
                  alt="Our Shop" 
                  className="collage-image secondary-image"
                />
              </div>
              <div className="floating-experience-badge">
                <span className="badge-number">Est.</span>
                <span className="badge-text">2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;