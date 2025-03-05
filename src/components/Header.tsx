import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user, logout } = useAuth();

    return ( 
      <nav className="navbar" role="navigation" aria-label="main navigation"  style={{marginRight: "5%", marginLeft: "5%"}}>
      <div className="navbar-brand">
      <NavLink to="/"><h1 className="title is-2">Moment 4</h1></NavLink>

      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    </div>

    <div className="navbar-menu">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">
          Start
        </NavLink>
        <NavLink to="/Cms" className="navbar-item">
          Administrera
        </NavLink>
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
  }
  
  export default Header;