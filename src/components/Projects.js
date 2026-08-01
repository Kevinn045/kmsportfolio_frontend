
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects/`);
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-container">

        {/* Section heading */}
        <motion.div
          className="section-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">MY WORK</p>

          <h2>Featured Projects</h2>

          <p>
            A selection of applications and digital solutions I've built
            using modern web technologies.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="projects-message">
            <div className="project-spinner"></div>
            <p>Loading projects...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="projects-message projects-error">
            <p>{error}</p>
            <button
              className="project-retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="projects-message">
            <p>No projects available yet.</p>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">

            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -8 }}
              >

                {/* Image */}
                <div className="project-image-wrapper">
                  {project.image ? (
                    <img
                      src={`${API_URL}${project.image}`}
                      alt={project.title}
                      className="project-image"
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      No image available
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="project-content">

                  <h3>{project.title}</h3>

                  {project.description && (
                    <p className="project-description">
                      {project.description}
                    </p>
                  )}

                  {/* Technologies */}
                  {project.technologies && (
                    <div className="project-technologies">
                      {project.technologies
                        .split(",")
                        .map((technology) => (
                          <span key={technology.trim()}>
                            {technology.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="project-links">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-primary"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.live_demo && (
                      <a
                        href={project.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link project-link-secondary"
                      >
                        Live Demo ↗
                      </a>
                    )}

                  </div>

                </div>
              </motion.article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;