import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
};

type CreateUserData = {
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
};

class AuthRepository {
  async create(userData: CreateUserData) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users (username, email, password_hash, first_name, last_name, avatar) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userData.username,
        userData.email,
        userData.password_hash,
        userData.first_name || null,
        userData.last_name || null,
        userData.avatar || null,
      ],
    );

    return result.insertId;
  }

  async findByEmailOrUsername(email: string, username: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username],
    );

    return rows[0] as User | undefined;
  }

  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return rows[0] as User | undefined;
  }

  async findById(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );

    return rows[0] as User | undefined;
  }
}

export default new AuthRepository();
export type { User, CreateUserData };
