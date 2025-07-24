import { motion } from "framer-motion";
import Articles from "../components/Articles/Articles";
import Hero from "../components/Hero/Hero";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Articles />
    </motion.div>
  );
};

export default HomePage;
