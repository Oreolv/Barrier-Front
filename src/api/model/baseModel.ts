export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  rows: T[];
  count: number;
}

export interface BasicTimeResult {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
