import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const strength = usePasswordStrength(password);

  if (!password) return null;

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="body2" sx={{ color: "#d1d5db", mr: 1 }}>
          Force:
        </Typography>
        <Chip
          label={strength.label}
          size="small"
          sx={{
            backgroundColor: strength.color,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={(strength.score / 5) * 100}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: strength.color,
            borderRadius: 3,
          },
        }}
      />

      <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {Object.entries(strength.criteria).map(([key, met]) => (
          <Typography
            key={key}
            variant="caption"
            sx={{
              color: met ? "#48bb78" : "#9ca3af",
              fontSize: "0.7rem",
            }}
          >
            {getCriteriaLabel(key)} {met ? "✓" : "✗"}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

const getCriteriaLabel = (key: string): string => {
  const labels: Record<string, string> = {
    length: "8+ chars",
    uppercase: "Majuscule",
    lowercase: "Minuscule",
    number: "Chiffre",
    special: "Spécial",
  };
  return labels[key] || key;
};

export default PasswordStrengthIndicator;
