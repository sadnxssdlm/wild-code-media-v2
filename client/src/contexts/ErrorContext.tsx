import { type ReactNode, createContext, useContext, useState } from "react";

export interface AppError {
  id: string;
  message: string;
  type: "error" | "warning" | "info" | "success";
  timestamp: Date;
  details?: string;
}

interface ErrorContextType {
  errors: AppError[];
  addError: (
    message: string,
    type?: AppError["type"],
    details?: string,
  ) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = (
    message: string,
    type: AppError["type"] = "error",
    details?: string,
  ) => {
    const error: AppError = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      type,
      timestamp: new Date(),
      details,
    };

    setErrors((prev) => [error, ...prev]);

    if (type === "success" || type === "info") {
      setTimeout(() => {
        removeError(error.id);
      }, 5000);
    }
  };

  const removeError = (id: string) => {
    setErrors((prev) => prev.filter((error) => error.id !== id));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const value: ErrorContextType = {
    errors,
    addError,
    removeError,
    clearErrors,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
