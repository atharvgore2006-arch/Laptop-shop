// import React from 'react';
import { API_URL } from "../config";
import { Trash2, Plus, Minus, X } from "lucide-react";

const CartModal = ({ cart, removeFromCart, updateQuantity, closeCart, clearCart }) => {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice,
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`✅ Your order has been placed successfully! (Order ID: ${data.orderId})`);
        clearCart();
        closeCart();
      } else {
        alert(`❌ Failed to place order: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ A network error occurred while trying to place your order. Please check that the server is running.");
    }
  };

  return (
    <div className="cart-modal-overlay">
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={closeCart}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-modal-body">
          {cart.length === 0 ? (
            <div className="empty-cart-container">
              <p>Your cart is currently empty. Go add some awesome laptops!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price"> ₹{item.price}</p>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-modal-footer">
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="primary-button checkout-button">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
