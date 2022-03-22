declare module 'taro-axios' {
  interface IAxios {
    errorcode: string;
    message: string;
    result: Object;
  }
  export interface AxiosResponse<T = any> extends IAxios {}
}
