import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ cartCount }) => {
  return (
    <div className="app-container">
      <Navbar cartCount={cartCount} />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} LaptopShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;