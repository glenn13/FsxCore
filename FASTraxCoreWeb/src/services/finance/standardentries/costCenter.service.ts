import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import CostCenter from '../../../entities/finance/standard-entries/ConstCenter';

export const KEY = 'COST_CENTER';

export const getCostCenters = () => {
  return http.get<CostCenter[]>(uri.finance.SE.costCenters.all);
};

export const useCostCenters = () => useQuery(KEY, getCostCenters);
