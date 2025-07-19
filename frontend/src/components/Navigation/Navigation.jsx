import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger menu
import "./Navigation.css";

const Navigation = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home after logout
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="nav-logo">FoodHub</Link>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link className="nav-link" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link className="nav-link" to="/admin/add-restaurant" onClick={() => setMenuOpen(false)}>
                  Add Restaurant
                </Link>
              )}
              <Link
                className="nav-link logout-link"
                to="/"
                onClick={() => { handleLogout(); setMenuOpen(false); }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link className="nav-link" to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
