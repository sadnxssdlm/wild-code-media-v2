import type { RequestHandler } from "express";

import authRepository from "../auth/authRepository";
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
// TODO: Get specific post by ID with author info
// const read: RequestHandler = async (req, res, next) => { ... }

// The E of BREAD - Edit operation (Update post)
// TODO: Update existing post (only by author or admin)
// const edit: RequestHandler = async (req, res, next) => { ... }

// The A of BREAD - Add operation (Create post)
const add: RequestHandler = async (req, res, next) => {
  try {
    const { title, content, image, code_snippet, user_id } = req.body;

    if (!title || !user_id) {
      res.status(400).json({
        error: "Missing required fields",
        message: "Title and user_id are required",
      });
      return;
    }

    if (title.length < 3 || title.length > 255) {
      res.status(400).json({
        error: "Invalid title",
        message: "Title must be between 3 and 255 characters",
      });
      return;
    }

    const user = await authRepository.findById(user_id);
    if (!user) {
      res.status(404).json({
        error: "User not found",
        message: "The specified user does not exist",
      });
      return;
    }

    if (content && content.length > 10000) {
      res.status(400).json({
        error: "Content too long",
        message: "Content must not exceed 10,000 characters",
      });
      return;
    }

    const postData = {
      title: title.trim(),
      content: content?.trim() || undefined,
      image: image?.trim() || undefined,
      code_snippet: code_snippet?.trim() || undefined,
      user_id: Number(user_id),
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
// TODO: Delete post (only by author or admin)
// const destroy: RequestHandler = async (req, res, next) => { ... }

export default { browse, add };
