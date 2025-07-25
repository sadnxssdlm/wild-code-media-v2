import {
  EmailRounded,
  ImageRounded,
  LockRounded,
  PersonRounded,
} from "@mui/icons-material";
import { Alert, Box, CircularProgress, Slide, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../contexts/ErrorContext";
import { usePasswordStrength } from "../../hooks/usePasswordStrength";
import { apiService } from "../../services/api";
import type { RegisterData } from "../../types";
import { validationRules } from "../../utils/validation";
import WildButton from "../Button/WildButton";
import FormField from "../Form/FormField";
import PasswordStrengthIndicator from "../Form/PasswordStrengthIndicator";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof RegisterData, boolean>>
  >({});

  const navigate = useNavigate();
  const { login } = useAuth();
  const { addError } = useError();
  const passwordStrength = usePasswordStrength(formData.password);

  const handleFieldChange = (name: string, value: string) => {
    const fieldName = name as keyof RegisterData;
    setFormData((prev: RegisterData) => ({ ...prev, [fieldName]: value }));

    // Validate field if touched
    if (touched[fieldName]) {
      const validator =
        validationRules[fieldName as keyof typeof validationRules];
      const error = validator ? validator(value) : undefined;
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    const fieldName = name as keyof RegisterData;
    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const validator =
      validationRules[fieldName as keyof typeof validationRules];
    const error = validator ? validator(formData[fieldName] || "") : undefined;
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterData, string>> = {};

    // Required fields
    const requiredFields: (keyof RegisterData)[] = [
      "username",
      "email",
      "password",
    ];

    for (const field of requiredFields) {
      const validator = validationRules[field as keyof typeof validationRules];
      if (validator) {
        const error = validator(formData[field] || "");
        if (error) newErrors[field] = error;
      }
    }

    // Optional fields
    const optionalFields: (keyof RegisterData)[] = [
      "first_name",
      "last_name",
      "avatar",
    ];

    for (const field of optionalFields) {
      if (formData[field]) {
        const validator =
          validationRules[field as keyof typeof validationRules];
        if (validator) {
          const error = validator(formData[field] || "");
          if (error) newErrors[field] = error;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      first_name: true,
      last_name: true,
      avatar: true,
    });

    if (!validateForm()) {
      return;
    }

    if (passwordStrength.score < 3) {
      addError(
        "Le mot de passe doit être au moins de niveau 'Moyen'",
        "warning",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiService.register(formData);
      login(response.user, response.token);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      addError(
        err instanceof Error ? err.message : "Erreur d'inscription",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.values(errors).some((error) => !!error);
    const hasRequiredFields =
      formData.username && formData.email && formData.password;
    return !hasErrors && hasRequiredFields && passwordStrength.score >= 3;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="register-title"
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
        id="register-title"
        variant="h4"
        fontWeight={700}
        mb={1}
        color="#fff"
        sx={{ fontSize: { xs: "1.75rem", sm: "2.125rem" } }}
      >
        Inscription
      </Typography>

      <Typography
        mb={4}
        color="#d1d5db"
        fontSize={16}
        textAlign="center"
        sx={{ maxWidth: 400 }}
      >
        Rejoins la communauté Wild Code Media et partage tes expériences de
        développeur !
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
          Inscription réussie ! Redirection en cours...
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
          name="username"
          label="Nom d'utilisateur"
          value={formData.username}
          error={errors.username}
          touched={touched.username}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          icon={<PersonRounded />}
          required
          autoComplete="username"
          inputProps={{ maxLength: 50 }}
        />

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

        <Box>
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
            autoComplete="new-password"
            inputProps={{ maxLength: 128 }}
          />
          <PasswordStrengthIndicator password={formData.password} />
        </Box>

        <FormField
          name="first_name"
          label="Prénom (optionnel)"
          value={formData.first_name || ""}
          error={errors.first_name}
          touched={touched.first_name}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          autoComplete="given-name"
          inputProps={{ maxLength: 100 }}
        />

        <FormField
          name="last_name"
          label="Nom (optionnel)"
          value={formData.last_name || ""}
          error={errors.last_name}
          touched={touched.last_name}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          autoComplete="family-name"
          inputProps={{ maxLength: 100 }}
        />

        <FormField
          name="avatar"
          label="URL Avatar (optionnel)"
          value={formData.avatar || ""}
          error={errors.avatar}
          touched={touched.avatar}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          icon={<ImageRounded />}
          placeholder="https://exemple.com/avatar.jpg"
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
            "S'inscrire"
          )}
        </WildButton>

        <Typography
          variant="body2"
          color="#d1d5db"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Déjà un compte ?{" "}
          <Box
            component="a"
            href="/login"
            sx={{
              color: "#b72193",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Se connecter
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
