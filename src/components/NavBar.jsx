import React, { useState, useEffect } from "react";
import PopUpModel from "./PopUpModel";

const API_URL = import.meta.env.VITE_LOCALHOST;

const NavBar = ({ selectedLanguage, setSelectedLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [displayLanguage, setDisplayLanguage] = useState(
    selectedLanguage === "en" ? "English" : "Svenska"
  );
  const [navItems, setNavItems] = useState([]);

  // Update displayLanguage when parent changes
  useEffect(() => {
    setDisplayLanguage(selectedLanguage === "en" ? "English" : "Svenska");
  }, [selectedLanguage]);

  // Fetch nav translations
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`${API_URL}/api/translations/${selectedLanguage}`);
        if (!response.ok) throw new Error("Failed to fetch translations");
        const data = await response.json();

        let navValues = [];
        if (Array.isArray(data)) {
          navValues = data
            .filter((item) => item.key.startsWith("nav."))
            .map((item) => item.value);
        } else if (typeof data === "object") {
          const navKeys = ["Home", "Order", "Our Customer", "About Us", "Contact Us"];
          navValues = navKeys.map((key) => data[key] || key);
        }

        setNavItems(navValues);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTranslations();
  }, [selectedLanguage]);

  const handleSelect = (lang) => {
    if (lang === "English") setSelectedLanguage("en");
    if (lang === "Svenska") setSelectedLanguage("sv");
    setShowPopup(false);
  };

  return (
    <nav className="navbar">
      {/* Desktop Navbar */}
      <div className="main-nav">
        <picture className="logo">
          <img src="/diamond.png" alt="LOGO" />
        </picture>

        <div className="navbar-list">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}

            <li className="language-selector">
              <a
                onClick={() => setShowPopup(!showPopup)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
              >
                {displayLanguage}
                <picture className="language">
                  <img
                    src={displayLanguage === "English" ? "/uk.png" : "/SE.png"}
                    alt={displayLanguage}
                  />
                </picture>
              </a>
              {showPopup && <PopUpModel onSelect={handleSelect} />}
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="mobile-nav">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="hamburger-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>

        <div className="english-mobile language-selector">
          <div
            onClick={() => setShowPopup(!showPopup)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <h1>{displayLanguage}</h1>
            <picture className="language">
              <img
                src={displayLanguage === "English" ? "/uk.png" : "/SE.png"}
                alt={displayLanguage}
              />
            </picture>
          </div>

          {showPopup && <PopUpModel onSelect={handleSelect} />}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
