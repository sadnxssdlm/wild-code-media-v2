import { useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { apiService } from "../services/api";

export const usePostDeletion = (onPostDeleted: (postId: number) => void) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { addError } = useError();

  const deletePost = async (id: number) => {
    if (!window.confirm("Supprimer ce post ?")) {
      return;
    }

    setDeletingId(id);
    try {
      await apiService.deletePost(id);
      onPostDeleted(id);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erreur lors de la suppression";
      addError(message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  return {
    deletingId,
    deletePost,
  };
};
