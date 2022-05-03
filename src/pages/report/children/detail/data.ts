import { TripItem } from '/@/api/serve/trip/model';
import { BackItem } from '/@/api/serve/back/model';
import { AgencyItem } from '/@/api/serve/agency/model';
import { HealthItem } from '/@/api/serve/health/model';
import { VisitorItem } from '/@/api/serve/visitor/model';
import { AbnormalItem } from '/@/api/serve/abnormal/model';
import { MaterialItem } from '/@/api/serve/material/model';
import { removeTrip } from '/@/api/serve/trip';
import { removeBack } from '/@/api/serve/back';
import { removeHealth } from '/@/api/serve/health/index';
import { removeAgency } from '/@/api/serve/agency/index';
import { removeVisitor } from '/@/api/serve/visitor';
import { removeAbnormal } from '/@/api/serve/abnormal';
import { removeMaterial } from '/@/api/serve/material';
import { HospitalEnum, TemperatureEnum } from '/@/enums/serveEnum';

const riskStatus = ['低风险', '中风险', '高风险'];
const vehicleColumns = ['驾车', '大巴', '火车', '高铁', '飞机'];
const ifStatus = ['否', '是'];

export const DetailList = {
  visitor: (params: VisitorItem) => {
    return [
      {
        title: '访客姓名',
        content: params.visitor,
      },
      {
        title: '访问时间',
        content: `${params.start_time}至${params.end_time}`,
      },
      {
        title: '来自异地',
        content: params.foreign ? '是' : '否',
      },
      {
        title: '来自何地',
        content: params.come_from,
      },
    ];
  },
  trip: (params: TripItem) => {
    return [
      {
        title: '前往地区',
        content: params.destination,
      },
      {
        title: '行程时间',
        content: `${params.start_time}至${params.end_time}`,
      },
      {
        title: '交通工具',
        content: vehicleColumns[params.vehicle],
      },
      {
        title: '车牌/车次/航班号',
        content: params.vehicle_no,
      },
      {
        title: '座位号',
        content: params.vehicle_seat,
      },
    ];
  },
  back: (params: BackItem) => {
    return [
      {
        title: '来自何地',
        content: params.come_from,
      },
      {
        title: '风险等级',
        content: riskStatus[params.risk_status],
      },
      {
        title: '交通工具',
        content: vehicleColumns[params.vehicle],
      },
      {
        title: '车牌/车次/航班号',
        content: params.vehicle_no,
      },
      {
        title: '座位号',
        content: params.vehicle_seat,
      },
      {
        title: '到达时间',
        content: params.end_time,
      },
    ];
  },
  abnormal: (params: AbnormalItem) => {
    return [
      {
        title: '异常类型',
        content: params.type,
      },
      {
        title: '异常说明',
        content: params.content,
      },
    ];
  },
  health: (params: HealthItem) => {
    return [
      {
        title: '今日体温',
        content: TemperatureEnum[params.temperature],
      },
      {
        title: '是否为疑似、确诊患者',
        content: ifStatus[params.diagnosis],
      },
      {
        title: '是否接触疑似、确诊患者',
        content: ifStatus[params.contact],
      },
      {
        title: '是否有咳嗽、乏力等症状',
        content: ifStatus[params.symptom],
      },
      {
        title: '是否就诊或住院',
        content: HospitalEnum[params.hospital],
      },
    ];
  },
  material: (params: MaterialItem) => {
    return [
      {
        title: '物资类型',
        content: params.type,
      },
      {
        title: '详细说明',
        content: params.content,
      },
    ];
  },
  agency: (params: AgencyItem) => {
    return [
      {
        title: '事件类型',
        content: params.type,
      },
      {
        title: '详细说明',
        content: params.content,
      },
    ];
  },
};

export const FuncList = {
  trip: removeTrip,
  back: removeBack,
  health: removeHealth,
  agency: removeAgency,
  visitor: removeVisitor,
  abnormal: removeAbnormal,
  material: removeMaterial,
};
