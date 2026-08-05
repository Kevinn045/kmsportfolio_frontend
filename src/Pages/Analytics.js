import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUsers,
  FaFolderOpen,
  FaBlog,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../api";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("analytics/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load analytics.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="analytics-page">
        <div className="analytics-loading">
          <div className="analytics-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="analytics-page">
        <div className="analytics-error">
          <h2>Analytics unavailable</h2>
          <p>{error}</p>

          <Link to="/dashboard">
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="analytics-page">

      {/* Header */}
      <motion.header
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="dashboard-label">
            PORTFOLIO ANALYTICS
          </p>

          <h1>Website Performance</h1>

          <p>
            Monitor visitors and track the growth of your portfolio.
          </p>
        </div>

        <Link
          to="/dashboard"
          className="analytics-back-button"
        >
          <FaArrowLeft />
          Dashboard
        </Link>
      </motion.header>


      {/* Statistics */}
      <section className="analytics-stats">

        <motion.div
          className="analytics-stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="analytics-stat-icon">
            <FaUsers />
          </div>

          <div>
            <span>Total Visitors</span>
            <h2>{data.total_visitors}</h2>
          </div>
        </motion.div>


        <motion.div
          className="analytics-stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="analytics-stat-icon">
            <FaFolderOpen />
          </div>

          <div>
            <span>Total Projects</span>
            <h2>{data.total_projects}</h2>
          </div>
        </motion.div>


        <motion.div
          className="analytics-stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="analytics-stat-icon">
            <FaBlog />
          </div>

          <div>
            <span>Blog Posts</span>
            <h2>{data.total_blogs}</h2>
          </div>
        </motion.div>


        <motion.div
          className="analytics-stat-card"
          whileHover={{ y: -5 }}
        >
          <div className="analytics-stat-icon">
            <FaChartLine />
          </div>

          <div>
            <span>Tracked Activity</span>
            <h2>
              {data.visitors_by_day?.length || 0}
            </h2>
          </div>
        </motion.div>

      </section>


      {/* Visitor Chart */}
      <motion.section
        className="analytics-chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >

        <div className="analytics-chart-header">
          <div>
            <p className="dashboard-label">
              VISITOR ACTIVITY
            </p>

            <h2>Visitors Over Time</h2>
          </div>
        </div>

        <div className="analytics-chart">

          {data.visitors_by_day?.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data.visitors_by_day}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="timestamp__date"
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="analytics-empty">
              <FaChartLine />

              <h3>No visitor data yet</h3>

              <p>
                Visitor activity will appear here once people
                start visiting your portfolio.
              </p>
            </div>
          )}

        </div>

      </motion.section>


      {/* Footer */}
      <footer className="analytics-footer">
        <Link to="/dashboard">
          ← Return to Dashboard
        </Link>

        <span>
          Kevin Muse · Portfolio Analytics
        </span>
      </footer>

    </main>
  );
}

export default Analytics;