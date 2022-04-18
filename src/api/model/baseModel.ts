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

export interface ResidentInfo {
  cname: string;
  uname: string;
  uphone: string;
}

export interface BasicApplyItem {
  id: number;
  applicant: number;
  applicantInfo: ResidentInfo;
  status: number;
  description: string;
  startTime: string;
  endTime: string;
}
