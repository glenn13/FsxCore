import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import CustomerTier from '../../../entities/crm/standard-entries/CustomerTier';

export const KEY = generateUUID();

export const getCustomerTiers = () => {
    return http.get<CustomerTier[]>(uri.crm.SE.customerTiers.all);
}

export const useCustomerTiers = () => useQuery(KEY, getCustomerTiers);