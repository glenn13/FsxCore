import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';

const KEY = 'DEPRECIATION_PERIOD_TYPE';

export const getDepreciationPeriodTypes = async (): Promise<AxiosResponse<DepreciationPeriodType[]>> => {
  return await http.get(FsxUri.finance.SE.depreciationPeriodTypes.all);
};

export const useDepreciationMethods = () => {
  const result = useQuery(KEY, getDepreciationPeriodTypes);

  return result;
};
