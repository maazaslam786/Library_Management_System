// import React from "react";
import { NavLink } from "react-router-dom";
import "./staffSidebar.css";

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
    return (
        <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
            <div className={`custom-sidebar ${isOpen ? "open" : ""}`}>
                <div className="menu-container">
                    <h2>Menu</h2>
                </div>
                <ul>
                    <li>
                        <NavLink
                            to="/book-issue-approval"
                            className={({ isActive }) =>
                                isActive ? "active-link" : undefined
                            }
                            onClick={closeSidebar}
                        >
                            Approval Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/handle-book-requests"
                            className={({ isActive }) =>
                                isActive ? "active-link" : undefined
                            }
                            onClick={closeSidebar}
                        >
                            New Book Requests
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/generate-report"
                            className={({ isActive }) =>
                                isActive ? "active-link" : undefined
                            }
                            onClick={closeSidebar}
                        >
                            Generate Report
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/approve-memberships"
                            className={({ isActive }) =>
                                isActive ? "active-link" : undefined
                            }
                            onClick={closeSidebar}
                        >
                            Approve Memberships
                        </NavLink>
                    </li>
                </ul>
            </div>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? "❮" : "❯"}
            </button>
        </div>
    );
};

export default Sidebar;
