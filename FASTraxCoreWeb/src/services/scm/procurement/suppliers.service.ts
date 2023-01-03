import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import Supplier from '../../../entities/stock/procurement/Supplier';

const KEY = generateUUID();

export const getSuppliers = () => {
  return http.get<Supplier[]>(uri.scm.procurement.suppliers.all);
};

export const useSuppliers = () => useQuery(KEY, getSuppliers);
