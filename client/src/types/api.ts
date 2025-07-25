// Generic API response wrapper
export interface ApiResponse<T> {
  message: string;
  data: T;
  count?: number;
}
