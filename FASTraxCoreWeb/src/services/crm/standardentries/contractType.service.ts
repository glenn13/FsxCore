import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import ContractType from '../../../entities/crm/standard-entries/ContractType';

export const KEY = generateUUID();

export const getContractTypes = () => {
    return http.get<ContractType[]>(uri.crm.SE.contractTypes.all);
}

export const useContractTypes = () => useQuery(KEY, getContractTypes);