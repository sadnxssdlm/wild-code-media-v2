import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { IconButton } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { type AppError, useError } from "../../contexts/ErrorContext";
import "./ErrorToast.css";

const ErrorToast = () => {
  const { errors, removeError } = useError();

  const getIcon = (type: AppError["type"]) => {
    switch (type) {
      case "error":
        return <ErrorRoundedIcon />;
      case "warning":
        return <WarningRoundedIcon />;
      case "info":
        return <InfoRoundedIcon />;
      case "success":
        return <CheckCircleRoundedIcon />;
      default:
        return <ErrorRoundedIcon />;
    }
  };

  const getColorClass = (type: AppError["type"]) => {
    switch (type) {
      case "error":
        return "toast-error";
      case "warning":
        return "toast-warning";
      case "info":
        return "toast-info";
      case "success":
        return "toast-success";
      default:
        return "toast-error";
    }
  };

  return (
    <div className="error-toast-container">
      <AnimatePresence mode="popLayout">
        {errors.slice(0, 5).map((error) => (
          <motion.div
            key={error.id}
            className={`error-toast ${getColorClass(error.type)}`}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: 300,
              scale: 0.5,
              transition: { duration: 0.2 },
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            layout
          >
            <div className="toast-content">
              <div className="toast-icon">{getIcon(error.type)}</div>
              <div className="toast-text">
                <div className="toast-message">{error.message}</div>
                {error.details && (
                  <div className="toast-details">{error.details}</div>
                )}
              </div>
            </div>
            <IconButton
              size="small"
              onClick={() => removeError(error.id)}
              className="toast-close"
              aria-label="Fermer la notification"
            >
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ErrorToast;
