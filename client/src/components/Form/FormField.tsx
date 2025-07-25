import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { forwardRef } from "react";

interface FormFieldProps
  extends Omit<TextFieldProps, "onChange" | "onBlur" | "error"> {
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  icon?: React.ReactNode;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      name,
      value,
      error,
      touched,
      isPassword = false,
      showPassword = false,
      onTogglePassword,
      onChange,
      onBlur,
      icon,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(name, e.target.value);
    };

    const handleBlur = () => {
      onBlur(name);
    };

    return (
      <TextField
        ref={ref}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched && !!error}
        helperText={touched && error}
        type={isPassword && !showPassword ? "password" : "text"}
        fullWidth
        variant="outlined"
        sx={{
          "& .MuiInputBase-input": { color: "#fff" },
          "& .MuiInputBase-inputMultiline": { color: "#fff" },
          "& .MuiInputLabel-root": { color: "#b72193" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#5925e9" },
            "&:hover fieldset": { borderColor: "#b72193" },
            "&.Mui-focused fieldset": { borderColor: "#5925e9" },
          },
          "& .MuiFormHelperText-root": { color: "#ff6b6b" },
        }}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start" sx={{ color: "#b72193" }}>
              {icon}
            </InputAdornment>
          ),
          endAdornment: isPassword && onTogglePassword && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={onTogglePassword}
                edge="end"
                sx={{ color: "#b72193" }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  },
);

FormField.displayName = "FormField";

export default FormField;
