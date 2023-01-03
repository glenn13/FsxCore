import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import {FuelTankSize} from '@app/entities/asset/standard-entries/FuelTankSize';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const FUEL_TANK_SIZE_KEY = 'FUEL_TANK_SIZE';

export const getFuelTankSize = async (): Promise<AxiosResponse<FuelTankSize[]>> => {
  return http.get(FsxUri.assets.SE.fuelTankSize.all);
};

export const useFuelTankSize = () => useQuery(FUEL_TANK_SIZE_KEY, getFuelTankSize);
