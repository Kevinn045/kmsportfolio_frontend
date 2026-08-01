
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/`);
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        setError("Unable to load blog posts right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getExcerpt = (content) => {
    if (!content) return "";

    return content.length > 180
      ? `${content.substring(0, 180)}...`
      : content;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="blog-page">

      {/* Header */}
      <section className="blog-hero">
        <motion.div
          className="blog-hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">MY BLOG</p>

          <h1>
            Thoughts, projects
            <span> & technology.</span>
          </h1>

          <p>
            Insights, lessons, experiments, and ideas from my journey
            through software development and technology.
          </p>
        </motion.div>
      </section>

      {/* Blog content */}
      <section className="blog-content-section">
        <div className="blog-container">

          {/* Loading */}
          {loading && (
            <div className="blog-message">
              <div className="project-spinner"></div>
              <p>Loading articles...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="blog-message blog-error">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="project-retry-button"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div className="blog-message">
              <h3>No articles yet</h3>
              <p>
                New articles will appear here when they are published.
              </p>
            </div>
          )}

          {/* Posts */}
          {!loading && !error && posts.length > 0 && (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <motion.article
                  className="blog-card"
                  key={post.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                >

                  {/* Image */}
                  <div className="blog-image-wrapper">
                    {post.image ? (
                      <img
                        src={`${API_URL}${post.image}`}
                        alt={post.title}
                        className="blog-image"
                      />
                    ) : (
                      <div className="blog-image-placeholder">
                        <span>ARTICLE</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="blog-card-content">

                    <div className="blog-meta">
                      <span>ARTICLE</span>

                      {post.created && (
                        <>
                          <span>•</span>
                          <time dateTime={post.created}>
                            {formatDate(post.created)}
                          </time>
                        </>
                      )}
                    </div>

                    <h2>{post.title}</h2>

                    <p className="blog-excerpt">
                      {getExcerpt(post.content)}
                    </p>
                    <Link
                        to={`/blog/${post.id}`}
                        className="blog-read-more"
                    >
                        Read Article →
                    </Link>

                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Blog;
