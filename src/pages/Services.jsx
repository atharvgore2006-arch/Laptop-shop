import { Wrench, MonitorDown, Headphones, Paintbrush, Database, Cpu } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Laptop Repair',
      description: 'Expert hardware and software repair for all major laptop brands. Fast turnaround times.',
      icon: <Wrench size={48} className="service-icon" />
    },
    {
      id: 2,
      title: 'Windows Installation',
      description: 'Fresh OS installations, upgrades, and optimization for peak performance.',
      icon: <MonitorDown size={48} className="service-icon" />
    },
    {
      id: 3,
      title: 'Accessories',
      description: 'Find the perfect peripherals: mice, keyboards, cases, and cooling pads.',
      icon: <Headphones size={48} className="service-icon" />
    },
    {
      id: 4,
      title: 'Laptop Cleaning',
      description: 'Deep cleaning services to prevent overheating and extend your laptop life.',
      icon: <Paintbrush size={48} className="service-icon" />
    },
    {
      id: 5,
      title: 'Data Recovery',
      description: 'Professional data recovery for damaged drives and accidental deletions.',
      icon: <Database size={48} className="service-icon" />
    },
    {
      id: 6,
      title: 'Hardware Upgrades',
      description: 'Boost performance with SSD and RAM upgrades tailored for your system.',
      icon: <Cpu size={48} className="service-icon" />
    }
  ];

  return (
    <section id="services" className="page-container container">
      <h1 className="page-title">Our Services</h1>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            {service.icon}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;