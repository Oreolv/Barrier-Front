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
  avatar?: string;
  cname: string;
  uname: string;
  uphone: string;
}

export interface UserInfo {
  username: string;
  realName: string;
  avatar: string;
}

export interface BasicApplyItem {
  id: number;
  applicant: number;
  applicantInfo: ResidentInfo;
  approver: number;
  approveTime: string;
  approverInfo: UserInfo;
  status: number;
  description: string;
  startTime: string;
  endTime: string;
}
