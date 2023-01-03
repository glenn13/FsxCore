import Customer from '../../../entities/crm/sales/Customer';
import {generateUUID} from './../../../helpers/randoms';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {useQuery} from 'react-query';

const KEY = generateUUID();

export const getCustomers = async () => {
  return await http.get<Customer[]>(uri.crm.sales.customers.all);
};

export const useCustomers = () => useQuery(KEY, getCustomers);

export const getCustomer = async (id: number) =>
  await http.get<Customer>(`${uri.crm.sales.customers.all}/${id}`);

export const useCustomer = (id: number) => useQuery('customer', () => getCustomer(id));
