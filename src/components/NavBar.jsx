import React, { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo (desktop only) */}
      <picture className="logo">
        <img src="/diamond.png" alt="LOGO" />
      </picture>

      {/* Desktop Nav Links */}
      <div className="navbar-list">
        <h1>Home</h1>
        <h1>Order</h1>
        <h1>Our Customer</h1>
        <h1>About Us</h1>
        <h1>Contact Us</h1>
        <h1 className="english">
          English
          <picture className="language">
            <img src="/uk.png" alt="English" />
          </picture>
        </h1>
      </div>

      {/* Mobile navbar: Hamburger + English */}
      <div className="mobile-nav">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hamburger-icon">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="english-mobile">
          <h1>English</h1>
          <picture className="language">
            <img src="/uk.png" alt="English" />
          </picture>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <h1>Home</h1>
        <h1>Order</h1>
        <h1>Our Customer</h1>
        <h1>About Us</h1>
        <h1>Contact Us</h1>
      </div>
    </nav>
  );
};

export default NavBar;
