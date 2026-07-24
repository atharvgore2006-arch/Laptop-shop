import { useState, useEffect } from "react";
import { API_URL } from "../config";
import {
  Package,
  ClipboardList,
  LogOut,
  Edit,
  Plus,
  Trash2,
  CheckCircle2,
  ShoppingBag,
  Eye,
  Save,
  X,
  Search,
  Grid,
  List,
  TrendingUp,
  DollarSign,
  Percent,
  Laptop,
  RefreshCw
} from "lucide-react";
import Asus from "../assets/Asus.jpg";
import Lenovo from "../assets/Lenovo.jpg";
import Hp from "../assets/Hpgaming.jpg";
import dell from "../assets/dell.jpg";
import Thickbook from "../assets/Thickbook.jpg";
import Neo from "../assets/Neo13.jpg";
import hphyper from '../assets/Hphyper.jpg';
import "./Admin.css";

const imageMap = {
  Asus,
  Lenovo,
  Hp,
  dell,
  Thickbook,
  Neo,
  hphyper
};

const imageKeys = Object.keys(imageMap);

const fallbackProductsData = [
  {
    id: 1,
    name: "Asus Rog Strix G16",
    price: 159999,
    newprice: 157899,
    description:
      "a high-performance 16-inch gaming laptop featuring up to Intel Core Ultra 9 275HX or AMD Ryzen 9 8940HX processors and NVIDIA RTX 50-series GPUs (up to 175W TGP). It boasts a 16:10 ROG Nebula Display (2.5K 240Hz or FHD+ 165Hz) and advanced cooling with liquid metal",
    image_key: "Asus",
  },
  {
    id: 2,
    name: "Lenovo LOQ ",
    price: 84999,
    newprice: 83890,
    description:
      '2026 AI-powered gaming laptop featuring an AMD Ryzen 5 7235HS processor, dedicated NVIDIA RTX 4050 6GB GDDR6 graphics (105W TGP), 16GB DDR5 RAM, and a 512GB SSD. It offers a 15.6" FHD (1920x1080) 144Hz display with 300nits brightness and G-SYNC. This Luna Grey laptop runs Windows 11 with Office Home 2024, includes 3 months of Game Pass, and features Hyperchamber thermal design.',
    image_key: "Lenovo",
  },
  {
    id: 3,
    name: "HP Omen Gaming Laptop",
    price: 144990,
    newprice: 143900,
    description:
      "  is a high-performance gaming laptop featuring a 14th Gen Intel Core i7-14650HX processor, NVIDIA GeForce RTX 5050 (8GB GDDR6) graphics, and 24GB DDR5 RAM. It is designed for immersive, fast-paced gaming, boasting a 16.1-inch 2K (16:10) IPS, 165Hz display, 1TB SSD, and 4-zone RGB keyboard.",
    image_key: "Hp",
  },
  {
    id: 4,
    name: "Dell 15 ",
    price: 65960,
    newprice: 64678,
    description:
      "a premium, convertible 2-in-1 business laptop designed for versatility and security, featuring a 360-degree hinge that allows it to function as a laptop, tablet, or tent.",
    image_key: "dell",
  },
  {
    id: 5,
    name: "Lenovo ThinkBook 14",
    price: 73690,
    newprice: 72867,
    description:
      " is a 14-inch, aluminium-chassis business-oriented laptop (1.36kg+) designed for SMBs, offering Intel Core Ultra processors, AI-driven performance, and high durability (MIL-STD-810H). It features 16:10 WUXGA displays, up to 64GB DDR5 RAM, and robust security including an optional fingerprint reader and privacy shutter.",
    image_key: "Thickbook",
  },
  {
    id: 6,
    name: "Apple Macbook Neo 13",
    price: 77000,
    newprice: 75990,
    description:
      " is an entry-level laptop featuring the A18 Pro chip, designed for AI-driven performance, a 13-inch Liquid Retina display (2408x1506), and up to 16 hours of battery life. It comes in four colors with a durable, 60% recycled aluminum body and starts at a competitive price point in the Apple lineup.",
    image_key: "Neo",
  },
  {
    id: 7,
    name: "HP Victus Hyper Edition",
    price: 98000,
    newprice: 92499,
    description:
      "A high performance gaming option featuring customizable RGB keys, rapid refresh rates, Intel Core i7 processor, and enhanced graphics capabilities.",
    image_key: "hphyper",
  }
];

