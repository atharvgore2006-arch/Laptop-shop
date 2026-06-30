import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/core.png";
const Navbar = ({ cartCount, openCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <a href="/#home" onClick={closeMenu}>
          <img src={logo} alt="logo" height="45px" width="100px" />
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
        <div className="nav-cart-desktop">
          <button onClick={openCart} className="cart-icon-link cart-btn">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
