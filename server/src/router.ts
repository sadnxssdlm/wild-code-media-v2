import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define auth-related routes
import authActions from "./modules/auth/authActions";

router.post("/api/auth/register", authActions.register);
router.post("/api/auth/login", authActions.login);

/* ************************************************************************* */

export default router;
