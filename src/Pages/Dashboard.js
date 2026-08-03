import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFolderOpen,
  FaPlus,
  FaBlog,
  FaEnvelope,
  FaChartLine,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import api from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("profile/")
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  };

  const token = localStorage.getItem("access");

  if (!token) {
    return (
      <div className="dashboard-denied">
        <h2>Access Denied</h2>
        <p>Please log in to access the dashboard.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <main className="dashboard-page">

      {/* Header */}
      <motion.header
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div>
          <p className="dashboard-label">
            PORTFOLIO ADMINISTRATION
          </p>

          <h1>
            Good to see you,{" "}
            <span>{user?.username || "Kevin"}</span>.
          </h1>

          <p className="dashboard-subtitle">
            Manage your portfolio, projects and digital presence.
          </p>
        </div>

        <button
          className="dashboard-logout"
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </motion.header>


      {/* Profile */}
      <motion.section
        className="dashboard-profile"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >

        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div className="profile-info">
          <p className="profile-label">SIGNED IN AS</p>

          <h3>{user?.username || "Loading..."}</h3>

          <p>{user?.email || "Loading email..."}</p>
        </div>

        {user?.is_staff && (
          <span className="admin-badge">
            Administrator
          </span>
        )}

      </motion.section>


      {/* Quick actions */}
      <section className="dashboard-section">

        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-label">MANAGEMENT</p>
            <h2>Portfolio controls</h2>
          </div>
        </div>


        <div className="dashboard-grid">

          {/* Projects */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -5 }}
          >
            <div className="dashboard-card-icon">
              <FaFolderOpen />
            </div>

            <div className="card p-3 mb-3">
             <h4>Projects</h4>

             <p>
                Manage the projects displayed on your portfolio.
             </p>

             <Link
                to="/project-management"
                className="dashboard-card-link"
             >
                Manage Projects →
             </Link>
            </div>
          </motion.div>


          {/* Add Project */}
          <motion.div
            className="dashboard-card dashboard-card-featured"
            whileHover={{ y: -5 }}
          >
            <div className="dashboard-card-icon">
              <FaPlus />
            </div>

            <div className="dashboard-card-content">
              <span>02</span>

              <h3>Add Project</h3>

              <p>
                Add a new project with its description,
                technologies, GitHub repository and live demo.
              </p>

              <Link
                to="/add-project"
                className="dashboard-card-link"
              >
                Add a project →
              </Link>
            </div>
          </motion.div>


          {/* Blog */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -5 }}
          >
            <div className="dashboard-card-icon">
              <FaBlog />
            </div>

            <div className="dashboard-card-content">
              <span>03</span>

              <h3>Blog</h3>

              <p>
                Manage your articles, technical writing and
                professional insights.
              </p>

              <Link
                to="/blog-management"
                className="dashboard-card-link"
              >
                Manage blog →
              </Link>
            </div>
          </motion.div>


          {/* Messages */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -5 }}
          >
            <div className="dashboard-card-icon">
              <FaEnvelope />
            </div>

            <div className="dashboard-card-content">
              <span>04</span>

              <h3>Messages</h3>

              <p>
                View messages submitted through your portfolio
                contact form.
              </p>

              <span className="dashboard-coming-soon">
                Coming soon
              </span>
            </div>
          </motion.div>


          {/* Analytics */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -5 }}
          >
            <div className="dashboard-card-icon">
              <FaChartLine />
            </div>

            <div className="dashboard-card-content">
              <span>05</span>

              <h3>Analytics</h3>

              <p>
                Monitor visitors and understand how people
                interact with your portfolio.
              </p>

              <span className="dashboard-coming-soon">
                Coming soon
              </span>
            </div>
          </motion.div>

        </div>

      </section>


      {/* Footer */}
      <footer className="dashboard-footer">

        <Link to="/">
          ← Return to portfolio
        </Link>

        <span>
          Kevin Muse · Portfolio Administration
        </span>

      </footer>

    </main>
  );
}

export default Dashboard;