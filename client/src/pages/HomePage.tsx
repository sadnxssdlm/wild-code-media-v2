import { motion } from "framer-motion";
import Articles from "../components/Articles/Articles";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import WilderMessages from "../components/Messages/WilderMessages";
import Posts from "../components/Posts/Posts";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Articles />
      <Posts />
      <WilderMessages />
      <Footer />
    </motion.div>
  );
};

export default HomePage;
