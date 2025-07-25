import type {
  ApiResponse,
  AuthResponse,
  LoginData,
  Post,
  PostFormData,
  PostWithAuthor,
  RegisterData,
} from "../types/types";

const API_BASE_URL = "http://localhost:3310";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPosts(): Promise<PostWithAuthor[]> {
    const response =
      await this.request<ApiResponse<PostWithAuthor[]>>("/api/posts");
    return response.data;
  }

  async getPost(id: number): Promise<PostWithAuthor> {
    const response = await this.request<ApiResponse<PostWithAuthor>>(
      `/api/posts/${id}`,
    );
    return response.data;
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async addPost(data: PostFormData): Promise<{ message: string; post: Post }> {
    const token = localStorage.getItem("token");
    return this.request<{ message: string; post: Post }>("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }

  async deletePost(id: number): Promise<{ message: string }> {
    const token = localStorage.getItem("token");
    return this.request<{ message: string }>(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }
}

export const apiService = new ApiService();
