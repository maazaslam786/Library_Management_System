import "./adminheader.css"
import logo from "../../assets/tempLogo.png"
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            <header id="SLHeader">
                <nav className="nav-bar">
                    <ul>
                        <li className="logo">
                            <NavLink to="/admin"><img src={logo} alt="logo" /></NavLink>SL Library
                        </li>
                        <div className="menu-items">
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/admin">Add Books</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/addstaff">Add Staff</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/adminreport">Report</NavLink></li>
                            <li><NavLink className={(e)=>{return e.isActive?"active":""}} to="/bookrequest">Book Request</NavLink></li>
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    );
}


export default Header