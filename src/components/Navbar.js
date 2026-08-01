
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <nav className="portfolio-navbar">
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand">
          Kevin<span>.</span>
        </Link>

        {/* Navigation */}
        <div className="navbar-links">

          <a href="/#about">
            About
          </a>

          <a href="/#skills">
            Skills
          </a>

          <a href="/#projects">
            Projects
          </a>

          <Link to="/blog">
            Blog
          </Link>

          <a href="/#contact">
            Contact
          </a>

          {/* Admin navigation */}
          {token && (
            <Link to="/dashboard" className="navbar-dashboard">
              Dashboard
            </Link>
          )}

          {!token ? (
            <Link to="/login" className="navbar-login">
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="navbar-logout"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;

