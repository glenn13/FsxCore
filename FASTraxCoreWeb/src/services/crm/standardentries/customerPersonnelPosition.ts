import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import CustomerPersonnelPosition from '../../../entities/crm/standard-entries/CustomerPersonnelPosition';

export const KEY = generateUUID();

export const getCustomerPersonnelPositions = () => {
    return http.get<CustomerPersonnelPosition[]>(uri.crm.SE.customerPersonnelPositions.all);
}

export const useCustomerPersonnelPositions = () => useQuery(KEY, getCustomerPersonnelPositions);