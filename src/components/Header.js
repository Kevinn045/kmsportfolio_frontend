import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

function Header() {
  return (
    <header className="hero-section">
      <div className="hero-container">

        {/* Hero content */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="hero-eyebrow">
            BUSINESS INFORMATION TECHNOLOGY PROFESSIONAL
          </p>

          <h1>
            Hi, I'm <span>Kevin Muse.</span>
          </h1>

          <h2>
            I bridge <strong>business, technology</strong>
            <br />
            and digital solutions.
          </h2>

          <p className="hero-description">
            I'm a Business Information Technology graduate with a broad
            interest in software development, IT support, business systems,
            data, artificial intelligence and digital transformation.
            I enjoy using technology to solve practical problems and help
            organizations work smarter.
          </p>

          <div className="hero-buttons">

            <a
              href="#projects"
              className="hero-btn hero-btn-primary"
            >
              Explore My Work
              <span>→</span>
            </a>

            <a
              href="#contact"
              className="hero-btn hero-btn-secondary"
            >
              Let's Talk
            </a>

            <a
              href="/Kevin_Muse_CV.pdf"
              download
              className="hero-btn download-cv-btn"
            >
              <FaDownload />
              <span>Download CV</span>
            </a>
          </div>

          <div className="hero-tech">
            <span>Software Development</span>
            <span>IT Support</span>
            <span>Business Systems</span>
            <span>Data</span>
            <span>AI & Automation</span>
          </div>

        </motion.div>

        {/* Hero visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >

          <div className="hero-photo-wrapper">

            <div className="hero-availability">
              <span className="status-dot"></span>
              <span>Available for opportunities</span>
            </div>

            <img
              src="/profile.png"
              alt="Kevin Muse"
              className="hero-photo"
            />

          </div>

        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>Scroll to explore</span>
        <span className="scroll-arrow">↓</span>
      </motion.div>

    </header>
  );
}

export default Header;