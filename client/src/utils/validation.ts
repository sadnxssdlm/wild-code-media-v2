export const validationRules = {
  username: (value: string): string | undefined => {
    if (!value) return "Le nom d'utilisateur est requis";
    if (value.length < 3)
      return "Le nom d'utilisateur doit contenir au moins 3 caractères";
    if (value.length > 50)
      return "Le nom d'utilisateur ne peut pas dépasser 50 caractères";
    if (!/^[a-zA-Z0-9_-]+$/.test(value))
      return "Seuls les lettres, chiffres, _ et - sont autorisés";
    return undefined;
  },

  email: (value: string): string | undefined => {
    if (!value) return "L'email est requis";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Format d'email invalide";
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (!value) return "Le mot de passe est requis";
    if (value.length < 8)
      return "Le mot de passe doit contenir au moins 8 caractères";
    return undefined;
  },

  // For login, we use a simpler password validation
  loginPassword: (value: string): string | undefined => {
    if (!value) return "Le mot de passe est requis";
    if (value.length < 6)
      return "Le mot de passe doit contenir au moins 6 caractères";
    return undefined;
  },

  firstName: (value: string): string | undefined => {
    if (value && value.length > 100)
      return "Le prénom ne peut pas dépasser 100 caractères";
    return undefined;
  },

  lastName: (value: string): string | undefined => {
    if (value && value.length > 100)
      return "Le nom ne peut pas dépasser 100 caractères";
    return undefined;
  },

  avatar: (value: string): string | undefined => {
    if (!value) return undefined;
    try {
      new URL(value);
      return undefined;
    } catch {
      return "L'URL de l'avatar n'est pas valide";
    }
  },
};
