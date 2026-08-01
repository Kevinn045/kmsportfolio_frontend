
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
        const response = await axios.get(`${API_URL}/api/blog/${id}/`);
        setPost(response.data);
      } catch (err) {
        console.error("Failed to load article:", err);
        setError("Unable to load this article.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="article-page">
        <div className="article-message">
          <div className="project-spinner"></div>
          <p>Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="article-page">
        <div className="article-message">
          <h2>Article not found</h2>

          <p>
            {error || "The article you're looking for doesn't exist."}
          </p>

          <Link to="/blog" className="article-back-button">
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="article-page">

      <motion.article
        className="article-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        {/* Back link */}
        <Link to="/blog" className="article-back">
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="article-header">

          <div className="article-meta">
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

          <h1>{post.title}</h1>

          {post.updated &&
            post.created &&
            post.updated !== post.created && (
              <p className="article-updated">
                Updated {formatDate(post.updated)}
              </p>
            )}

        </header>

        {/* Featured image */}
        {post.image && (
          <div className="article-image-wrapper">
            <img
              src={`${API_URL}${post.image}`}
              alt={post.title}
              className="article-image"
            />
          </div>
        )}

        {/* Article content */}
        <div className="article-body">
          {post.content
            .split("\n")
            .map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index}>
                  {paragraph}
                </p>
              )
            ))}
        </div>

        {/* Bottom navigation */}
        <div className="article-footer">
          <Link to="/blog" className="article-back-button">
            ← More Articles
          </Link>
        </div>

      </motion.article>

    </main>
  );
}

export default BlogPost;
