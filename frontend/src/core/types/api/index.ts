export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  totalCount?: number;
  currentPage?: number;
  totalPages?: number;
}
