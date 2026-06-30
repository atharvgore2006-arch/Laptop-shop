import team from '../assets/team.jpg'
import shop from '../assets/Shop.png'
const About = () => {
  return (
    <section id="about" className="page-container container">
      <h1 className="page-title">About Us</h1>
      <div className="about-content">
        <div className="about-text">
          <h2>Welcome to Core Tec Solutions</h2>
          <p>
            Founded in 2020, Core Tec Solutions is your ultimate destination for all your computing needs. 
            We pride ourselves on offering a curated selection of the best laptops on the market, 
            backed by unparalleled customer service and technical support.
          </p>
          <p>
            Whether you are a professional looking for a high-performance workstation, a student needing 
            a reliable daily driver, or a gamer seeking the ultimate rig, we have something perfect for you.
          </p>
          <div className="owner-info">
            <h3>Meet the Owner</h3>
            <p><strong>Atharv Gore</strong> - Tech enthusiast with over 15 years of industry experience. 
            Atharv started Core Tec Solutions to bridge the gap between high-quality tech and accessible customer service.</p>
           <p>“Our goal is to provide reliable technology for every customer.”</p> <br/>
           <p style={{marginLeft:"15rem"}}>- Atharv Gore</p>

           

          </div>
        </div>
        <div className="about-images">
          <img 
            src={team} 
            alt="Owner and Team" 
            className="rounded-image"
          />
          <img 
            src={shop} 
            alt="Our Shop" 
            className="rounded-image"
          />
        </div>
      </div>
    </section>
  );
};

export default About;