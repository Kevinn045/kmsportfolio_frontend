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
  FaArrowRight,
} from "react-icons/fa";

import api from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    api
      .get("profile/")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Profile error:", err));

    api
      .get("messages/")
      .then((res) => {
        const unread = res.data.filter(
          (message) => !message.is_read
        ).length;

        setUnreadMessages(unread);
      })
      .catch((err) => {
        console.error("Messages error:", err);
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
        <div className="denied-card">
          <FaUserCircle />
          <h2>Access Denied</h2>
          <p>Please log in to access the administration dashboard.</p>

          <Link to="/login">
            Go to Login <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="dashboard-page">

      {/* HEADER */}
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
            Manage your portfolio, projects, blog and visitor
            interactions from one place.
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


      {/* PROFILE */}
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
          <p className="profile-label">
            SIGNED IN AS
          </p>

          <h3>
            {user?.username || "Loading..."}
          </h3>

          <p>
            {user?.email || "Loading email..."}
          </p>
        </div>

        {user?.is_staff && (
          <span className="admin-badge">
            Administrator
          </span>
        )}
      </motion.section>


      {/* MANAGEMENT */}
      <section className="dashboard-section">

        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-label">
              MANAGEMENT
            </p>

            <h2>
              Portfolio controls
            </h2>
          </div>

          <p>
            Manage the content visitors see on your portfolio.
          </p>
        </div>


        <div className="dashboard-grid">

          {/* PROJECTS */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <FaFolderOpen />
              </div>

              <span className="card-number">
                01
              </span>
            </div>

            <h3>
              Projects
            </h3>

            <p>
              Manage the projects displayed on your portfolio,
              including technologies, GitHub links and live demos.
            </p>

            <Link
              to="/project-management"
              className="dashboard-card-link"
            >
              Manage Projects
              <FaArrowRight />
            </Link>
          </motion.div>


          {/* ADD PROJECT */}
          <motion.div
            className="dashboard-card dashboard-card-featured"
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <FaPlus />
              </div>

              <span className="card-number">
                02
              </span>
            </div>

            <h3>
              Add Project
            </h3>

            <p>
              Add a new project with its description,
              technologies, GitHub repository and live demo.
            </p>

            <Link
              to="/add-project"
              className="dashboard-card-link"
            >
              Add a project
              <FaArrowRight />
            </Link>
          </motion.div>


          {/* BLOG */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <FaBlog />
              </div>

              <span className="card-number">
                03
              </span>
            </div>

            <h3>
              Blog
            </h3>

            <p>
              Create and manage technical articles,
              professional insights and portfolio stories.
            </p>

            <Link
              to="/blog-management"
              className="dashboard-card-link"
            >
              Manage Blog
              <FaArrowRight />
            </Link>
          </motion.div>


          {/* MESSAGES */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <FaEnvelope />
              </div>

              <span className="card-number">
                04
              </span>
            </div>

            <div className="message-title">
              <h3>
                Messages
              </h3>

              {unreadMessages > 0 && (
                <span className="unread-badge">
                  {unreadMessages}
                </span>
              )}
            </div>

            <p>
              {unreadMessages > 0
                ? `You have ${unreadMessages} unread ${
                    unreadMessages === 1
                      ? "message"
                      : "messages"
                  }.`
                : "You have no unread messages."}
            </p>

            <Link
              to="/messages"
              className="dashboard-card-link"
            >
              View Messages
              <FaArrowRight />
            </Link>
          </motion.div>


          {/* ANALYTICS */}
          <motion.div
            className="dashboard-card"
            whileHover={{ y: -6 }}
          >
            <div className="dashboard-card-top">
              <div className="dashboard-card-icon">
                <FaChartLine />
              </div>

              <span className="card-number">
                05
              </span>
            </div>

            <h3>
              Analytics
            </h3>

            <p>
              Monitor visitors and understand how people
              interact with your portfolio.
            </p>

            <span className="dashboard-coming-soon">
              Coming soon
            </span>
          </motion.div>

        </div>
      </section>


      {/* FOOTER */}
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