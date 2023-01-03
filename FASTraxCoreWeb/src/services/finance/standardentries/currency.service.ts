import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import Currency from '../../../entities/finance/standard-entries/Currency';
import {trackPromise} from 'react-promise-tracker';

export const KEY = 'CURRENCY';

export const getCurrencies = () => {
  return trackPromise(http.get<Currency[]>(uri.finance.SE.currencies.all));
};

export const useCurrencies = () => useQuery(KEY, getCurrencies);
