import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import dumbbell from '../../assets/dumbbell.png'
import '../Header/header.css'
function Header() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const navItems = [
    { label: "Home", to: "/", icon: "bi bi-house" },
    { label: "AI Meals", to: "/ai-meals", icon: "bi bi-egg-fried" },
    { label: "Membership", to: "/membership", icon: "bi bi-credit-card" },
    { label: "Store", to: "/store", icon: "bi bi-bag" },
    { label: "Trainers", to: "/trainers", icon: "bi bi-people" },
    { label: "Exercises", to: "/exercises", icon: "bi bi-play" },
  ];

  return (
    <>

      <nav className="fitness-navbar">
        <div className="container-fluid">
 
          
          <Link className="fitness-brand" to="/">
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
                </Link>
              );
            })}
            
            <Link className="logout-link logout-mobile" to="/logout">
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </Link>
          </div>
 
          
          <Link className="logout-link logout-desktop" to="/logout">
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </Link>
 
        </div>
      </nav>
    </>
  );
}

export default Header;