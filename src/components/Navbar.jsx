import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/bgrem.png";
import '../Navbar.css'
const Navbar = ({ cartCount, openCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" style={{

      background:
        "linear-gradient(135deg, #0f172a, #1e293b, #4338ca)",
      // backgroundSize: "300% 300%",
      // animation: "gradientMove 8s ease infinite",
      color: "white",
      boxshadow: "0 4px 20px rgba(67, 56, 202, 0.25)"

    }} >
      <div className="navbar-container container" style={{

        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "10px0"
      }}>

        <a href="/#home" onClick={closeMenu}>
          <img src={logo} alt="logo" height="54px" width="109px" style={{ marginLeft: "40px", marginTop: "5px" }} />
        </a>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <a href="/#home" className="nav-links" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/#about" className="nav-links" onClick={closeMenu}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/#services" className="nav-links" onClick={closeMenu}>
              Services
            </a>
          </li>
          <li className="nav-item">
            <a href="/#products" className="nav-links" onClick={closeMenu}>
              Products
            </a>
          </li>
          <li className="nav-item">
            <a href="/#contact" className="nav-links" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li className="nav-item nav-admin-mobile-only">
            <a href="/admin" className="nav-links" onClick={closeMenu}>
              Admin
            </a>
          </li>
          <li className="nav-item nav-cart-mobile">
            <button
              className="nav-links cart-btn-mobile"
              onClick={() => {
                openCart();
                closeMenu();
              }}
            >
              Cart ({cartCount})
            </button>
          </li>
        </ul>
        <div className="nav-right-desktop" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="nav-admin-desktop">
            <a
              href="/admin"
              className="nav-links"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.95rem",
                fontWeight: "600",
                background: "rgba(255, 255, 255, 0.1)",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              Admin
            </a>
          </div>
          <div className="nav-cart-desktop">
            <button onClick={openCart} className="cart-icon-link cart-btn">
              <ShoppingCart size={24} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
