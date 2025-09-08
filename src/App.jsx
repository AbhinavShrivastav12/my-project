// App.jsx
import { useEffect, useState } from "react";
import Button from "./components/Button";
import NavBar from "./components/NavBar";
import "./index.css";

const API_URL = import.meta.env.VITE_LOCALHOST;

function App() {
  const [content, setContent] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Current language

  // Fetch translations for paragraphs
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/translations/${selectedLanguage}`);
        if (!response.ok) throw new Error("Failed to fetch content");

        const data = await response.json();

        // Filter only paragraph keys
        const paragraphs = Array.isArray(data)
          ? data.filter((item) => item.key.startsWith("para.")).map((item) => item.value)
          : Object.keys(data)
              .filter((key) => key.startsWith("para."))
              .map((key) => data[key]);

        setContent(paragraphs);
      } catch (err) {
        console.error(err);
        setContent([]);
      }
    };

    fetchContent();
  }, [selectedLanguage]);

  // Render paragraphs with clickable "here" / "här"
  const renderParagraph = (para) => {
    const clickableWord = selectedLanguage === "en" ? "here" : "här";
    // Match the word with quotes around it
    const regex = new RegExp(`"${clickableWord}"`, "i");
    const parts = para.split(regex);

    if (parts.length === 1) return <p>{para}</p>;

    return (
      <p>
        {parts[0]}
        <a
          href="#" // Replace with your actual link
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue" }}
        >
          {clickableWord}
        </a>
        {parts[1]}
      </p>
    );
  };

  return (
    <main>
      <div className="app-background">
        <NavBar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        <div className="main-page">
          <h1>{selectedLanguage === "en" ? "Terms" : "Villkor"}</h1>

          <div className="button-wrapper">
            {/* Dynamic button */}
            <Button lang={selectedLanguage} />

            <div className="main-docs">
              {content.map((para, index) => (
                <span key={index}>{renderParagraph(para)}</span>
              ))}
            </div>

            <Button lang={selectedLanguage} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
