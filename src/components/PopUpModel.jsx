// PopUpModel.jsx
import React from "react";

const PopUpModel = ({ onSelect }) => {
  return (
    <div className="popup-dropdown">
      <ul>
        <li onClick={() => onSelect("English")}>
          English
          <img src="/uk.png" alt="English" className="flag" />
        </li>
        <li onClick={() => onSelect("Svenska")}>
          Svenska
          <img src="/SE.png" alt="Svenska" className="flag" />
        </li>
      </ul>
    </div>
  );
};

export default PopUpModel;
