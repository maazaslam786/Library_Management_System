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
          <li>Dashboard</li>
          <li>Issue Requests</li>
          <li>Membership Management</li>
          <li>Book Inventory</li>
          <li>Reports</li>
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "❮" : "❯"}
      </button>
    </div>
  );
};

export default Sidebar;
