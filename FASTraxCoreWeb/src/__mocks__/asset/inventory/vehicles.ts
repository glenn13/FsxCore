import {AxiosResponse} from 'axios';
import {QueryResult} from 'react-query';
import {Vehicle, newVehicle} from '../../../entities/asset/inventory/Vehicle';

export const mockVehiclesQuery = (): QueryResult<AxiosResponse<Vehicle[]>> =>
  ({data: {data: [newVehicle(), newVehicle()]}} as QueryResult<AxiosResponse<Vehicle[]>>);
