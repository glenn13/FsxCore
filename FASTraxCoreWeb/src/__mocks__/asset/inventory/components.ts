import {AxiosResponse} from 'axios';
import {QueryResult} from 'react-query';
import {Component, newComponent} from '../../../entities/asset/inventory/Component';

export const mockComponentsQuery = (): QueryResult<AxiosResponse<Component[]>> =>
  ({data: {data: [newComponent(), newComponent(), newComponent()]}} as QueryResult<
    AxiosResponse<Component[]>
  >);
