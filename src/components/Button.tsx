import React, { useState, useEffect } from "react";

const Button = ({ lang = "en" }) => {
  const [label, setLabel] = useState("...");

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const res = await fetch(`/api/translations?key=btn.closeGoBack&lang=${lang}`);
        if (!res.ok) throw new Error("Failed to fetch translation");

        const data = await res.json();
        setLabel(data.value);
      } catch (err) {
        console.error(err);
        setLabel(lang === "en" ? "Close and Go Back" : "Stäng och gå tillbaka");
      }
    };

    fetchTranslation();
  }, [lang]);

  return <button className="button-main">{label}</button>;
};

export default Button;
