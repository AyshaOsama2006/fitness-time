import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const API_BASE = "http://localhost:5000";

const getImageUrl = (image) => {
  if (!image) return "";
  return image.startsWith("http") ? image : `${API_BASE}${image}`;
};

function Cart() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/carts/active/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 404) {
        setCart(null);
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load cart");

      setCart(data);
    } catch (err) {
      setError(err.message || "Failed to load cart");
    } finally {
      setLoading(false);
      window.dispatchEvent(new Event("cart:updated"));
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCart();
  }, [token]);

  const items = useMemo(() => {
    if (!cart?.products) return [];

    return cart.products.map((product) => {
      const join = product.Contains || {};
      const quantity = join.quantity || 1;
      const price = Number.isFinite(join.priceAtTime)
        ? join.priceAtTime
        : product.price;
      return {
        ...product,
        quantity,
        price,
        lineTotal: quantity * price,
        image: getImageUrl(product.image)
      };
    });
  }, [cart]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [items]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    setUpdatingId(productId);
    try {
      const res = await fetch(`${API_BASE}/carts/items/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update cart");

      await fetchCart();
    } catch (err) {
      setError(err.message || "Failed to update cart");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (productId) => {
    setUpdatingId(productId);
    try {
      const res = await fetch(`${API_BASE}/carts/items/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove item");

      await fetchCart();
    } catch (err) {
      setError(err.message || "Failed to remove item");
    } finally {
      setUpdatingId(null);
    }
  };

  if (!token) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Login required</h2>
          <p>Please login to view your cart.</p>
          <Link className="cart-primary" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div className="cart-hero-content">
          <span className="cart-pill">Your Cart</span>
          <h1>
            Review <span>Selections</span>
          </h1>
          <p>Adjust quantities and proceed to checkout.</p>
        </div>
      </section>

      <div className="cart-shell">
        <div className="cart-items">
          {loading && <p className="cart-note">Loading cart...</p>}
          {!loading && error && <p className="cart-error">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <p>Explore the store to add your first product.</p>
              <Link className="cart-primary" to="/store">
                Go to Store
              </Link>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <>
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="cart-image-placeholder">
                        <i className="bi bi-image"></i>
                      </div>
                    )}
                  </div>
                  <div className="cart-item-details">
                    <div>
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-qty">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={updatingId === item.id || item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={updatingId === item.id}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => handleRemove(item.id)}
                        disabled={updatingId === item.id}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total">
                    ${item.lineTotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="cart-primary"
            type="button"
            disabled={items.length === 0}
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
          <Link className="cart-secondary" to="/store">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
