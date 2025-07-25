import { Box } from "@mui/material";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm/LoginForm";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background-gradient)",
        position: "relative",
        padding: { xs: 2, sm: 3 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: "100%", maxWidth: 480 }}
      >
        <LoginForm />
      </motion.div>
    </Box>
  );
}
