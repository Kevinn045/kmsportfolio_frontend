import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api";

const API_URL = "https://kmsportfolio-back.onrender.com";

function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const fetchPosts = async () => {
    try {
      const response = await api.get("blog/");
      setPosts(response.data);
    } catch (error) {
      console.error("Failed to load blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      image: null,
    });

    setEditingPost(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("content", form.content);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      if (editingPost) {
        await api.patch(
          `blog/${editingPost.id}/manage/`,
          data
        );
      } else {
        await api.post("blog/add/", data);
      }

      alert(
        editingPost
          ? "Blog post updated successfully!"
          : "Blog post published successfully!"
      );

      resetForm();
      fetchPosts();

    } catch (error) {
      console.error(error.response?.data || error);

      alert(
        editingPost
          ? "Failed to update blog post."
          : "Failed to publish blog post."
      );
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);

    setForm({
      title: post.title,
      content: post.content,
      image: null,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`blog/${id}/manage/`);

      setPosts((prev) =>
        prev.filter((post) => post.id !== id)
      );

    } catch (error) {
      console.error(error);
      alert("Failed to delete blog post.");
    }
  };

  return (
    <main className="blog-management-page">

      {/* Header */}
      <motion.header
        className="blog-management-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Link
            to="/dashboard"
            className="blog-back-link"
          >
            <FaArrowLeft />
            Dashboard
          </Link>

          <p className="dashboard-label">
            CONTENT MANAGEMENT
          </p>

          <h1>Blog Management</h1>

          <p>
            Create, edit and manage your professional
            articles and insights.
          </p>
        </div>

        <button
          className="blog-new-button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <FaPlus />
          New Post
        </button>
      </motion.header>


      {/* Editor */}
      {showForm && (
        <motion.section
          className="blog-editor"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <div className="blog-editor-header">
            <div>
              <p className="dashboard-label">
                {editingPost
                  ? "EDIT ARTICLE"
                  : "NEW ARTICLE"}
              </p>

              <h2>
                {editingPost
                  ? "Edit blog post"
                  : "Create a new post"}
              </h2>
            </div>

            <button
              className="blog-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <label>
              Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter your article title"
              required
            />


            <label>
              Content
            </label>

            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your article..."
              rows="12"
              required
            />


            <label>
              Featured Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />


            <button
              type="submit"
              className="blog-publish-button"
            >
              {editingPost
                ? "Save Changes"
                : "Publish Post"}
            </button>

          </form>

        </motion.section>
      )}


      {/* Posts */}
      <section className="blog-management-list">

        <div className="blog-list-heading">
          <div>
            <p className="dashboard-label">
              YOUR CONTENT
            </p>

            <h2>
              Published Posts
            </h2>
          </div>

          <span>
            {posts.length}{" "}
            {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>


        {loading ? (
          <div className="blog-empty">
            Loading posts...
          </div>
        ) : posts.length === 0 ? (
          <div className="blog-empty">
            <h3>No blog posts yet.</h3>

            <p>
              Start building your professional presence
              by publishing your first article.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="blog-new-button"
            >
              <FaPlus />
              Create First Post
            </button>
          </div>
        ) : (

          <div className="blog-admin-grid">

            {posts.map((post) => (

              <motion.article
                key={post.id}
                className="blog-admin-card"
                whileHover={{ y: -5 }}
              >

                {post.image ? (
                  <img
                    src={`${API_URL}${post.image}`}
                    alt={post.title}
                  />
                ) : (
                  <div className="blog-image-placeholder">
                    BLOG
                  </div>
                )}

                <div className="blog-admin-content">

                  <span className="blog-post-date">
                    {new Date(
                      post.created
                    ).toLocaleDateString()}
                  </span>

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.content.length > 140
                      ? `${post.content.substring(0, 140)}...`
                      : post.content}
                  </p>


                  <div className="blog-admin-actions">

                    <button
                      onClick={() => handleEdit(post)}
                      className="blog-edit-button"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(post.id)}
                      className="blog-delete-button"
                    >
                      <FaTrash />
                      Delete
                    </button>

                  </div>

                </div>

              </motion.article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default BlogManagement;