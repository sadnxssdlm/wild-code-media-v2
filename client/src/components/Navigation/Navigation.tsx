import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import logoWhite from "../../assets/images/wcmlogowhite.png";
import "../../assets/styles/Navigation.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="nav-container">
        <motion.div
          className="nav-logo"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <img src={logoWhite} alt="WCM Logo" className="logo-img" />
        </motion.div>

        <motion.div
          className="nav-links desktop-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="/"
            className="nav-link"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <HomeRoundedIcon className="nav-icon" />
            </motion.div>
            Accueil
          </motion.a>
          <motion.a
            href="/about"
            className="nav-link"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <InfoRoundedIcon className="nav-icon" />
            </motion.div>
            A propos
          </motion.a>
          <motion.a
            href="/signin"
            className="nav-link nav-signin"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.2 }}
            >
              <AccountCircleRoundedIcon className="nav-icon" />
            </motion.div>
            Connexion
          </motion.a>
        </motion.div>

        <motion.button
          type="button"
          className="burger-menu"
          onClick={toggleMenu}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CloseRoundedIcon />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MenuRoundedIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-nav open"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                href="/"
                className="nav-link"
                onClick={toggleMenu}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ x: 10 }}
              >
                <HomeRoundedIcon className="nav-icon" />
                Accueil
              </motion.a>
              <motion.a
                href="/about"
                className="nav-link"
                onClick={toggleMenu}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ x: 10 }}
              >
                <InfoRoundedIcon className="nav-icon" />A propos
              </motion.a>
              <motion.a
                href="/signin"
                className="nav-link nav-signin"
                onClick={toggleMenu}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ x: 10 }}
              >
                <AccountCircleRoundedIcon className="nav-icon" />
                Connexion
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
