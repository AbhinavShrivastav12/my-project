import React from "react";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <picture>
          <img src="public/diamond.png" alt="LOGO" />
        </picture>
        <div className="navbar-list">
          <h1>Home</h1>
          <h1>Order</h1>
          <h1>Our Customer</h1>
          <h1>About Us</h1>
          <h1>Contact Us</h1>
          <h1>English</h1>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
