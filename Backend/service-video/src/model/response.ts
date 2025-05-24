
  export interface IResponse<T> {
  data: T;
  message: string;
  status: number;
}
export class ResponseService {
  responseSend = <T>(data: T, message: string, code: number): IResponse<T> => {
    return {
      data,
      message,
      status: code,
    };
  };
}
