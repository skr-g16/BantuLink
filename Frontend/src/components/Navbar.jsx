import { useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        BantuLink
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <>
          <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
          <li>
            <NavLink to="/login" id="logoutBtn" onClick={onLogout}>Logout</NavLink>
          </li>
          </>

        )}
      </ul>
    </nav>
  );
};