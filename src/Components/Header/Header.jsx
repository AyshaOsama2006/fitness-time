import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import dumbbell from '../../assets/dumbbell.png'
import '../Header/header.css'
function Header() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const navItems = [
  { label: "Home", to: "/home", icon: "bi bi-house" },
  { label: "Nutrition", to: "/nutrition", icon: "bi bi-egg-fried" },
  { label: "Store", to: "/store", icon: "bi bi-bag" },
  { label: "Trainers", to: "/trainerspage", icon: "bi bi-people" },
  { label: "Profile", to: "/profile", icon: "bi bi-person" },
  { label: "Membership", to: "/membership", icon: "bi bi-card-checklist" },
];


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