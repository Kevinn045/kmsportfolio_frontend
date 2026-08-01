
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="portfolio-navbar">
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand-custom" onClick={closeMenu}>
          <span className="brand-mark">K</span>
          <span>Kevin Muse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <a href="/#about" onClick={closeMenu}>
            About
          </a>

          <a href="/#skills" onClick={closeMenu}>
            Skills
          </a>

          <a href="/#projects" onClick={closeMenu}>
            Projects
          </a>

          <Link to="/blog" onClick={closeMenu}>
            Blog
          </Link>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>

          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
