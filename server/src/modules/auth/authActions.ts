import argon2 from "argon2";
import type { RequestHandler } from "express";

import authRepository from "./authRepository";

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password, first_name, last_name, avatar } =
      req.body;

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

    const existingUser = await authRepository.findByEmailOrUsername(
      email,
      username,
    );
    if (existingUser) {
      if (existingUser.email === email) {
        res.status(409).json({
          error: "Email already exists",
          message: "An account with this email already exists",
        });
        return;
      }
      res.status(409).json({
        error: "Username already exists",
        message: "This username is already taken",
      });
      return;
    }

    const password_hash = await hashPassword(password);

    const userData = {
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password_hash,
      first_name: first_name?.trim() || undefined,
      last_name: last_name?.trim() || undefined,
      avatar: avatar?.trim() || undefined,
    };

    const insertId = await authRepository.create(userData);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: insertId,
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        avatar: userData.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Authentication-specific operations:
// TODO: Login operation
// const login: RequestHandler = async (req, res, next) => { ... }

// TODO: Logout operation
// const logout: RequestHandler = async (req, res, next) => { ... }

export default { register };
