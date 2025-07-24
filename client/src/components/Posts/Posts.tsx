import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiService } from "../../services/api";
import type { PostWithAuthor } from "../../types/index";
import "../../assets/styles/Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await apiService.getPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="posts">
        <div className="posts-loading">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            ⚡
          </motion.div>
          <p>Chargement des posts...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="posts">
        <div className="posts-error">
          <p>Erreur: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="posts">
      <div className="posts-grid">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="post-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-30px" }}
          >
            <div className="post-header">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={`${post.author.username} avatar`}
                  className="author-avatar"
                />
              ) : (
                <div className="author-avatar-placeholder">
                  {post.author.username.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="author-name">
                {post.author.first_name && post.author.last_name
                  ? `${post.author.first_name} ${post.author.last_name}`
                  : post.author.username}
              </span>
              <span
                className="post-date"
                style={{
                  marginLeft: "auto",
                  fontSize: "0.95rem",
                  color: "#f3eaff",
                  opacity: 0.8,
                }}
              >
                {new Date(post.created_at).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="post-content">
              {post.content && <p className="post-text">{post.content}</p>}
              {post.code_snippet && (
                <pre className="post-code">
                  <code>{post.code_snippet}</code>
                </pre>
              )}
            </div>

            <div className="post-actions">
              <motion.button
                className="action-btn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <FavoriteRoundedIcon fontSize="small" />
                <span>12</span>
              </motion.button>
              <motion.button
                className="action-btn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <ChatBubbleRoundedIcon fontSize="small" />
                <span>3</span>
              </motion.button>
              <motion.button
                className="action-btn"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <ShareRoundedIcon fontSize="small" />
                <span>1</span>
              </motion.button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Posts;
