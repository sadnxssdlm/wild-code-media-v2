import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type {
  CreatePostData,
  Post,
  PostWithAuthor,
  PostWithAuthorRaw,
} from "../../types/express";

class PostRepository {
  async findAllWithAuthors(): Promise<PostWithAuthor[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT
        p.id,
        p.title,
        p.content,
        p.image,
        p.code_snippet,
        p.user_id,
        p.created_at,
        p.updated_at,
        u.id as author_id,
        u.username as author_username,
        u.first_name as author_first_name,
        u.last_name as author_last_name,
        u.avatar as author_avatar
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC`,
    );

    return (rows as PostWithAuthorRaw[]).map((row) => ({
      id: row.id,
      title: row.title,
      content: row.content,
      image: row.image,
      code_snippet: row.code_snippet,
      user_id: row.user_id,
      created_at: row.created_at,
      updated_at: row.updated_at,
      author: {
        id: row.author_id,
        username: row.author_username,
        first_name: row.author_first_name,
        last_name: row.author_last_name,
        avatar: row.author_avatar,
      },
    }));
  }

  async findById(id: number): Promise<Post | undefined> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM posts WHERE id = ?",
      [id],
    );

    return rows[0] as Post | undefined;
  }

  async update(id: number, postData: Partial<CreatePostData>): Promise<void> {
    await databaseClient.query<Result>(
      "UPDATE posts SET title = ?, content = ?, image = ?, code_snippet = ? WHERE id = ?",
      [
        postData.title,
        postData.content || null,
        postData.image || null,
        postData.code_snippet || null,
        id,
      ],
    );
  }

  async create(postData: CreatePostData): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO posts (title, content, image, code_snippet, user_id) VALUES (?, ?, ?, ?, ?)",
      [
        postData.title,
        postData.content || null,
        postData.image || null,
        postData.code_snippet || null,
        postData.user_id,
      ],
    );

    return result.insertId;
  }
  async delete(id: number): Promise<void> {
    await databaseClient.query<Result>("DELETE FROM posts WHERE id = ?", [id]);
  }
}

export default new PostRepository();
