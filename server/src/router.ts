import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define auth-related routes
import authActions from "./modules/auth/authActions";

router.post("/api/auth/register", authActions.register);
router.post("/api/auth/login", authActions.login);

// Define post-related routes
import postActions from "./modules/post/postActions";

router.get("/api/posts", postActions.browse);
router.post("/api/posts", postActions.add);

/* ************************************************************************* */

export default router;
