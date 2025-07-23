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
// TODO: Get specific post by ID with author info
// const read: RequestHandler = async (req, res, next) => { ... }

// The E of BREAD - Edit operation (Update post)
// TODO: Update existing post (only by author or admin)
// const edit: RequestHandler = async (req, res, next) => { ... }

// The A of BREAD - Add operation (Create post)
// TODO: Create new post (requires authentication)
// const add: RequestHandler = async (req, res, next) => { ... }

// The D of BREAD - Delete operation (Remove post)
// TODO: Delete post (only by author or admin)
// const destroy: RequestHandler = async (req, res, next) => { ... }

export default { browse };
