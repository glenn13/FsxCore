import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import {FsxUri} from '@app/helpers/endpoints';
import { EngineType } from '@app/entities/asset/standard-entries/EngineType';

export const ENGINE_TYPES_KEY = 'ENGINE_TYPES';

export const getEngineTypes = async (): Promise<AxiosResponse<EngineType[]>> => {
    return http.get(FsxUri.assets.SE.assetEngineType.all);
};

export const useEngineTypes = () => {
  const result = useQuery(ENGINE_TYPES_KEY, getEngineTypes);

  return result;
};
