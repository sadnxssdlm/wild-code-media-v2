import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import postRepository from "../modules/post/postRepository";

export type MyPayload = {
  userId: number;
  email: string;
  username: string;
};

export type JWTUser = {
  id: number;
  email: string;
  username: string;
};

// ===== JWT UTILS =====
export const generateToken = (user: JWTUser): string => {
  const payload: MyPayload = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign(payload, process.env.APP_SECRET as string);
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("token missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("token missing");
    }

    const payload = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;

    req.user = payload;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

const optionalToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token) {
        const payload = jwt.verify(
          token,
          process.env.APP_SECRET as string,
        ) as MyPayload;
        req.user = payload;
      }
    }
    next();
  } catch (err) {
    next();
  }
};

export const checkPostOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: "Authentication required",
        message: "You must be logged in to perform this action",
      });
      return;
    }

    const postId = Number(req.params.validatedId || req.params.id);

    const post = await postRepository.findById(postId);
    if (!post) {
      res.status(404).json({
        error: "Post not found",
        message: "The specified post does not exist",
      });
      return;
    }

    if (post.user_id !== req.user.userId) {
      res.status(403).json({
        error: "Forbidden",
        message: "You can only modify your own posts",
      });
      return;
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(500).json({
      error: "Ownership verification error",
      message: "An error occurred while verifying post ownership",
    });
  }
};

export { verifyToken as requireJWT, optionalToken as optionalJWT };
export default verifyToken;
