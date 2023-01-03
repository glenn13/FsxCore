import {AxiosResponse} from 'axios';

export const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
});
