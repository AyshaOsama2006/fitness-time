import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";

const API_BASE = "http://localhost:5000";

const getImageUrl = (image) => {
  if (!image) return "";
  return image.startsWith("http") ? image : `${API_BASE}${image}`;
};

function Checkout() {
  const token = localStorage.getItem("token");

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    shippingName: "",
    shippingPhone: "",
    shippingAddress: ""
  });

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
    }
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCart();
    const prefillFromLastOrder = async () => {
      try {
        const res = await fetch(`${API_BASE}/orders/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok || !Array.isArray(data) || data.length === 0) {
          return;
        }

        const lastOrder = data[0];
        setForm((prev) => ({
          shippingName: prev.shippingName || lastOrder.shippingName || "",
          shippingPhone: prev.shippingPhone || lastOrder.shippingPhone || "",
          shippingAddress: prev.shippingAddress || lastOrder.shippingAddress || ""
        }));
      } catch (err) {
        
      }
    };

    prefillFromLastOrder();
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

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.lineTotal, 0);
  }, [items]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.shippingName || !form.shippingPhone || !form.shippingAddress) {
      setError("Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");

      setOrder(data);
      window.dispatchEvent(new Event("cart:updated"));
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="checkout-page">
        <div className="checkout-card">
          <h2>Login required</h2>
          <p>Please login to complete checkout.</p>
          <Link className="checkout-primary" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <i className="bi bi-check-circle"></i>
          </div>
          <h2>Order placed successfully</h2>
          <p>Order #{order.id} is confirmed. We will contact you soon.</p>
          <div className="success-actions">
            <Link className="checkout-primary" to="/store">
              Back to Store
            </Link>
            <Link className="checkout-secondary" to="/cart">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-hero-content">
          <span className="checkout-pill">Checkout</span>
          <h1>
            Confirm <span>Your Order</span>
          </h1>
          <p>Cash on delivery. Provide your shipping details.</p>
        </div>
      </section>

      <div className="checkout-shell">
        <div className="checkout-card">
          <h2>Shipping Details</h2>

          {loading && <p className="checkout-note">Loading cart...</p>}
          {!loading && error && <p className="checkout-error">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <div className="checkout-empty">
              <h3>Your cart is empty</h3>
              <p>Return to the store and add items.</p>
              <Link className="checkout-primary" to="/store">
                Go to Store
              </Link>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <form onSubmit={handleSubmit} className="checkout-form">
              <label>
                Full Name
                <input
                  name="shippingName"
                  type="text"
                  value={form.shippingName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </label>
              <label>
                Phone Number
                <input
                  name="shippingPhone"
                  type="text"
                  value={form.shippingPhone}
                  onChange={handleChange}
                  placeholder="05x xxx xxxx"
                  required
                />
              </label>
              <label>
                Address
                <textarea
                  name="shippingAddress"
                  rows="3"
                  value={form.shippingAddress}
                  onChange={handleChange}
                  placeholder="City, street, building"
                  required
                />
              </label>

              <button className="checkout-primary" type="submit" disabled={submitting}>
                {submitting ? "Placing order..." : "Place Order"}
              </button>
            </form>
          )}
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="checkout-item-image">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="checkout-image-placeholder">
                    <i className="bi bi-image"></i>
                  </div>
                )}
              </div>
              <div className="checkout-item-info">
                <h4>{item.name}</h4>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
              <div className="checkout-item-total">${item.lineTotal.toFixed(2)}</div>
            </div>
          ))}
          <div className="checkout-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
