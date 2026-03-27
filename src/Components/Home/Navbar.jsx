import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // ✅ استيراد NavLink

import "../../Pages/Home/Home.css";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <h2 className="logo">FITNESS TIME</h2>

        <ul className="nav-links-desktop">
          <li><a className="nav-link active">Home</a></li>
          <li><a className="nav-link">AI Nutrition</a></li>
          <li><a className="nav-link">Membership</a></li>
          <li><a className="nav-link">Store</a></li>
          <li><a className="nav-link">Trainers</a></li>
          <li><a className="nav-link">Profile</a></li>
          <li><a className="nav-link">Login</a></li>
          <li><a className="btn-join" href="#">Join Now</a></li>
        </ul>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a className="nav-link">Home</a>
        <a className="nav-link">AI Nutrition</a>
        <a className="nav-link">Membership</a>
        <a className="nav-link">Store</a>
        <a className="nav-link">Trainers</a>
        <a className="nav-link">Profile</a>
        <a className="nav-link">Login</a>
        <a className="btn-join" href="#">Join Now</a>
      </div>
    </nav>
  );
}

export default Navbar;
