import repair from "../assets/repair.png";
import windows from "../assets/windows.png";
import accessories from "../assets/accessories.png";
import cleaning from "../assets/cleaning.png";
import recovery from "../assets/recovery.png";
import upgrade from "../assets/upgrade.png";

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Laptop Repair',
      description: 'Expert hardware and software repair for all major laptop brands. Fast turnaround times.',
      image: repair
    },
    {
      id: 2,
      title: 'Windows Installation',
      description: 'Fresh OS installations, upgrades, and optimization for peak performance.',
      image: windows
    },
    {
      id: 3,
      title: 'Accessories',
      description: 'Find the perfect peripherals: mice, keyboards, cases, and cooling pads.',
      image: accessories
    },
    {
      id: 4,
      title: 'Laptop Cleaning',
      description: 'Deep cleaning services to prevent overheating and extend your laptop life.',
      image: cleaning
    },
    {
      id: 5,
      title: 'Data Recovery',
      description: 'Professional data recovery for damaged drives and accidental deletions.',
      image: recovery
    },
    {
      id: 6,
      title: 'Hardware Upgrades',
      description: 'Boost performance with SSD and RAM upgrades tailored for your system.',
      image: upgrade
    }
  ];

  return (
    <section id="services" className="page-container container">
      <h1 className="page-title">Our Services</h1>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-image-wrapper">
              <img src={service.image} alt={service.title} className="service-image" />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;