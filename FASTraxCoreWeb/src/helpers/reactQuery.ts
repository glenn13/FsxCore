import {QueryResult, queryCache} from 'react-query';

export type InferQueryResult<T> = T extends QueryResult<infer U>
  ? U
  : T extends (...args: any) => QueryResult<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T;

export const getQueryData = <T = unknown>(key: string) => {
  return queryCache.getQueryData<InferQueryResult<T>>(key);
};

export const getQuery = <T = unknown, E = unknown>(key: string) => {
  return queryCache.getQuery<InferQueryResult<T>, E>(key);
};
