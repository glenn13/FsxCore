import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import FinanceAccountType from '../../../entities/finance/standard-entries/FinanceAccountType';

export const KEY = 'FINANCEN_ACCOUNT_TYPE';

export const getFinanceAccountTypes = () => {
    return http.get<FinanceAccountType[]>(uri.finance.SE.financeAccountType.all);
}

export const useFinanceAccountTypes = () => useQuery(KEY, getFinanceAccountTypes);