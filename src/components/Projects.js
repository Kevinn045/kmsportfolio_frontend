
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">

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

          <p className="section-description">
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
              onClick={fetchProjects}
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

                initial={{
                  opacity: 0,
                  y: 30
                }}

                whileInView={{
                  opacity: 1,
                  y: 0
                }}

                viewport={{
                  once: true,
                  margin: "-50px"
                }}

                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}

                whileHover={{
                  y: -8
                }}
              >

                {/* Project image */}
                <div className="project-image-wrapper">

                  {project.image ? (
                    <>
                      <img
                        src={`${API_URL}${project.image}`}
                        alt={`${project.title} project`}
                        className="project-image"
                        loading="lazy"
                      />

                      <div className="project-image-overlay">
                        <span>View Project</span>
                      </div>
                    </>
                  ) : (
                    <div className="project-image-placeholder">
                      <span>No preview available</span>
                    </div>
                  )}

                </div>

                {/* Project content */}
                <div className="project-content">

                  <div className="project-header">

                    <span className="project-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{project.title}</h3>

                  </div>

                  {/* Description */}
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
                        .map((technology) => technology.trim())
                        .filter(Boolean)
                        .map((technology) => (
                          <span key={technology}>
                            {technology}
                          </span>
                        ))}

                    </div>
                  )}

                  {/* Links */}
                  {(project.github || project.live_demo) && (
                    <div className="project-links">

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link project-link-primary"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <span>GitHub</span>
                          <span>↗</span>
                        </a>
                      )}

                      {project.live_demo && (
                        <a
                          href={project.live_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link project-link-secondary"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <span>Live Demo</span>
                          <span>↗</span>
                        </a>
                      )}

                    </div>
                  )}

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
