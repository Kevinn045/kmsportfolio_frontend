import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaLaptopCode,
  FaTools,
  FaUsers,
  FaNetworkWired,
  FaDatabase,
} from "react-icons/fa";

function Experience() {
  return (
    <section className="experience-section">
      <div className="home-container">

        <div className="section-heading">
          <p className="section-label">PROFESSIONAL EXPERIENCE</p>
          <h2>Practical IT experience and business technology expertise.</h2>
        </div>

        <motion.div
          className="experience-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <div className="experience-top">
            <div>
              <h3>ICT Intern</h3>
              <span>Public Service Commission</span>
            </div>

            <div className="experience-badge">
              Current
            </div>
          </div>

          <p className="experience-description">
            Supporting ICT operations while gaining practical experience in
            software systems, user support, networking, hardware maintenance,
            database systems and digital transformation initiatives.
          </p>

          <div className="experience-grid">

            <div className="experience-item">
              <FaLaptopCode />
              <span>Software Support</span>
            </div>

            <div className="experience-item">
              <FaTools />
              <span>Hardware Maintenance</span>
            </div>

            <div className="experience-item">
              <FaUsers />
              <span>End User Support</span>
            </div>

            <div className="experience-item">
              <FaNetworkWired />
              <span>Network Administration</span>
            </div>

            <div className="experience-item">
              <FaDatabase />
              <span>Database Systems</span>
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