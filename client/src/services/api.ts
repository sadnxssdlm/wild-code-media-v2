import type { ApiResponse, PostWithAuthor } from "../types";

const API_BASE_URL = "http://localhost:3310";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
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
}

export const apiService = new ApiService();
