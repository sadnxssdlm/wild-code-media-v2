import type { NextFunction, Request, Response } from "express";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      error: "Missing required fields",
      message: "Username, email, and password are required",
    });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({
      error: "Invalid email format",
      message: "Please provide a valid email address",
    });
    return;
  }

  if (!isValidPassword(password)) {
    res.status(400).json({
      error: "Weak password",
      message:
        "Password must be at least 8 characters long and contain uppercase, lowercase, and numbers",
    });
    return;
  }

  if (username.length < 3 || username.length > 50) {
    res.status(400).json({
      error: "Invalid username",
      message: "Username must be between 3 and 50 characters",
    });
    return;
  }

  next();
};

export const validateLoginData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Missing required fields",
      message: "Email and password are required",
    });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).json({
      error: "Invalid email format",
      message: "Please provide a valid email address",
    });
    return;
  }

  next();
};

export const validatePostData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, content } = req.body;

  if (!title) {
    res.status(400).json({
      error: "Missing required fields",
      message: "Title is required",
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

  if (content && content.length > 10000) {
    res.status(400).json({
      error: "Content too long",
      message: "Content must not exceed 10,000 characters",
    });
    return;
  }

  next();
};

export const validatePostId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = Number(req.params.id);

  if (!postId || Number.isNaN(postId)) {
    res.status(400).json({
      error: "Invalid post ID",
      message: "Post ID must be a valid number",
    });
    return;
  }

  req.params.validatedId = postId.toString();
  next();
};
