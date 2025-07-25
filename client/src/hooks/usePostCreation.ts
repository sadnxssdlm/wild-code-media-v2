import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useError } from "../contexts/ErrorContext";
import { apiService } from "../services/api";
import type { PostFormData, PostWithAuthor } from "../types/types";

export const usePostCreation = (
  onPostCreated: (post: PostWithAuthor) => void,
) => {
  const { user } = useAuth();
  const { addError } = useError();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PostFormData>({
    title: "",
    content: "",
    code_snippet: "",
  });
  const [creating, setCreating] = useState(false);

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      code_snippet: "",
    });
  };

  const openForm = () => {
    resetForm();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const updateForm = (field: keyof PostFormData, value: string) => {
    setForm((prev: PostFormData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await apiService.addPost(form);
      const newPost: PostWithAuthor = {
        ...response.post,
        author: user || { id: 0, username: "Anonyme", email: "" },
      };

      onPostCreated(newPost);
      closeForm();
    } catch (err: unknown) {
      let errorMessage = "Erreur lors de la création du post";

      if (err instanceof Response) {
        try {
          const data = await err.json();
          errorMessage = data.message || data.error || errorMessage;
        } catch {
          errorMessage = "Erreur de communication avec le serveur";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      addError(errorMessage, "error");
    } finally {
      setCreating(false);
    }
  };

  const isFormValid =
    form.title.length >= 3 &&
    form.title.length <= 255 &&
    (form.content?.length || 0) <= 10000;

  return {
    showForm,
    form,
    creating,
    error: null,
    isFormValid,
    openForm,
    closeForm,
    updateForm,
    handleSubmit,
  };
};
