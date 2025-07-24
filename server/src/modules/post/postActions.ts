import type { RequestHandler } from "express";

import postRepository from "./postRepository";

// The B of BREAD - Browse operation (Read All)
const browse: RequestHandler = async (req, res, next) => {
  try {
    const posts = await postRepository.findAllWithAuthors();

    res.status(200).json({
      message: "Posts received successfully",
      data: posts,
      count: posts.length,
    });
  } catch (err) {
    next(err);
  }
};

// Future BREAD operations for posts management:

// The R of BREAD - Read operation (Get single post)
const read: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const post = await postRepository.findById(postId);

    if (!post) {
      res.status(404).json({
        error: "Post not found",
        message: "The requested post does not exist",
      });
      return;
    }

    res.status(200).json({
      message: "Post found successfully",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit operation (Update post)
const edit: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.validatedId || req.params.id);
    const { title, content, image, code_snippet } = req.body;

    const updateData = {
      title: title?.trim(),
      content: content?.trim(),
      image: image?.trim(),
      code_snippet: code_snippet?.trim(),
    };

    await postRepository.update(postId, updateData);

    res.status(200).json({
      message: "Post updated successfully",
      data: { id: postId, ...updateData },
    });
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add operation (Create post)
const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: "Authentication required",
        message: "You must be logged in to create a post",
      });
      return;
    }

    const { title, content, image, code_snippet } = req.body;

    const postData = {
      title: title.trim(),
      content: content?.trim() || undefined,
      image: image?.trim() || undefined,
      code_snippet: code_snippet?.trim() || undefined,
      user_id: req.user.userId, // Utiliser l'ID du JWT
    };

    const insertId = await postRepository.create(postData);

    res.status(201).json({
      message: "Post created successfully",
      post: {
        id: insertId,
        title: postData.title,
        content: postData.content,
        image: postData.image,
        code_snippet: postData.code_snippet,
        user_id: postData.user_id,
      },
    });
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Delete operation (Remove post)
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const postId = Number(req.params.validatedId || req.params.id);
    const post = req.post;

    // Le middleware checkPostOwnership garantit que post existe
    if (!post) {
      res.status(500).json({
        error: "Internal error",
        message: "Post data not found in request",
      });
      return;
    }

    await postRepository.delete(postId);

    res.status(200).json({
      message: "Post deleted successfully",
      deleted_post: {
        id: post.id,
        title: post.title,
        user_id: post.user_id,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
