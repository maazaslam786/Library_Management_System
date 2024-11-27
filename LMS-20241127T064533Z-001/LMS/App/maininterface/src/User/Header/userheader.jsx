import "./userheader.css";
import logo from "../../assets/tempLogo.png";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <>
      <header id="SLHeader">
        <nav className="nav-bar">
          <ul>
            <li className="logo">
              <NavLink to="/user">
                <img src={logo} alt="logo" />
              </NavLink>
              SL Library
            </li>
            <div className="menu-items">
              <li>
                <NavLink
                  className={(e) => {
                    return e.isActive ? "active" : "";
                  }}
                  to="/search"
                >
                  Search
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(e) => {
                    return e.isActive ? "active" : "";
                  }}
                  to="/membership"
                >
                  Membership
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(e) => {
                    return e.isActive ? "active" : "";
                  }}
                  to="/borrow"
                >
                  Borrow History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(e) => {
                    return e.isActive ? "active" : "";
                  }}
                  to=""
                >
                  {props.name}
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
