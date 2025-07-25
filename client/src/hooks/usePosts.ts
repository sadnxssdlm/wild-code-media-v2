import { useCallback, useEffect, useState } from "react";
import { useError } from "../contexts/ErrorContext";
import { apiService } from "../services/api";
import type { PostWithAuthor } from "../types/types";

export const usePosts = () => {
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const { addError } = useError();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsData = await apiService.getPosts();
      setPosts(postsData);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des posts";
      addError(message, "error");
    } finally {
      setLoading(false);
    }
  }, [addError]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addPostToList = (newPost: PostWithAuthor) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    addError("Post créé avec succès !", "success");
  };

  const removePostFromList = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    addError("Post supprimé avec succès", "success");
  };

  return {
    posts,
    loading,
    error: null,
    refetch: fetchPosts,
    addPostToList,
    removePostFromList,
  };
};
