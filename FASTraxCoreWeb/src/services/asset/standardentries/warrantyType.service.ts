import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import uri from '@app/helpers/endpoints';

export const WARRANTY_TYPES_KEY = 'WARRANTY_TYPES_KEY';

export const getWarrantyTypes = async (): Promise<AxiosResponse<WarrantyType[]>> => {
    return http.get(uri.assets.SE.warrantyType.all);
};

export const useWarrantyTypes = () => {
  const result = useQuery(WARRANTY_TYPES_KEY, getWarrantyTypes);
  return result;
};
