export interface IServiceResponse<T> {
  status: string;
  data?: T | T[] | string
}
