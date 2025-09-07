import React, { useState, useEffect } from "react";
import PopUpModel from "./PopUpModel";

const API_URL = import.meta.env.VITE_LOCALHOST;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // for API
  const [displayLanguage, setDisplayLanguage] = useState("English"); // for UI
  const [translations, setTranslations] = useState({});

  // Fetch translations whenever selectedLanguage changes
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`${API_URL}/translations/${selectedLanguage}`);
        if (!response.ok) throw new Error("Failed to fetch translations");
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTranslations();
  }, [selectedLanguage]);

  // Handle language selection from popup
  const handleSelect = (lang) => {
    if (lang === "English") {
      setSelectedLanguage("en");
      setDisplayLanguage("English");
    } else if (lang === "Svenska") {
      setSelectedLanguage("sv");
      setDisplayLanguage("Svenska");
    }
    setShowPopup(false);
  };

  // Get translation or fallback to key itself
  const t = (key) => translations[key] || key;

  return (
    <nav className="navbar">
      {/* Desktop Navbar */}
      <div className="main-nav">
        <picture className="logo">
          <img src="/diamond.png" alt="LOGO" />
        </picture>

        <div className="navbar-list">
          <ul>
            <li><a href="#">{t("Home")}</a></li>
            <li><a href="#">{t("Order")}</a></li>
            <li><a href="#">{t("Our Customer")}</a></li>
            <li><a href="#">{t("About Us")}</a></li>
            <li><a href="#">{t("Contact Us")}</a></li>

            {/* Language Selector */}
            <li className="language-selector">
              <a
                onClick={() => setShowPopup(!showPopup)}
                style={{ cursor: "pointer" }}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>

        {/* Mobile Language Selector */}
        <div className="english-mobile language-selector">
          <div
            onClick={() => setShowPopup(!showPopup)}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
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
            <li><a href="#">{t("Home")}</a></li>
            <li><a href="#">{t("Order")}</a></li>
            <li><a href="#">{t("Our Customer")}</a></li>
            <li><a href="#">{t("About Us")}</a></li>
            <li><a href="#">{t("Contact Us")}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
