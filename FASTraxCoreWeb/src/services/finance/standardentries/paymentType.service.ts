import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import PaymentType from '../../../entities/finance/standard-entries/PaymentType';

export const KEY = 'PAYMENT_TYPE';

export const getPaymentTypes = () => {
  return http.get<PaymentType[]>(uri.finance.SE.paymentTypes.all);
};

export const usePaymentTypes = () => useQuery(KEY, getPaymentTypes);
