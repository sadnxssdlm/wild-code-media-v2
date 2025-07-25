import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { usePostCreation } from "../../hooks/usePostCreation";
import { usePostDeletion } from "../../hooks/usePostDeletion";
import { usePosts } from "../../hooks/usePosts";
import WildButton from "../Button/WildButton";
import "../../assets/styles/Posts.css";

const Posts = () => {
  const { user, isAuthenticated } = useAuth();
  const { posts, loading, addPostToList, removePostFromList } = usePosts();

  const {
    showForm,
    form,
    creating,
    isFormValid,
    openForm,
    closeForm,
    updateForm,
    handleSubmit,
  } = usePostCreation(addPostToList);

  const { deletingId, deletePost } = usePostDeletion(removePostFromList);

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

  return (
    <section className="posts">
      {isAuthenticated && (
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <WildButton onClick={openForm}>Créer un post</WildButton>

          <Dialog
            open={showForm}
            onClose={closeForm}
            maxWidth="sm"
            fullWidth
            aria-labelledby="create-post-title"
            aria-describedby="create-post-description"
            PaperProps={{
              sx: {
                background: "rgba(30, 30, 40, 0.95)",
                borderRadius: 3,
                boxShadow: "0 8px 32px 0 rgba(89,37,233,0.18)",
              },
            }}
          >
            <DialogContent sx={{ p: 4 }}>
              <Typography
                id="create-post-title"
                variant="h4"
                fontWeight={700}
                mb={2}
                color="#fff"
                textAlign="center"
              >
                Nouveau post
              </Typography>
              <Typography
                id="create-post-description"
                mb={3}
                color="#d1d5db"
                fontSize={16}
                textAlign="center"
              >
                Partage tes idées avec la communauté Wild Code Media
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Titre"
                  name="title"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  fullWidth
                  required
                  autoFocus
                  error={form.title.length > 0 && form.title.length < 3}
                  helperText={
                    form.title.length > 0 && form.title.length < 3
                      ? "Le titre doit contenir au moins 3 caractères"
                      : form.title.length > 255
                        ? "Le titre ne peut pas dépasser 255 caractères"
                        : ""
                  }
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": { color: "#fff" },
                    "& .MuiInputBase-inputMultiline": { color: "#fff" },
                    label: { color: "#b72193" },
                    fieldset: { borderColor: "#5925e9" },
                    "& .MuiFormHelperText-root": { color: "#ff6b6b" },
                  }}
                  InputLabelProps={{ style: { color: "#b72193" } }}
                  inputProps={{
                    "aria-describedby": "title-helper",
                    maxLength: 255,
                  }}
                />

                <TextField
                  label="Contenu"
                  name="content"
                  value={form.content || ""}
                  onChange={(e) => updateForm("content", e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={6}
                  error={(form.content?.length || 0) > 10000}
                  helperText={
                    (form.content?.length || 0) > 10000
                      ? "Le contenu ne peut pas dépasser 10 000 caractères"
                      : `${form.content?.length || 0}/10000 caractères`
                  }
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": { color: "#fff" },
                    "& .MuiInputBase-inputMultiline": { color: "#fff" },
                    label: { color: "#b72193" },
                    fieldset: { borderColor: "#5925e9" },
                    "& .MuiFormHelperText-root": {
                      color:
                        (form.content?.length || 0) > 10000
                          ? "#ff6b6b"
                          : "#d1d5db",
                    },
                  }}
                  InputLabelProps={{ style: { color: "#b72193" } }}
                  inputProps={{
                    "aria-describedby": "content-helper",
                    maxLength: 10000,
                  }}
                />

                <TextField
                  label="Code (optionnel)"
                  name="code_snippet"
                  value={form.code_snippet || ""}
                  onChange={(e) => updateForm("code_snippet", e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={8}
                  placeholder="Votre code ici..."
                  variant="outlined"
                  sx={{
                    "& .MuiInputBase-input": { color: "#fff" },
                    "& .MuiInputBase-inputMultiline": { color: "#fff" },
                    label: { color: "#b72193" },
                    fieldset: { borderColor: "#5925e9" },
                    "& .MuiInputBase-input, & .MuiInputBase-inputMultiline": {
                      color: "#fff",
                      fontFamily: "monospace",
                      fontSize: "0.95rem",
                    },
                  }}
                  InputLabelProps={{ style: { color: "#b72193" } }}
                  inputProps={{
                    "aria-describedby": "code-helper",
                    spellCheck: false,
                  }}
                />

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <WildButton
                    type="button"
                    onClick={closeForm}
                    variant="outlined"
                    fullWidth
                    tabIndex={0}
                    sx={{
                      color: "#b72193",
                      borderColor: "#b72193",
                      background: "none",
                      fontWeight: 700,
                      "&:hover": {
                        borderColor: "#5925e9",
                        color: "#5925e9",
                        background: "rgba(89,37,233,0.05)",
                      },
                      "&:focus": {
                        outline: "2px solid #5925e9",
                        outlineOffset: "2px",
                      },
                    }}
                    disabled={creating}
                    aria-label="Annuler la création du post"
                  >
                    Annuler
                  </WildButton>
                  <WildButton
                    type="submit"
                    fullWidth
                    disabled={creating || !isFormValid}
                    tabIndex={0}
                    sx={{
                      fontSize: 17,
                      "&:focus": {
                        outline: "2px solid #5925e9",
                        outlineOffset: "2px",
                      },
                    }}
                    aria-label={
                      creating ? "Publication en cours..." : "Publier le post"
                    }
                  >
                    {creating ? "Création..." : "Publier"}
                  </WildButton>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      )}

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
              {user && post.author.id === user.id && (
                <IconButton
                  aria-label="Supprimer"
                  onClick={() => deletePost(post.id)}
                  size="small"
                  sx={{ color: "#fff", ml: 1 }}
                  disabled={deletingId === post.id}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              )}
            </div>

            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
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
