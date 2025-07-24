import { useState } from "react";
import logoWhite from "../assets/images/wcmlogowhite.png";
import "../assets/styles/Navigation.css";
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
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <img src={logoWhite} alt="WCM Logo" className="logo-img" />
        </div>

        <div className="nav-links desktop-nav">
          <a href="/" className="nav-link">
            <HomeRoundedIcon className="nav-icon" />
            Accueil
          </a>
          <a href="/about" className="nav-link">
            <InfoRoundedIcon className="nav-icon" />A propos
          </a>
          <a href="/signin" className="nav-link nav-signin">
            <AccountCircleRoundedIcon className="nav-icon" />
            Connexion
          </a>
        </div>

        <button type="button" className="burger-menu" onClick={toggleMenu}>
          {isMenuOpen ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </button>

        <div className={`mobile-nav ${isMenuOpen ? "open" : ""}`}>
          <a href="/" className="nav-link" onClick={toggleMenu}>
            <HomeRoundedIcon className="nav-icon" />
            Accueil
          </a>
          <a href="/about" className="nav-link" onClick={toggleMenu}>
            <InfoRoundedIcon className="nav-icon" />A propos
          </a>
          <a
            href="/signin"
            className="nav-link nav-signin"
            onClick={toggleMenu}
          >
            <AccountCircleRoundedIcon className="nav-icon" />
            Connexion
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
