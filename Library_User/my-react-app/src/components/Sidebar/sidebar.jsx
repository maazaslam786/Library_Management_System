import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
        <div className="menu-container">
          <h2>Menu</h2>
        </div>
        <ul>
          <li>BorrowHistory</li>
          <li>RequestBooks</li>
          <li>BooksOnDemand</li>
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </button>
    </div>
  );
};

export default Sidebar;
