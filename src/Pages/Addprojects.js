import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "https://kmsportfolio-back.onrender.com";

function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    live_demo: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    if (!formData.title || !formData.description) {
      setError("Please provide a project title and description.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("technologies", formData.technologies);
    data.append("github", formData.github);
    data.append("live_demo", formData.live_demo);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.post(
        `${API_URL}/api/add-project/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Project added successfully.");

      setFormData({
        title: "",
        description: "",
        technologies: "",
        github: "",
        live_demo: "",
        image: null,
      });

      document.getElementById("project-image").value = "";

    } catch (err) {
      console.error("Project upload error:", err.response?.data || err);

      if (err.response?.status === 401) {
        setError("Your login session has expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.detail ||
          "Unable to add project. Please check your information and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="add-project-page">

      <motion.div
        className="add-project-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Header */}
        <div className="add-project-header">

          <div>
            <p className="add-project-label">
              PORTFOLIO MANAGEMENT
            </p>

            <h1>
              Add a project
            </h1>

            <p>
              Add a new project to your portfolio and showcase
              your work, skills and experience.
            </p>
          </div>

          <button
            type="button"
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            ← Dashboard
          </button>

        </div>


        {/* Form */}
        <form
          className="add-project-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section">

            <div className="form-section-heading">
              <span>01</span>

              <div>
                <h2>Project information</h2>
                <p>Tell visitors about what you built.</p>
              </div>
            </div>


            {/* Title */}
            <div className="form-group">

              <label htmlFor="title">
                Project title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Hotel Management System"
              />

            </div>


            {/* Description */}
            <div className="form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the project, the problem it solves and what you contributed."
                rows="6"
              />

            </div>


            {/* Technologies */}
            <div className="form-group">

              <label htmlFor="technologies">
                Technologies
              </label>

              <input
                id="technologies"
                name="technologies"
                type="text"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Python, Django, React, MySQL"
              />

              <small>
                Separate technologies with commas.
              </small>

            </div>

          </div>


          {/* Links */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>02</span>

              <div>
                <h2>Project links</h2>
                <p>Give visitors somewhere to explore your work.</p>
              </div>
            </div>


            <div className="form-two-columns">

              <div className="form-group">

                <label htmlFor="github">
                  GitHub repository
                </label>

                <input
                  id="github"
                  name="github"
                  type="url"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />

              </div>


              <div className="form-group">

                <label htmlFor="live_demo">
                  Live demo
                </label>

                <input
                  id="live_demo"
                  name="live_demo"
                  type="url"
                  value={formData.live_demo}
                  onChange={handleChange}
                  placeholder="https://..."
                />

              </div>

            </div>

          </div>


          {/* Image */}
          <div className="form-section">

            <div className="form-section-heading">
              <span>03</span>

              <div>
                <h2>Project image</h2>
                <p>Choose an image to represent your project.</p>
              </div>
            </div>


            <div className="image-upload">

              <label htmlFor="project-image">
                <div className="upload-icon">
                  ↑
                </div>

                <strong>
                  Choose project image
                </strong>

                <span>
                  PNG, JPG or WEBP
                </span>
              </label>

              <input
                id="project-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
              />

              {formData.image && (
                <p className="selected-file">
                  Selected: {formData.image.name}
                </p>
              )}

            </div>

          </div>


          {/* Messages */}
          {error && (
            <div className="project-form-error">
              {error}
            </div>
          )}

          {success && (
            <div className="project-form-success">
              ✓ {success}
            </div>
          )}


          {/* Actions */}
          <div className="add-project-actions">

            <button
              type="button"
              className="cancel-project-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-project-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="project-spinner"></span>
                  Adding project...
                </>
              ) : (
                <>
                  Add Project
                  <span>→</span>
                </>
              )}
            </button>

          </div>

        </form>

      </motion.div>

    </main>
  );
}

export default AddProject;