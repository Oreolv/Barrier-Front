import { ResultColor } from '/@/enums/colorEnum';
import { ApplyStatusEnum } from '/@/enums/serveEnums';

export const addPlusAndMinus = (data) => {
  if (typeof data === 'object') {
    for (const key of Object.keys(data)) {
      data[key] = data[key] >= 0 ? `+${data[key]}` : `${data[key]}`;
    }
    return data;
  }
  return data >= 0 ? `+${data}` : `${data}`;
};

export const transformDate = (time: string) => {
  const timestamp = Number(new Date());
  const last_timestamp = Number(new Date(time.replace(/-/g, '/')).getTime());
  const timer = (timestamp - last_timestamp) / 1000;
  let tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      if (timer >= 2592000 && timer < 365 * 86400) {
        tips = parseInt(timer / (86400 * 30)) + '个月前';
      } else {
        tips = parseInt(timer / (86400 * 365)) + '年前';
      }
  }
  return tips;
};

export const transformStatus = (status) => {
  let text, color;
  switch (status) {
    case ApplyStatusEnum.approval:
      text = '已通过';
      color = ResultColor.SUCCESS;
      break;
    case ApplyStatusEnum.reject:
      text = '已拒绝';
      color = ResultColor.ERROR;
      break;
    case ApplyStatusEnum.underReview:
      text = '待审批';
      color = ResultColor.WARNING;
      break;
  }
  return { text, color };
};

export function transformHealth(params) {
  const { temperature, diagnosis, contact, symptom, hospital } = params;
  const array = [temperature, diagnosis, contact, symptom, hospital];
  return array.some((i) => i > 0) ? '异常' : '无异常';
}
