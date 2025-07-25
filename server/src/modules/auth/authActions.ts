import argon2 from "argon2";
import type { RequestHandler } from "express";

import { generateToken } from "../../middlewares/auth";
import authRepository from "./authRepository";

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });
};

const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    return false;
  }
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password, first_name, last_name, avatar } =
      req.body;

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

    const token = generateToken({
      id: insertId,
      email: userData.email,
      username: userData.username,
    });

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
      token,
    });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.findByEmail(email.toLowerCase().trim());
    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "Invalid email or password",
      });
      return;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export default { register, login };
