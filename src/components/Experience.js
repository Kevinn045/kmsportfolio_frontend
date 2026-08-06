import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaLaptopCode,
  FaTools,
  FaUsers,
} from "react-icons/fa";

function Experience() {
  return (
    <section id="experience" className="experience-section">

      <div className="home-container">

        <div className="section-heading">
          <p className="section-label">
            PROFESSIONAL EXPERIENCE
          </p>

          <h2>Applying technology to solve real-world problems.</h2>
        </div>

        <motion.div
          className="experience-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <div className="experience-top">

            <div>
              <h3>ICT Intern</h3>

              <span>
                Public Service Commission
              </span>
            </div>

            <div className="experience-badge">
              Current
            </div>

          </div>

          <p className="experience-description">
            Supporting ICT operations while gaining practical
            experience in enterprise systems, user support,
            digital transformation and software solutions.
          </p>

          <div className="experience-grid">

            <div className="experience-item">
              <FaLaptopCode />
              <span>Software Support</span>
            </div>

            <div className="experience-item">
              <FaTools />
              <span>Hardware Troubleshooting</span>
            </div>

            <div className="experience-item">
              <FaUsers />
              <span>User Support</span>
            </div>

            <div className="experience-item">
              <FaBriefcase />
              <span>Business Information Systems</span>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Experience;