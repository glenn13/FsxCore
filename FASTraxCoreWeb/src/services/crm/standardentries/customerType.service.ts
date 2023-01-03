import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import CustomerType from '../../../entities/crm/standard-entries/CustomerType';

export const KEY = generateUUID();

export const getCustomerTypes = () => {
    return http.get<CustomerType[]>(uri.crm.SE.customerTypes.all);
}

export const useCustomerTypes = () => useQuery(KEY, getCustomerTypes);