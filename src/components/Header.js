
import { motion } from "framer-motion";


function Header() {
  return (
    <header className="hero-section">
      <div className="hero-container">

        {/* Hero text */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="hero-eyebrow">
            BUSINESS INFORMATION TECHNOLOGY GRADUATE
          </p>

          <h1>
            Hi, I'm <span>Kevin Muse.</span>
          </h1>

          <h2>
            I build modern web applications with
            <strong> Python, Django, React & AI.</strong>
          </h2>

          <p className="hero-description">
            I’m a Business Information Technology graduate passionate about
            building practical, user-focused digital solutions and exploring
            the possibilities of artificial intelligence.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="hero-btn hero-btn-primary">
              View My Projects
            </a>

            <a href="#contact" className="hero-btn hero-btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="hero-tech">
            <span>Python</span>
            <span>Django</span>
            <span>React</span>
            <span>AI</span>
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-card">
            <div className="hero-card-top">
              <span className="status-dot"></span>
              <span>Available for opportunities</span>
            </div>

            <div className="code-window">
              <span className="code-comment">
                {'//what I enjoy building'}
              </span>

              <span>
                <b>const</b> developer = {"{"}
              </span>

              <span className="code-indent">
                name: <strong>"Kevin Muse"</strong>,
              </span>

              <span className="code-indent">
                stack: <strong>"Python + Django + React"</strong>,
              </span>

              <span className="code-indent">
                interest: <strong>"AI & Web Development"</strong>
              </span>

              <span>{"}"}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </header>
  );
}

export default Header;


