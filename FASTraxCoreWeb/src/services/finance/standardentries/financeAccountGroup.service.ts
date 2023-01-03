import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import FinanceAccountGroup from '../../../entities/finance/standard-entries/FinanceAccountGroup';

export const KEY = 'FINANCE_ACCOUNT_GROUP'

export const getFinanceAccountGroups = () => {
    return http.get<FinanceAccountGroup[]>(uri.finance.SE.financeAccountGroup.all);
}

export const useFinanceAccountGroups = () => useQuery(KEY, getFinanceAccountGroups);