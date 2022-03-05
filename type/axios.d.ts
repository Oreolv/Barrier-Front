declare module 'taro-axios' {
  interface IAxios {
    errorcode: string;
    message: string;
    data: Object;
  }
  export interface AxiosResponse<T = any> extends IAxios {}
}
