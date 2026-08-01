
import { motion } from "framer-motion";

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
            BUSINESS INFORMATION TECHNOLOGY GRADUATE
          </p>

          <h1>
            Hi, I'm <span>Kevin Muse.</span>
          </h1>

          <h2>
            I build modern web applications,
            <br />
            APIs and <strong>AI-powered solutions.</strong>
          </h2>

          <p className="hero-description">
            I'm passionate about turning ideas into practical digital
            experiences using Python, Django, React and artificial
            intelligence.
          </p>

          <div className="hero-buttons">

            <a
              href="#projects"
              className="hero-btn hero-btn-primary"
            >
              View My Projects
              <span>→</span>
            </a>

            <a
              href="#contact"
              className="hero-btn hero-btn-secondary"
            >
              Let's Talk
            </a>

          </div>

          <div className="hero-tech">

            <span>Python</span>
            <span>Django</span>
            <span>React</span>
            <span>AI</span>
            <span>REST APIs</span>

          </div>

        </motion.div>

        {/* Hero visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >

          <div className="hero-card">

            {/* Card header */}
            <div className="hero-card-top">

              <div className="availability">
                <span className="status-dot"></span>

                <span>
                  Available for opportunities
                </span>
              </div>

              <div className="window-controls">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

            {/* Code */}
            <div className="code-window">

              <div className="code-line code-comment">
                // what I enjoy building
              </div>

              <div className="code-line">
                <span className="code-keyword">const</span>{" "}
                developer = {"{"}
              </div>

              <div className="code-line code-indent">
                name: <span className="code-string">
                  "Kevin Muse"
                </span>,
              </div>

              <div className="code-line code-indent">
                stack: <span className="code-string">
                  "Python + Django + React"
                </span>,
              </div>

              <div className="code-line code-indent">
                interest: <span className="code-string">
                  "AI & Web Development"
                </span>,
              </div>

              <div className="code-line">
                {"}"}
              </div>

            </div>

            {/* Card footer */}
            <div className="hero-card-footer">

              <span>Backend</span>
              <span>Frontend</span>
              <span>AI</span>

            </div>

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

