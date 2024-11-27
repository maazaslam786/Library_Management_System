import "./header.css"
import logo from "../assets/tempLogo.png"
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <header id="SLHeader">
                <nav className="nav-bar">
                    <ul>
                        <li className="logo">
                            <NavLink to="/"><img src={logo} alt="logo" /></NavLink>SL Library
                        </li>
                        <div className="menu-items">
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/search">Search</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/collection">Collection</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/services">Services</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/resources">Resources</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/contact">Contact us</NavLink></li>
                            <li className="login-button">
                                <NavLink to="/login">
                                    <button className="login">Login</button>
                                </NavLink>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    );
}


export default Header