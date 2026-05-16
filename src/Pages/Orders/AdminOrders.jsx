import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminOrders.css";

const API_BASE = "https://fitness-time-backend-production.up.railway.app";

const getRoleFromToken = (token) => {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = JSON.parse(atob(padded));
    return decoded?.role || null;
  } catch (err) {
    return null;
  }
};

function AdminOrders() {
  const token = localStorage.getItem("token");
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (err) {
      return null;
    }
  })();

  const isAdmin = storedUser?.role === "admin" || getRoleFromToken(token) === "admin";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load orders");

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAdmin, token]);

  if (!token) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <h2>Login required</h2>
          <p>Please login with an admin account.</p>
          <Link className="orders-primary" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="orders-page">
        <div className="orders-empty">
          <h2>Access restricted</h2>
          <p>Only admins can view orders.</p>
          <Link className="orders-primary" to="/home">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <section className="orders-hero">
        <div className="orders-hero-content">
          <span className="orders-pill">Admin</span>
          <h1>
            Orders <span>Dashboard</span>
          </h1>
          <p>Track every order placed by your customers.</p>
        </div>
      </section>

      <div className="orders-shell">
        {loading && <p className="orders-note">Loading orders...</p>}
        {!loading && error && <p className="orders-error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <div className="orders-empty">
            <h2>No orders yet</h2>
            <p>New orders will appear here.</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="order-status">{order.status}</span>
                </div>

                <div className="order-meta">
                  <div>
                    <span>Customer</span>
                    <strong>{order.user?.name || "Unknown"}</strong>
                    <small>{order.user?.email}</small>
                  </div>
                  <div>
                    <span>Contact</span>
                    <strong>{order.shippingName}</strong>
                    <small>{order.shippingPhone}</small>
                  </div>
                  <div>
                    <span>Address</span>
                    <strong>{order.shippingAddress}</strong>
                  </div>
                </div>

                <div className="order-items">
                  {order.items?.map((item) => (
                    <div key={item.id} className="order-item">
                      <span>{item.product?.name || "Product"}</span>
                      <span>
                        {item.quantity} x ${Number(item.priceAtTime).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <span>Total</span>
                  <strong>${Number(order.totalAmount).toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
