import '../App.css'
import Asus from "../assets/Asus.jpg";
import Lenovo from "../assets/Lenovo.jpg";
import Hp from "../assets/Hpgaming.jpg";
import dell from '../assets/dell.jpg'
import Thickbook from "../assets/Thickbook.jpg";
import Neo from "../assets/Neo13.jpg";
const productsData = [
  {
    id: 1,
    name: "Asus Rog Strix G16",
    price: 159999,
    newprice: 157899,
    description:
      "a high-performance 16-inch gaming laptop featuring up to Intel Core Ultra 9 275HX or AMD Ryzen 9 8940HX processors and NVIDIA RTX 50-series GPUs (up to 175W TGP). It boasts a 16:10 ROG Nebula Display (2.5K 240Hz or FHD+ 165Hz) and advanced cooling with liquid metal",
    image: Asus,
  },
  {
    id: 2,
    name: "Lenovo LOQ ",
    price: 84999,
    newprice: 83890,

    description:
      '2026 AI-powered gaming laptop featuring an AMD Ryzen 5 7235HS processor, dedicated NVIDIA RTX 4050 6GB GDDR6 graphics (105W TGP), 16GB DDR5 RAM, and a 512GB SSD. It offers a 15.6" FHD (1920x1080) 144Hz display with 300nits brightness and G-SYNC. This Luna Grey laptop runs Windows 11 with Office Home 2024, includes 3 months of Game Pass, and features Hyperchamber thermal design.',
    image: Lenovo,
  },
  {
    id: 3,
    name: "HP Omen Gaming Laptop",
    price: 144990,
    newprice: 143900,

    description:
      "  is a high-performance gaming laptop featuring a 14th Gen Intel Core i7-14650HX processor, NVIDIA GeForce RTX 5050 (8GB GDDR6) graphics, and 24GB DDR5 RAM. It is designed for immersive, fast-paced gaming, boasting a 16.1-inch 2K (16:10) IPS, 165Hz display, 1TB SSD, and 4-zone RGB keyboard.",
    image: Hp,
  },
  {
    id: 4,
    name: "Dell 15 ",
    price: 65960,
    newprice: 64678,

    description:
      "a premium, convertible 2-in-1 business laptop designed for versatility and security, featuring a 360-degree hinge that allows it to function as a laptop, tablet, or tent.",
    image: dell,
  },
  {
    id: 5,
    name: "Lenovo ThinkBook 14",
    price: 73690,
    newprice: 72867,

    description:
      " is a 14-inch, aluminium-chassis business-oriented laptop (1.36kg+) designed for SMBs, offering Intel Core Ultra processors, AI-driven performance, and high durability (MIL-STD-810H). It features 16:10 WUXGA displays, up to 64GB DDR5 RAM, and robust security including an optional fingerprint reader and privacy shutter.",
    image: Thickbook,
  },
  {
    id: 6,
    name: "Apple Macbook Neo 13",
    price: 77000,
    newprice: 75990,

    description:
      " is an entry-level laptop featuring the A18 Pro chip, designed for AI-driven performance, a 13-inch Liquid Retina display (2408x1506), and up to 16 hours of battery life. It comes in four colors with a durable, 60% recycled aluminum body and starts at a competitive price point in the Apple lineup.",
    image: Neo,
  },
];

const Products = ({ addToCart }) => {
  return (
    <section id="products" className="page-container container">
      <h1 className="page-title">Our Some Products</h1>
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

  <p
    className="product-price"
    style={{ textDecoration: "line-through" }}
  >
    ₹{product.price}
  </p>

  <p className="newp">
    ₹{product.newprice}
  </p>

</div>
              <p className="product-description">{product.description}</p>
              <button
                className="primary-button"
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
