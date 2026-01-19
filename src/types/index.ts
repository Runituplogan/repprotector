export interface ApiError {
  message: string;
  status: string | number;
  data: Partial<{
    errors: string[];
    message: string;
    status: "error";
  }>;
  actions: {
    can_proceed: boolean;
  };
  headers: Partial<Record<string, unknown>>;
}

export type ApiResponse<T> = {
  status: string;
  message: string;
  error: Partial<Record<string, string[]> | string>;
  data: T;
};

export type QueryParams = Partial<{
  page: number;
  search: string;
  status: string;
}>;

export interface ResultData {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
