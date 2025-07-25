import type { Request, Response } from "express";
import postRepository from "./postRepository";

const browse = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.readAll();
    res.json({
      data: posts,
      message: "Posts récupérés avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const postId = Number.parseInt(req.params.id, 10);
    const post = await postRepository.read(postId);

    if (!post) {
      res.status(404).json({ error: "Post non trouvé" });
      return;
    }

    res.json({
      data: post,
      message: "Post récupéré avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du post:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const postId = Number.parseInt(req.params.id, 10);
    const { title, content, image, code_snippet } = req.body;

    const success = await postRepository.update(postId, {
      title,
      content,
      image,
      code_snippet,
    });

    if (!success) {
      res.status(404).json({ error: "Post non trouvé" });
      return;
    }

    const updatedPost = await postRepository.read(postId);
    res.json({
      data: updatedPost,
      message: "Post mis à jour avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du post:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const { title, content, image, code_snippet } = req.body;
    if (!req.user?.userId) {
      res.status(401).json({ error: "Utilisateur non authentifié" });
      return;
    }

    const newPostId = await postRepository.create({
      title,
      content,
      image,
      code_snippet,
      user_id: req.user.userId,
    });

    const newPost = await postRepository.read(newPostId);
    res.status(201).json({
      data: newPost,
      message: "Post créé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const postId = Number.parseInt(req.params.id, 10);
    const success = await postRepository.delete(postId);

    if (!success) {
      res.status(404).json({ error: "Post non trouvé" });
      return;
    }

    res.json({ message: "Post supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du post:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export default { browse, read, edit, add, destroy };
