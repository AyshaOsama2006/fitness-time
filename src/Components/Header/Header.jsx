import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dumbbell from '../../assets/dumbbell.png'
import '../Header/header.css'

const API_BASE = "http://localhost:5000";

function Header() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [cartCount, setCartCount] = useState(0);

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

  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch (err) {
      return null;
    }
  };

  const user = getStoredUser();
  const tokenRole = getRoleFromToken(localStorage.getItem("token"));
  const isAdmin = user?.role === "admin" || tokenRole === "admin";

  const loadCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/carts/active/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 404) {
        setCartCount(0);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setCartCount(0);
        return;
      }

      const count = Array.isArray(data.products)
        ? data.products.reduce((sum, product) => {
            return sum + (product.Contains?.quantity || 0);
          }, 0)
        : 0;

      setCartCount(count);
    } catch (err) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();

    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cart:updated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cart:updated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  const baseNavItems = [
    { label: "Home", to: "/home", icon: "bi bi-house" },
    { label: "Nutrition", to: "/nutrition", icon: "bi bi-egg-fried" },
    { label: "Store", to: "/store", icon: "bi bi-bag" },
    { label: "Cart", to: "/cart", icon: "bi bi-cart" },
    { label: "Trainers", to: "/trainerspage", icon: "bi bi-people" },
    { label: "Profile", to: "/profile", icon: "bi bi-person" },
    { label: "Membership", to: "/membership", icon: "bi bi-card-checklist" },
  ];

  const navItems = isAdmin
    ? [
        ...baseNavItems.slice(0, 4),
        { label: "Add Product", to: "/store/add", icon: "bi bi-plus-circle" },
        { label: "Orders", to: "/admin/orders", icon: "bi bi-receipt" },
        ...baseNavItems.slice(4),
      ]
    : baseNavItems;


if (location.pathname === "/login") return null;
  return (
    <>

      <nav className="fitness-navbar">
        <div className="container-fluid">
 
          
          <Link className="fitness-brand" to="/home">
            <img src={dumbbell} alt="logo" width="30" />
            Fitness Time
          </Link>
 
          
          <button
            className="mobile-toggler bg-transparent border rounded px-2 py-1"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            style={{ borderColor: "#ef4444" }}
          >
            <i className="bi bi-list text-light fs-5"></i>
          </button>
 
          
          <div className={`fitness-center-nav ${collapsed ? "" : "open"}`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  className={`fitness-nav-link ${isActive ? "active-link" : ""}`}
                  to={item.to}
                >
                  <i className={item.icon}></i>
                  {item.label}
                  {item.to === "/cart" && cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </Link>
              );
            })}
            
            <Link className="logout-link logout-mobile" to="/login">
              <i className="bi bi-box-arrow-right"></i>
              Login
            </Link>
          </div>
 
          
          <Link className="logout-link logout-desktop" to="/login">
            <i className="bi bi-box-arrow-right"></i>
             Login
          </Link>
 
        </div>
      </nav>
    </>
  );
}

export default Header;