const fallbackOrders = [
  {
    id: 101,
    total_price: 157899,
    status: "processing",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    items: [
      {
        id: 1,
        product_name: "Asus Rog Strix G16",
        image_key: "Asus",
        quantity: 1,
        price: 157899
      }
    ]
  },
  {
    id: 102,
    total_price: 156757,
    status: "pending",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    items: [
      {
        id: 2,
        product_name: "Lenovo LOQ",
        image_key: "Lenovo",
        quantity: 1,
        price: 83890
      },
      {
        id: 5,
        product_name: "Lenovo ThinkBook 14",
        image_key: "Thickbook",
        quantity: 1,
        price: 72867
      }
    ]
  }
];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isSignUp, setIsSignUp] = useState(false);

  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  // View states for products tab
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Toast State
  const [toasts, setToasts] = useState([]);

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    newprice: "",
    description: "",
    image_key: "Asus",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
      fetchOrders();
      fetchProducts();
    }
  }, []);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch(`${API_URL}/api/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        addToast("Registration successful! You can now log in.", "success");
        setIsSignUp(false);
      } else {
        setLoginError(data.error || "Failed to sign up");
        addToast(data.error || "Registration failed", "error");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Failed to connect to the authentication server.");
      addToast("Server connection error.", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        addToast("Welcome back, administrator!", "success");
        fetchOrders();
        fetchProducts();
      } else {
        setLoginError(data.error || "Invalid credentials");
        addToast("Login failed: Invalid credentials.", "error");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Failed to connect to the authentication server.");
      addToast("Failed to authenticate with backend server.", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setOrders([]);
    setProducts([]);
    addToast("Logged out of session.", "info");
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        throw new Error("Could not fetch orders");
      }
    } catch (err) {
      console.error(err);
      setOrders(fallbackOrders);
      addToast("Orders backend offline. Loading offline records.", "warning");
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error("Could not fetch products");
      }
    } catch (err) {
      console.error(err);
      setProducts(fallbackProductsData);
      addToast("Products database offline. Loading local inventory mockup.", "warning");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/admin/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          newprice: parseFloat(newProduct.newprice),
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        addToast("Product added successfully!", "success");
        setShowAddForm(false);
        setNewProduct({
          name: "",
          price: "",
          newprice: "",
          description: "",
          image_key: "Asus",
        });
        fetchProducts();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      const simulated = {
        ...newProduct,
        id: Date.now(),
        price: parseFloat(newProduct.price),
        newprice: parseFloat(newProduct.newprice),
      };
      setProducts((prev) => [simulated, ...prev]);
      addToast("Product added to local simulation catalog!", "success");
      setShowAddForm(false);
      setNewProduct({
        name: "",
        price: "",
        newprice: "",
        description: "",
        image_key: "Asus",
      });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          ...editingProduct,
          price: parseFloat(editingProduct.price),
          newprice: parseFloat(editingProduct.newprice),
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        addToast("Product updated successfully!", "success");
        setEditingProduct(null);
        fetchProducts();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
              ...editingProduct,
              price: parseFloat(editingProduct.price),
              newprice: parseFloat(editingProduct.newprice),
            }
            : p
        )
      );
      addToast("Product updated in local catalog memory!", "success");
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        addToast("Product deleted successfully!", "success");
        fetchProducts();
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addToast("Product removed from local simulation!", "success");
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        addToast("Order status updated successfully!", "success");
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      addToast("Order status updated in local simulation database.", "success");
    }
  };

  // Metric variables
  const totalLaptops = products.length;
  const avgPrice = products.length > 0
    ? Math.round(products.reduce((acc, p) => acc + (parseFloat(p.newprice) || 0), 0) / products.length)
    : 0;
  const maxDiscount = products.length > 0
    ? Math.max(...products.map(p => {
      const orig = parseFloat(p.price) || 0;
      const promo = parseFloat(p.newprice) || 0;
      return orig > promo ? Math.round(((orig - promo) / orig) * 100) : 0;
    }))
    : 0;

  // Filter & Search & Sort Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "all" ||
      product.image_key.toLowerCase() === selectedBrand.toLowerCase() ||
      (selectedBrand === "others" && !["asus", "lenovo", "hp", "dell", "neo", "thickbook", "hphyper"].includes(product.image_key.toLowerCase()));

    return matchesSearch && matchesBrand;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return (parseFloat(a.newprice) || 0) - (parseFloat(b.newprice) || 0);
    }
    if (sortBy === "price-high") {
      return (parseFloat(b.newprice) || 0) - (parseFloat(a.newprice) || 0);
    }
    if (sortBy === "discount") {
      const discA = a.price && a.price > a.newprice ? (a.price - a.newprice) / a.price : 0;
      const discB = b.price && b.price > b.newprice ? (b.price - b.newprice) / b.price : 0;
      return discB - discA;
    }
    if (sortBy === "name-asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  if (!isLoggedIn) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-glass-card">
          <div className="login-header">
            <ClipboardList className="login-logo-icon" size={40} />
            <h2>{isSignUp ? "Create Admin Account" : "Owner Administration Portal"}</h2>
            <p>{isSignUp ? "Register a new administrative username & password" : "Access laptop shop inventory & orders dashboard"}</p>
          </div>
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="login-form">
            {loginError && <div className="login-error-msg">{loginError}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isSignUp ? "Choose username" : "Enter owner username"}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? "Choose secure password" : "Enter password"}
                required
              />
            </div>
            <button type="submit" className="login-submit-btn">
              {isSignUp ? "Register Admin Account" : "Authenticate Account"}
            </button>

            <div className="login-toggle-mode" style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setLoginError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#2563eb",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600"
                }}
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an admin account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render variables for Modals live review card
  const modalLiveData = editingProduct || newProduct;
  const modalLiveDiscount = modalLiveData.price && modalLiveData.newprice && parseFloat(modalLiveData.price) > parseFloat(modalLiveData.newprice)
    ? Math.round(((parseFloat(modalLiveData.price) - parseFloat(modalLiveData.newprice)) / parseFloat(modalLiveData.price)) * 100)
    : 0;

  return (
    <div className="admin-dashboard-container container">
      {/* Upper header action bar */}
      <div className="admin-header-bar">
        <div>
          <h2>Owner Management Center</h2>
          <p className="subtitle">Welcome back, Shop Manager</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Main Grid: Sidebar + Tabs Area */}
      <div className="admin-grid">
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <button
            onClick={() => setActiveTab("orders")}
            className={`sidebar-tab ${activeTab === "orders" ? "active" : ""}`}
          >
            <ClipboardList size={20} />
            <span>Store Orders</span>
            {orders.length > 0 && <span className="badge-count">{orders.length}</span>}
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`sidebar-tab ${activeTab === "products" ? "active" : ""}`}
          >
            <Package size={20} />
            <span>Manage Products</span>
            {products.length > 0 && <span className="badge-count">{products.length}</span>}
          </button>
        </aside>

        {/* Content body */}
        <main className="admin-main-content">
          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="tab-pane">
              <div className="pane-header">
                <h3>Order Log Book</h3>
                <button onClick={fetchOrders} className="refresh-btn">
                  <RefreshCw size={14} style={{ marginRight: 6 }} />
                  Reload Orders
                </button>
              </div>

              {loadingOrders ? (
                <div className="loading-state">Fetching active orders database...</div>
              ) : orders.length === 0 ? (
                <div className="empty-state">No orders have been placed yet.</div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card-panel">
                      <div className="order-panel-header">
                        <div className="order-meta">
                          <span className="order-id">Order ID: #{order.id}</span>
                          <span className="order-date">
                            {new Date(order.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="order-action-group">
                          <div className="order-price-summary">
                            <span>Total Price: </span>
                            <strong>₹{parseFloat(order.total_price).toLocaleString("en-IN")}</strong>
                          </div>
                          <select
                            className={`status-select status-${order.status}`}
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>

                      {/* Items details accordion style list */}
                      <div className="order-items-detail">
                        <h4>Items Ordered</h4>
                        <div className="items-table-wrapper">
                          <table className="items-table">
                            <thead>
                              <tr>
                                <th>Product Name</th>
                                <th>Image Key</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items?.map((item) => (
                                <tr key={item.id}>
                                  <td className="product-name-cell">
                                    <ShoppingBag size={14} style={{ marginRight: 8 }} />
                                    {item.product_name}
                                  </td>
                                  <td><span className="img-key-badge">{item.image_key}</span></td>
                                  <td>{item.quantity}</td>
                                  <td>₹{parseFloat(item.price).toLocaleString("en-IN")}</td>
                                  <td>₹{(parseFloat(item.price) * item.quantity).toLocaleString("en-IN")}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div className="tab-pane">
              {/* Stats widgets section */}
              <div className="admin-stats-container">
                <div className="stats-card">
                  <div className="stats-icon-wrapper blue">
                    <Laptop size={22} />
                  </div>
                  <div className="stats-info">
                    <span className="stats-label">Laptops Catalog</span>
                    <span className="stats-number">{totalLaptops} Model{totalLaptops !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="stats-card">
                  <div className="stats-icon-wrapper green">
                    <DollarSign size={22} />
                  </div>
                  <div className="stats-info">
                    <span className="stats-label">Avg Retail Price</span>
                    <span className="stats-number">₹{avgPrice.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="stats-card">
                  <div className="stats-icon-wrapper purple">
                    <Percent size={22} />
                  </div>
                  <div className="stats-info">
                    <span className="stats-label">Peak Promo Discount</span>
                    <span className="stats-number">{maxDiscount}% OFF</span>
                  </div>
                </div>
              </div>

              <div className="pane-header">
                <h3>Store Laptops Catalog</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="add-new-product-btn"
                >
                  <Plus size={18} />
                  <span>Add Laptop Model</span>
                </button>
              </div>

              {/* Advanced Filter, Search, View Toggle Controls */}
              <div className="admin-controls-bar">
                <div className="search-box-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, specs or description..."
                    className="search-input"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="clear-search-btn">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="filters-dropdowns-group">
                  <div className="filter-group-item">
                    <label htmlFor="brand-filter">Brand:</label>
                    <select
                      id="brand-filter"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="control-select"
                    >
                      <option value="all">All Brands</option>
                      <option value="asus">Asus</option>
                      <option value="lenovo">Lenovo</option>
                      <option value="hp">HP</option>
                      <option value="dell">Dell</option>
                      <option value="neo">Neo</option>
                      <option value="thickbook">ThinkBook</option>
                      <option value="hphyper">HP Hyper</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <div className="filter-group-item">
                    <label htmlFor="sort-filter">Sort:</label>
                    <select
                      id="sort-filter"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="control-select"
                    >
                      <option value="default">Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="discount">Promo Discount</option>
                      <option value="name-asc">Name: A to Z</option>
                      <option value="name-desc">Name: Z to A</option>
                    </select>
                  </div>

                  <div className="view-toggle-buttons">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                      title="Grid View"
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("table")}
                      className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                      title="Table View"
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {loadingProducts ? (
                <div className="loading-state">
                  <div className="spinner-loader"></div>
                  <p style={{ marginTop: 12 }}>Loading catalog database...</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag size={48} style={{ color: "#cbd5e1", marginBottom: 16 }} />
                  <h4>No Laptop Models Found</h4>
                  <p>Try adjusting your search query, changing the brand filter, or add a new record.</p>
                  {(searchTerm || selectedBrand !== "all") && (
                    <button
                      className="secondary-btn"
                      style={{ marginTop: 16 }}
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedBrand("all");
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                /* GRID VIEW RENDER */
                <div className="admin-products-grid">
                  {sortedProducts.map((product) => {
                    const discount = product.price && product.newprice && parseFloat(product.price) > parseFloat(product.newprice)
                      ? Math.round(((parseFloat(product.price) - parseFloat(product.newprice)) / parseFloat(product.price)) * 100)
                      : 0;
                    return (
                      <div key={product.id} className="admin-product-card">
                        <div className="card-img-container">
                          <img
                            src={product.image_key && product.image_key.startsWith("http") ? product.image_key : (imageMap[product.image_key] || Asus)}
                            alt={product.name}
                            className="card-img"
                          />
                          {discount > 0 && <span className="card-discount-tag">-{discount}% OFF</span>}
                          <div className="card-overlay-actions">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="card-action-btn edit-btn"
                              title="Edit Laptop Details"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="card-action-btn delete-btn"
                              title="Delete Laptop Record"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="card-content">
                          <div className="card-brand-row">
                            <span className="card-brand-badge">{product.image_key || "Laptop"}</span>
                            <span className="card-id-badge">ID: #{product.id}</span>
                          </div>
                          <h4 className="card-title">{product.name}</h4>
                          <div className="card-prices">
                            <span className="card-price-old">₹{parseFloat(product.price).toLocaleString("en-IN")}</span>
                            <span className="card-price-new">₹{parseFloat(product.newprice).toLocaleString("en-IN")}</span>
                          </div>
                          <p className="card-desc" title={product.description}>{product.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* TABLE VIEW RENDER */
                <div className="admin-products-table-container">
                  <table className="admin-products-table">
                    <thead>
                      <tr>
                        <th>Product Preview</th>
                        <th>Brand & ID</th>
                        <th>Name</th>
                        <th>Original Price</th>
                        <th>Promo Price</th>
                        <th>Discount</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedProducts.map((product) => {
                        const discount = product.price && product.newprice && parseFloat(product.price) > parseFloat(product.newprice)
                          ? Math.round(((parseFloat(product.price) - parseFloat(product.newprice)) / parseFloat(product.price)) * 100)
                          : 0;
                        return (
                          <tr key={product.id}>
                            <td className="img-preview-cell">
                              <img
                                src={product.image_key && product.image_key.startsWith("http") ? product.image_key : (imageMap[product.image_key] || Asus)}
                                alt={product.name}
                                className="table-img-preview"
                              />
                            </td>
                            <td>
                              <div className="table-brand-id">
                                <span className="table-brand-tag">{product.image_key || "Generic"}</span>
                                <span className="table-id-tag">#{product.id}</span>
                              </div>
                            </td>
                            <td className="font-semibold">{product.name}</td>
                            <td className="price-old">₹{parseFloat(product.price).toLocaleString("en-IN")}</td>
                            <td className="price-new font-semibold">₹{parseFloat(product.newprice).toLocaleString("en-IN")}</td>
                            <td>
                              {discount > 0 ? (
                                <span className="table-discount-badge">-{discount}% OFF</span>
                              ) : (
                                <span className="table-discount-none">0%</span>
                              )}
                            </td>
                            <td className="desc-cell" title={product.description}>{product.description}</td>
                            <td className="actions-cell">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="action-btn edit-btn"
                                title="Edit Laptop Details"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="action-btn delete-btn"
                                title="Delete Product"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT PRODUCT MODALS OVERLAY */}
      {(showAddForm || editingProduct) && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card split-layout">
            {/* Left side: Form Input details */}
            <div className="modal-form-section">
              <div className="modal-header">
                <h3>{editingProduct ? `Edit Laptop Specs: ${editingProduct.name}` : "Add New Laptop Model"}</h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                  }}
                  className="close-modal-btn"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="modal-form"
              >
                <div className="form-group">
                  <label>Laptop Name</label>
                  <input
                    type="text"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, name: e.target.value });
                      } else {
                        setNewProduct({ ...newProduct, name: e.target.value });
                      }
                    }}
                    placeholder="e.g. Asus Rog Strix G16"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Brand Preset Asset</label>
                  <div className="brand-selector-grid">
                    {imageKeys.map((key) => (
                      <button
                        key={key}
                        type="button"
                        className={`brand-selector-btn ${modalLiveData.image_key === key ? "active" : ""
                          }`}
                        onClick={() => {
                          if (editingProduct) {
                            setEditingProduct({ ...editingProduct, image_key: key });
                          } else {
                            setNewProduct({ ...newProduct, image_key: key });
                          }
                        }}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Or enter custom Image URL / External Key</label>
                  <input
                    type="text"
                    value={editingProduct ? editingProduct.image_key : newProduct.image_key}
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, image_key: e.target.value });
                      } else {
                        setNewProduct({ ...newProduct, image_key: e.target.value });
                      }
                    }}
                    placeholder="e.g. https://domain.com/laptop.jpg"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Original Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct ? editingProduct.price : newProduct.price}
                      onChange={(e) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, price: e.target.value });
                        } else {
                          setNewProduct({ ...newProduct, price: e.target.value });
                        }
                      }}
                      placeholder="e.g. 159999"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Promo Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct ? editingProduct.newprice : newProduct.newprice}
                      onChange={(e) => {
                        if (editingProduct) {
                          setEditingProduct({ ...editingProduct, newprice: e.target.value });
                        } else {
                          setNewProduct({ ...newProduct, newprice: e.target.value });
                        }
                      }}
                      placeholder="e.g. 157899"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Laptop Description & Specs</label>
                  <textarea
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => {
                      if (editingProduct) {
                        setEditingProduct({ ...editingProduct, description: e.target.value });
                      } else {
                        setNewProduct({ ...newProduct, description: e.target.value });
                      }
                    }}
                    placeholder="Provide laptop processor, GPU, screen properties, RAM details..."
                    rows={4}
                    required
                  />
                </div>

                <div className="modal-footer-actions">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingProduct(null);
                    }}
                    className="secondary-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingProduct ? "Save Changes" : "Create Laptop Record"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right side: Live Preview rendering */}
            <div className="modal-preview-section">
              <div className="preview-heading">Live Preview</div>
              <div className="live-preview-container">
                <div className="admin-product-card preview-mode-card">
                  <div className="card-img-container">
                    <img
                      src={
                        modalLiveData.image_key && modalLiveData.image_key.startsWith("http")
                          ? modalLiveData.image_key
                          : (imageMap[modalLiveData.image_key] || Asus)
                      }
                      alt="Product preview"
                      className="card-img"
                      onError={(e) => {
                        e.target.src = Asus;
                      }}
                    />
                    {modalLiveDiscount > 0 && (
                      <span className="card-discount-tag">-{modalLiveDiscount}% OFF</span>
                    )}
                  </div>
                  <div className="card-content">
                    <div className="card-brand-row">
                      <span className="card-brand-badge">{modalLiveData.image_key || "Brand"}</span>
                      <span className="card-id-badge">ID: #NEW</span>
                    </div>
                    <h4 className="card-title">{modalLiveData.name || "Enter Laptop Name"}</h4>
                    <div className="card-prices">
                      <span className="card-price-old">
                        ₹{parseFloat(modalLiveData.price || 0).toLocaleString("en-IN")}
                      </span>
                      <span className="card-price-new">
                        ₹{parseFloat(modalLiveData.newprice || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="card-desc">
                      {modalLiveData.description || "Enter laptop description and technical specifications to preview here in real time..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM PORTAL */}
      <div className="toast-portal">
        {toasts.map((t) => (
          <div key={t.id} className={`toast-card toast-${t.type}`}>
            <span className="toast-icon">
              {t.type === "success" && <CheckCircle2 size={18} />}
              {t.type === "error" && <X size={18} />}
              {t.type === "warning" && <Eye size={18} />}
              {t.type === "info" && <ShoppingBag size={18} />}
            </span>
            <span className="toast-message">{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

