import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import { FuelType } from '@app/entities/asset/standard-entries/FuelType';

export const FUEL_TYPES_KEY = 'FUEL_TYPES';

export const getFuelTypes = async (): Promise<AxiosResponse<FuelType[]>> => {
    return http.get(FsxUri.assets.SE.assetFuelType.all);
};

export const useFuelTypes = () => useQuery(FUEL_TYPES_KEY, getFuelTypes);
