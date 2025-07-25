import { useMemo } from "react";

export interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  criteria: PasswordCriteria;
}

const STRENGTH_MAP = {
  0: { label: "Très faible", color: "#f56565" },
  1: { label: "Faible", color: "#ed8936" },
  2: { label: "Moyen", color: "#ecc94b" },
  3: { label: "Bon", color: "#48bb78" },
  4: { label: "Fort", color: "#38a169" },
  5: { label: "Très fort", color: "#2f855a" },
};

export const usePasswordStrength = (password: string): PasswordStrength => {
  return useMemo(() => {
    const criteria: PasswordCriteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const score = Object.values(criteria).filter(Boolean).length;
    const { label, color } = STRENGTH_MAP[score as keyof typeof STRENGTH_MAP];

    return {
      score,
      label,
      color,
      criteria,
    };
  }, [password]);
};
