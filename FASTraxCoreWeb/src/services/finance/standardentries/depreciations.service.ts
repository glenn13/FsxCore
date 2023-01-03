import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import { DepreciationMethod } from '@app/entities/asset/standard-entries/DepreciationMethod';

const KEY = 'DEPRECIATION_METHOD';

export const getDepreciationMethods = async (): Promise<AxiosResponse<DepreciationMethod[]>> => {
  return await http.get(FsxUri.finance.SE.depreciationMethods.all);
};

export const useDepreciationMethods = () => {
  const result = useQuery(KEY, getDepreciationMethods);

  return result;
};
