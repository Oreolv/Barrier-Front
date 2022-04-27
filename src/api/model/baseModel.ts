export interface BasicPageParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
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
  avatar?: string;
  cname: string;
  uname: string;
  uphone: string;
  nickName: string;
}

export interface UserInfo {
  username: string;
  real_name: string;
  avatar: string;
}

export interface BasicApplyItem {
  id: number;
  applicant: number;
  applicantInfo: ResidentInfo;
  approver: number;
  approve_time: string;
  approverInfo: UserInfo;
  status: number;
  description: string;
  start_time: string;
  end_time: string;
}
