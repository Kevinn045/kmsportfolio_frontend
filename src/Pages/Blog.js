import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://kmsportfolio-back.onrender.com";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/`);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to load blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="public-blog">

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-inner">

          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            INSIGHTS & ARTICLES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Ideas, technology
            <br />
            &amp; things I'm learning.
          </motion.h1>

          <motion.p
            className="blog-hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            Thoughts on information technology, software development,
            artificial intelligence, digital solutions and my journey
            in the technology space.
          </motion.p>

        </div>
      </section>


      {/* Posts */}
      <section className="blog-posts-section">

        <div className="blog-posts-container">

          {loading && (
            <div className="blog-status">
              Loading articles...
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="blog-status">
              <h3>No articles yet.</h3>
              <p>
                I'm currently working on some new things to share.
              </p>
            </div>
          )}

          {!loading && posts.length > 0 && (

            <div className="public-blog-grid">

              {posts.map((post, index) => (

                <motion.article
                  key={post.id}
                  className="public-blog-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08
                  }}
                  whileHover={{ y: -7 }}
                >

                  {/* Image */}
                  <div className="public-blog-image">

                    {post.image ? (
                      <img
                        src={`${API_URL}${post.image}`}
                        alt={post.title}
                      />
                    ) : (
                      <div className="blog-no-image">
                        KM
                      </div>
                    )}

                  </div>


                  {/* Content */}
                  <div className="public-blog-content">

                    <div className="public-blog-meta">
                      <span>
                        {new Date(
                          post.created
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>

                      <span>•</span>

                      <span>ARTICLE</span>
                    </div>

                    <h2>{post.title}</h2>

                    <p>
                      {post.content.length > 180
                        ? `${post.content.substring(0, 180)}...`
                        : post.content}
                    </p>

                    <button className="read-article-button">
                      Read Article
                      <span>→</span>
                    </button>

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