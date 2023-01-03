import {AxiosResponse} from 'axios';
import {FsxUri} from '@app/helpers/endpoints';
import { TransmissionType } from '@app/entities/asset/standard-entries/TransmissionType';
import http from '@app/services/http.service';
import {useQuery} from 'react-query';


export const TRANSMISSION_TYPE_KEY = 'TRANSMISSION_TYPE';

export const getTransmissionTypes = async (): Promise<AxiosResponse<TransmissionType[]>> => {
  return http.get(FsxUri.assets.SE.assetTransmissionType.all);
};

export const useTransmissionTypes = () => {
  const result = useQuery(TRANSMISSION_TYPE_KEY, getTransmissionTypes);

  return result;
};
