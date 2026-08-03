import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function BlogPost() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/blog/${id}/`
        );

        setPost(response.data);
      } catch (err) {
        console.error("Failed to load article:", err);
        setError("This article could not be found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <main className="article-status">
        <p>Loading article...</p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="article-status">
        <h2>Article unavailable</h2>
        <p>{error}</p>

        <Link to="/blog" className="article-back-button">
          ← Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="article-page">

      {/* Article header */}
      <section className="article-header">

        <div className="article-header-inner">

          <Link to="/blog" className="article-back-link">
            ← Back to Blog
          </Link>

          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ARTICLE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            className="article-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>
              {new Date(post.created).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>

            <span>•</span>

            <span>Kevin Muse</span>
          </motion.div>

        </div>

      </section>


      {/* Article */}
      <section className="article-content-section">

        <div className="article-container">

          {post.image && (
            <motion.div
              className="article-cover"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={`${API_URL}${post.image}`}
                alt={post.title}
              />
            </motion.div>
          )}


          <motion.article
            className="article-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {post.content.split("\n").map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>
                  {paragraph}
                </p>
              )
            ))}
          </motion.article>


          <div className="article-footer">

            <Link
              to="/blog"
              className="article-back-button"
            >
              ← Back to all articles
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default BlogPost;