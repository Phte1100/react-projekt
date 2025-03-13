import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [isActive, setIsActive] = useState(false); // Håller koll på om menyn är öppen

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation" style={{ marginRight: "5%", marginLeft: "5%" }}>
      <div className="navbar-brand">
        <NavLink to="/"><h1 className="title is-2">Moment 4</h1></NavLink>

        {/* Hamburgarikonen med klickhändelse */}
        <a 
          role="button" 
          className={`navbar-burger ${isActive ? "is-active" : ""}`} 
          aria-label="menu" 
          aria-expanded={isActive} 
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      {/* Navigationsmeny - visas endast om isActive är true */}
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Start
          </NavLink>

          {(user?.role === "admin" || user?.role === "editor") && (
            <NavLink to="/Cms" className="navbar-item">
              Administrera
            </NavLink>
          )}

          {(user?.role === "admin") && (
            <NavLink to="/users" className="navbar-item">
              Användare
            </NavLink>
          )}

          {!user && (
            <NavLink to="/register" className="navbar-item">
              Registrera
            </NavLink>
          )}
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!user ? (
              <NavLink to="/login">
                <button className="button is-dark" style={{ color: "white" }}>Logga in</button>
              </NavLink>
            ) : (
              <button onClick={logout} className="button is-dark">Logga ut</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
