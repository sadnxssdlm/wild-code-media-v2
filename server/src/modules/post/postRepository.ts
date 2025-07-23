import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Post = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

type CreatePostData = {
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
};

type PostWithAuthor = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  author: {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
  };
};

type PostWithAuthorRaw = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  author_id: number;
  author_username: string;
  author_first_name?: string;
  author_last_name?: string;
  author_avatar?: string;
};

class PostRepository {
  // The B of BREAD - Browse operation (Read All posts with author info)
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

  // Future CRUD operations for posts:

  // The R of BREAD - Read operation (Get single post by ID)
  // async findById(id: number): Promise<Post | undefined> { ... }

  // The E of BREAD - Edit operation (Update post)
  // async update(id: number, postData: Partial<Post>): Promise<void> { ... }

  // The A of BREAD - Add operation (Create new post)
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

  // The D of BREAD - Delete operation (Remove post)
  // async delete(id: number): Promise<void> { ... }
}

export default new PostRepository();
export type { Post, PostWithAuthor, CreatePostData };
