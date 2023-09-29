import Classification from '../entities/Classification';

export interface IServiceResponse<T> {
  status: string;
  data?: T | T[] | string | Classification[]
}
