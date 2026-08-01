
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/contact/`, form);

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="contact-container">

        {/* Intro */}
        <motion.div
          className="contact-intro"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">GET IN TOUCH</p>

          <h2>
            Let's build something
            <span> useful.</span>
          </h2>

          <p>
            Have a project idea, opportunity, or just want to connect?
            Send me a message and I'll get back to you.
          </p>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-icon">✉</span>
              <div>
                <small>Email</small>
                <a href="mailto:kevinmuse45@gmail.com">
                  kevinmuse45@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">💻</span>
              <div>
                <small>Focus</small>
                <span>Web Development & AI</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows="6"
                required
              />
            </div>

            {status === "success" && (
              <div className="form-status form-success">
                ✓ Message sent successfully. Thank you for reaching out!
              </div>
            )}

            {status === "error" && (
              <div className="form-status form-error">
                Something went wrong while sending your message. Please try
                again.
              </div>
            )}

            <button
              type="submit"
              className="contact-submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message ↗"}
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}

export default Contact;

