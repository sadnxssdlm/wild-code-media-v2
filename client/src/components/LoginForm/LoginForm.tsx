import { EmailRounded, LockRounded } from "@mui/icons-material";
import { Alert, Box, CircularProgress, Slide, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../contexts/ErrorContext";
import { apiService } from "../../services/api";
import type { LoginData } from "../../types";
import { validationRules } from "../../utils/validation";
import WildButton from "../Button/WildButton";
import FormField from "../Form/FormField";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof LoginData, boolean>>
  >({});

  const navigate = useNavigate();
  const { login } = useAuth();
  const { addError } = useError();

  const handleFieldChange = (name: string, value: string) => {
    const fieldName = name as keyof LoginData;
    setFormData((prev: LoginData) => ({ ...prev, [fieldName]: value }));

    // Validate field if touched
    if (touched[fieldName]) {
      const validatorKey =
        fieldName === "password" ? "loginPassword" : fieldName;
      const validator =
        validationRules[validatorKey as keyof typeof validationRules];
      const error = validator ? validator(value) : undefined;
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    const fieldName = name as keyof LoginData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const validatorKey = fieldName === "password" ? "loginPassword" : fieldName;
    const validator =
      validationRules[validatorKey as keyof typeof validationRules];
    const error = validator ? validator(formData[fieldName] || "") : undefined;
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginData, string>> = {};

    // Validate all fields
    for (const field of Object.keys(formData) as (keyof LoginData)[]) {
      const validatorKey = field === "password" ? "loginPassword" : field;
      const validator =
        validationRules[validatorKey as keyof typeof validationRules];
      if (validator) {
        const error = validator(formData[field] || "");
        if (error) newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.login(formData);
      login(response.user, response.token);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      addError(
        err instanceof Error ? err.message : "Erreur de connexion",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    const hasRequiredFields = formData.email && formData.password;
    return !hasErrors && hasRequiredFields;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="login-title"
      sx={{
        background: "#252525",
        borderRadius: { xs: 16, sm: 20 },
        boxShadow: "0 8px 32px 0 rgba(89,37,233,0.18)",
        padding: { xs: 3, sm: 4 },
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        backdropFilter: "blur(10px)",
        border: "2px solid transparent",
        backgroundImage:
          "linear-gradient(#252525, #252525), var(--background-gradient)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
      }}
    >
      <Typography
        id="login-title"
        variant="h4"
        fontWeight={700}
        mb={1}
        color="#fff"
        sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
      >
        Connexion
      </Typography>

      <Typography
        mb={4}
        color="#d1d5db"
        fontSize={16}
        textAlign="center"
        sx={{ maxWidth: 400 }}
      >
        Connecte-toi à ton compte Wild Code Media
      </Typography>

      <Slide direction="up" in={success} mountOnEnter unmountOnExit>
        <Alert
          severity="success"
          sx={{
            width: "100%",
            mb: 3,
            backgroundColor: "rgba(72, 187, 120, 0.1)",
            border: "1px solid rgba(72, 187, 120, 0.3)",
            color: "#68d391",
            "& .MuiAlert-icon": { color: "#68d391" },
          }}
        >
          Connexion réussie ! Redirection en cours...
        </Alert>
      </Slide>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <FormField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          error={errors.email}
          touched={touched.email}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          icon={<EmailRounded />}
          required
          autoComplete="email"
        />

        <FormField
          name="password"
          label="Mot de passe"
          value={formData.password}
          error={errors.password}
          touched={touched.password}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          icon={<LockRounded />}
          isPassword
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
          autoComplete="current-password"
        />

        <WildButton
          type="submit"
          fullWidth
          disabled={isSubmitting || !isFormValid()}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: 18,
            fontWeight: 700,
            position: "relative",
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Se connecter"
          )}
        </WildButton>

        <Typography
          variant="body2"
          color="#d1d5db"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Pas encore de compte ?{" "}
          <Box
            component="a"
            href="/register"
            sx={{
              color: "#b72193",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            S'inscrire
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
