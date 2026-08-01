
import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="about-container">

        <motion.div
          className="about-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">ABOUT ME</p>

          <h2>
            Building technology with
            <span> purpose.</span>
          </h2>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p>
            I'm Kevin Muse, a Business Information Technology graduate
            interested in building practical digital solutions through
            software development and modern web technologies.
          </p>

          <p>
            My work combines backend development with Django and Python,
            frontend development with React, REST APIs, databases, and
            emerging AI technologies.
          </p>

          <p>
            I enjoy taking an idea, turning it into a working application,
            and continuously improving it through better design,
            functionality, and user experience.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
