import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api";

const API_URL = "https://kmsportfolio-back.onrender.com";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    live_demo: "",
    image: null,
  });

  const fetchProjects = async () => {
    try {
      const response = await api.get("projects/");
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      technologies: "",
      github: "",
      live_demo: "",
      image: null,
    });

    setEditingProject(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("description", form.description);
    data.append("technologies", form.technologies);
    data.append("github", form.github);
    data.append("live_demo", form.live_demo);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      if (editingProject) {
        await api.patch(
          `projects/${editingProject.id}/manage/`,
          data
        );
      } else {
        await api.post("add-project/", data);
      }

      alert(
        editingProject
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error(error.response?.data || error);

      alert(
        editingProject
          ? "Failed to update project."
          : "Failed to add project."
      );
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: project.technologies || "",
      github: project.github || "",
      live_demo: project.live_demo || "",
      image: null,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
        console.log("Deleting project:", id);

        const response = await api.delete(
            `projects/${id}/manage/`
        );

        console.log("Delete response:", response);

        setProjects((prev) =>
            prev.filter((project) => project.id !== id)
        );

        alert("Project deleted successfully!");

    } catch (error) {
        console.error(
            "DELETE ERROR:",
            error.response?.status,
            error.response?.data,
            error
        );

        alert(
            `Delete failed: ${
                error.response?.status || "Unknown error"
            }`
        );
    }
};
  return (
    <main className="project-management-page">

      {/* Header */}
      <motion.header
        className="project-management-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Link
            to="/dashboard"
            className="project-back-link"
          >
            <FaArrowLeft />
            Dashboard
          </Link>

          <p className="dashboard-label">
            PORTFOLIO MANAGEMENT
          </p>

          <h1>Project Management</h1>

          <p>
            Add, update and manage the projects displayed
            on your portfolio.
          </p>
        </div>

        <button
          className="project-new-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus />
          New Project
        </button>
      </motion.header>


      {/* Editor */}
      {showForm && (
        <motion.section
          className="project-editor"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="project-editor-header">
            <div>
              <p className="dashboard-label">
                {editingProject
                  ? "EDIT PROJECT"
                  : "NEW PROJECT"}
              </p>

              <h2>
                {editingProject
                  ? "Edit project"
                  : "Add a new project"}
              </h2>
            </div>

            <button
              className="project-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <label>Project Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Hotel Management System"
              required
            />


            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what the project does..."
              rows="6"
              required
            />


            <label>Technologies</label>

            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="Python, Django, React, MySQL"
              required
            />

            <small>
              Separate technologies using commas.
            </small>


            <div className="project-form-two-column">

              <div>
                <label>GitHub URL</label>

                <input
                  type="url"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label>Live Demo URL</label>

                <input
                  type="url"
                  name="live_demo"
                  value={form.live_demo}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

            </div>


            <label>Project Image</label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />

            {editingProject && (
              <small>
                Leave the image empty if you want to keep
                the current image.
              </small>
            )}


            <button
              type="submit"
              className="project-save-button"
            >
              {editingProject
                ? "Save Changes"
                : "Add Project"}
            </button>

          </form>
        </motion.section>
      )}


      {/* Projects */}
      <section className="project-management-list">

        <div className="project-list-heading">

          <div>
            <p className="dashboard-label">
              YOUR WORK
            </p>

            <h2>Portfolio Projects</h2>
          </div>

          <span>
            {projects.length}{" "}
            {projects.length === 1
              ? "project"
              : "projects"}
          </span>

        </div>


        {loading ? (
          <div className="project-status">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="project-status">

            <h3>No projects yet.</h3>

            <p>
              Add your first project to start building
              your portfolio.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="project-new-button"
            >
              <FaPlus />
              Create First Project
            </button>

          </div>
        ) : (

          <div className="project-admin-grid">

            {projects.map((project, index) => (

              <motion.article
                key={project.id}
                className="project-admin-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.07,
                }}
                whileHover={{ y: -5 }}
              >

                <div className="project-admin-image">

                  {project.image ? (
                    <img
                      src={`${API_URL}${project.image}`}
                      alt={project.title}
                    />
                  ) : (
                    <div className="project-image-placeholder">
                      PROJECT
                    </div>
                  )}

                </div>


                <div className="project-admin-content">

                  <h3>{project.title}</h3>

                  <p>
                    {project.description?.length > 150
                      ? `${project.description.substring(
                          0,
                          150
                        )}...`
                      : project.description}
                  </p>


                  {project.technologies && (
                    <div className="project-admin-technologies">

                      {project.technologies
                        .split(",")
                        .map((technology) => (
                          <span key={technology.trim()}>
                            {technology.trim()}
                          </span>
                        ))}

                    </div>
                  )}


                  <div className="project-admin-links">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}

                    {project.live_demo && (
                      <a
                        href={project.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt />
                        Demo
                      </a>
                    )}

                  </div>


                  <div className="project-admin-actions">

                    <button
                      onClick={() => handleEdit(project)}
                      className="project-edit-button"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="project-delete-button"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default ProjectManagement;