import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import {MeterType} from '@app/entities/asset/standard-entries/MeterType';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';

export const METER_TYPES_KEY = 'METER_TYPES';

export const getMeterTypes = async (): Promise<AxiosResponse<MeterType[]>> => {
  return http.get(FsxUri.assets.SE.assetMeterType.all);
};

export const useMeterTypes = () => {
  const result = useQuery(METER_TYPES_KEY, getMeterTypes);

  return result;
};
