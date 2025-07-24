import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import {
  checkPostOwnership,
  optionalJWT,
  requireJWT,
} from "./middlewares/auth";
import {
  validateLoginData,
  validatePostData,
  validatePostId,
  validateRegisterData,
} from "./middlewares/validation";

import authActions from "./modules/auth/authActions";

router.post("/api/auth/register", validateRegisterData, authActions.register);
router.post("/api/auth/login", validateLoginData, authActions.login);

import postActions from "./modules/post/postActions";

router.get("/api/posts", optionalJWT, postActions.browse);

router.get("/api/posts/:id", validatePostId, postActions.read);

router.post("/api/posts", requireJWT, validatePostData, postActions.add);

router.put(
  "/api/posts/:id",
  requireJWT,
  validatePostId,
  validatePostData,
  checkPostOwnership,
  postActions.edit,
);

router.delete(
  "/api/posts/:id",
  requireJWT,
  validatePostId,
  checkPostOwnership,
  postActions.destroy,
);

/* ************************************************************************* */

export default router;
