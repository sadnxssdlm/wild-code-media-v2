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
  // The C of CRUD - Create operation
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

  // The R of CRUD - Read operation (specific query for registration validation)
  async findByEmailOrUsername(email: string, username: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username],
    );

    return rows[0] as User | undefined;
  }

  // The R of CRUD - Read operation (for login authentication)
  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    return rows[0] as User | undefined;
  }

  // Future CRUD operations for authentication system:

  // The R of CRUD - Read by ID (for future login/profile features)
  // async findById(id: number) { ... }

  // The U of CRUD - Update operation (for future profile updates)
  // async update(id: number, userData: Partial<User>) { ... }

  // The D of CRUD - Delete operation (for future account deletion)
  // async delete(id: number) { ... }
}

export default new AuthRepository();
export type { User, CreateUserData };
