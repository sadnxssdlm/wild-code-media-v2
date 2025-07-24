// Article types
export interface Article {
  id: number;
  image: string;
  link: string;
}

// Post types (from backend)
export interface Post {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface PostWithAuthor {
  id: number;
  title: string;
  content?: string;
  image?: string;
  code_snippet?: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}
