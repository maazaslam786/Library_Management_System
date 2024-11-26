import React from "react";
import "./header.css";
import logo from "../assets/tempLogo.png";
import profileImg from "../assets/avatar.png";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <header id="SLHeader">
                <nav className="nav-bar">
                    <ul>
                        {/* Logo Section */}
                        <li className="logo">
                            <NavLink to="/">
                                <img src={logo} alt="logo" />
                            </NavLink>
                            SL Library
                        </li>

                        {/* Avatar Section */}
                        <li className="avatar-section">
                            <div className="staff-avatar">
                                <div className="avatar-container">
                                    <img
                                        src={profileImg}
                                        alt="Staff Avatar"
                                        className="avatar-image"
                                    />
                                </div>
                                <div className="staff-details">
                                    <h3 className="staff-name">Shahzaib Ahmed</h3>
                                    <p className="staff-role">Librarian</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
