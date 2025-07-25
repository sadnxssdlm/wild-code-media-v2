import type { User } from "./auth";

export interface Post {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface PostWithAuthor extends Post {
  author: User;
}

export interface PostFormData {
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
}
