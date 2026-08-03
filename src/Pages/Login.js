import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/api/login/`,
        form
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">

      {/* Left side */}
      <motion.section
        className="login-intro"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >

        <div className="login-intro-content">

          <p className="login-eyebrow">
            KEVIN MUSE
          </p>

          <h1>
            Welcome back.
          </h1>

          <p>
            Access your portfolio management dashboard and
            manage your projects, content and professional
            profile.
          </p>

          <div className="login-features">

            <div>
              <span>01</span>
              <p>Manage projects</p>
            </div>

            <div>
              <span>02</span>
              <p>Manage portfolio content</p>
            </div>

            <div>
              <span>03</span>
              <p>Monitor your digital presence</p>
            </div>

          </div>

        </div>

      </motion.section>


      {/* Login card */}
      <section className="login-form-section">

        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >

          <div className="login-card-header">

            <div className="login-logo">
              KM
            </div>

            <div>
              <p className="login-card-label">
                ADMIN ACCESS
              </p>

              <h2>
                Sign in
              </h2>
            </div>

          </div>

          <p className="login-subtitle">
            Sign in to manage your portfolio.
          </p>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="login-field">

              <label htmlFor="username">
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                autoComplete="username"
              />

            </div>


            {/* Password */}
            <div className="login-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>


            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="login-spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          <button
            className="back-home"
            onClick={() => navigate("/")}
          >
            ← Back to portfolio
          </button>

        </motion.div>

      </section>

    </main>
  );
}

export default Login;