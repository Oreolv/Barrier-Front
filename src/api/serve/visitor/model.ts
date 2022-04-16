export interface CreateVisitorParams {
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  startTime: string;
  endTime: string;
  healthCode: string[];
}

export interface VisitorItem {
  id: number;
  status: number;
  visitor: string;
  foreign: number;
  comeFrom: string;
  goTo: string;
  healthCode: string;
  startTime: string;
  endTime: string;
}

export type GetVisitorListResultModel = VisitorItem[];
