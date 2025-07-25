import "../../assets/styles/Hero.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Wild Code Media: The social network that breaks the code
      </motion.h1>
    </motion.section>
  );
};

export default Hero;
