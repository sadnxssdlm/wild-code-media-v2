import type { MyPayload } from "../../middlewares/auth";

export type Post = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
};

export type User = {
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

export type CreatePostData = {
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
};

export type PostWithAuthor = {
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

export type PostWithAuthorRaw = {
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

declare global {
  namespace Express {
    interface Request {
      user?: MyPayload;
      post?: Post;
      userExists?: User;
    }
  }
}
