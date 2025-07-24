import { motion } from "framer-motion";
import "../../assets/styles/Articles.css";
import { articlesData } from "../../data/articles";

const Articles = () => {
  const handleCardClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section className="articles">
      <div className="articles-grid">
        {articlesData.map((article, index) => (
          <motion.button
            key={article.id}
            type="button"
            className="article-card"
            onClick={() => handleCardClick(article.link)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 15px 35px rgba(183, 33, 147, 0.4)",
              zIndex: 10,
              transition: { duration: 0.15 },
            }}
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          >
            <img src={article.image} alt={`Article ${article.id}`} />
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default Articles;
