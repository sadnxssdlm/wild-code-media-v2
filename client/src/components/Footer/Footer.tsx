import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, IconButton, Link, Typography } from "@mui/material";
import logoWhite from "../../assets/images/wcmlogowhite.png";

const socialLinks = [
  { icon: <FacebookIcon />, url: "#", label: "Facebook" },
  { icon: <InstagramIcon />, url: "#", label: "Instagram" },
  { icon: <TwitterIcon />, url: "#", label: "Twitter" },
  { icon: <YouTubeIcon />, url: "#", label: "YouTube" },
];

const wildLinks = [
  { label: "À Propos", url: "#" },
  { label: "Conditions d’utilisations", url: "#" },
  { label: "Politique de confidentialité", url: "#" },
];
const ressourcesLinks = [
  { label: "Partagez vos créations", url: "#" },
  { label: "Documentation", url: "#" },
  { label: "TrouveTonCode", url: "#" },
];
const partenairesLinks = [
  { label: "Wild Code School", url: "#" },
  { label: "Externatic.fr", url: "#" },
  { label: "CineSphere.fr", url: "#" },
];

export default function Footer() {
  return (
    <Box
      className="footer"
      sx={{
        width: "100%",
        background: "var(--background-gradient)",
        color: "#fff",
        pt: { xs: 4, md: 6 },
        pb: 2,
        px: { xs: 1, md: 4 },
        fontFamily: "inherit",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Box
        className="footer-container"
        sx={{
          maxWidth: 1800,
          mx: "auto",
          px: { xs: 1, md: 3 },
        }}
      >
        <Box
          className="footer-main"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            gap: { xs: 4, md: 3 },
            mb: { xs: 2, md: 3 },
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            pb: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            className="footer-brand"
            sx={{
              flex: { md: "1 1 250px" },
              maxWidth: { xs: 280, md: "none" },
              mx: { xs: "auto", md: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              className="logo-container"
              sx={{
                mb: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={logoWhite}
                alt="WCM Logo"
                className="logo"
                style={{
                  maxWidth: 130,
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Box>
            <Box
              className="social-links"
              sx={{
                display: "flex",
                gap: 1,
                mt: 1.5,
                justifyContent: "center",
                width: "100%",
              }}
            >
              {socialLinks.map((s) => (
                <IconButton
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  sx={{
                    color: "#fff",
                    p: 1,
                    width: { xs: 36, md: 40 },
                    height: { xs: 36, md: 40 },
                    transition: "background 0.2s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
          <Box
            className="footer-nav"
            sx={{
              display: { xs: "none", md: "block" },
              flex: "1 1 160px",
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography className="nav-title" fontWeight={700} mb={1.25}>
              Wild Code Media
            </Typography>
            <Box
              component="ul"
              className="nav-list"
              sx={{ listStyle: "none", p: 0, m: 0 }}
            >
              {wildLinks.map((l) => (
                <Box component="li" key={l.label} sx={{ mb: 0.75 }}>
                  <Link
                    href={l.url}
                    className="nav-link"
                    sx={{
                      color: "#d1d5db",
                      fontSize: 15,
                      textDecoration: "none",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {l.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            className="footer-nav"
            sx={{
              display: { xs: "none", md: "block" },
              flex: "1 1 160px",
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography className="nav-title" fontWeight={700} mb={1.25}>
              Ressources
            </Typography>
            <Box
              component="ul"
              className="nav-list"
              sx={{ listStyle: "none", p: 0, m: 0 }}
            >
              {ressourcesLinks.map((l) => (
                <Box component="li" key={l.label} sx={{ mb: 0.75 }}>
                  <Link
                    href={l.url}
                    className="nav-link"
                    sx={{
                      color: "#d1d5db",
                      fontSize: 15,
                      textDecoration: "none",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {l.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            className="footer-nav"
            sx={{
              display: { xs: "none", md: "block" },
              flex: "1 1 160px",
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography className="nav-title" fontWeight={700} mb={1.25}>
              Partenaires
            </Typography>
            <Box
              component="ul"
              className="nav-list"
              sx={{ listStyle: "none", p: 0, m: 0 }}
            >
              {partenairesLinks.map((l) => (
                <Box component="li" key={l.label} sx={{ mb: 0.75 }}>
                  <Link
                    href={l.url}
                    className="nav-link"
                    sx={{
                      color: "#d1d5db",
                      fontSize: 15,
                      textDecoration: "none",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {l.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          className="footer-bottom"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            pt: { xs: 1.5, md: 1.5 },
            textAlign: "center",
          }}
        >
          <Typography
            className="copyright"
            sx={{
              color: "#fff",
              fontSize: 14,
              m: 0,
              px: 1,
              lineHeight: 1.5,
            }}
          >
            © {new Date().getFullYear()} Wild Code Media | All Rights Reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
