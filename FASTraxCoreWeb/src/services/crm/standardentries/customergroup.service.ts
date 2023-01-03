import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import CustomerGroup from '../../../entities/crm/standard-entries/CustomerGroup';

export const KEY = generateUUID();

export const getCustomerGroups = () => {
    return http.get<CustomerGroup[]>(uri.crm.SE.customerGroups.all);
}

export const useCustomerGroups = () => useQuery(KEY, getCustomerGroups);