import { useQuery } from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import { generateUUID } from '../../../helpers/randoms';
import CreditTerm from '../../../entities/crm/standard-entries/CreditTerm';

export const KEY = generateUUID();

export const getCreditTerms = () => {
    return http.get<CreditTerm[]>(uri.crm.SE.creditTerms.all);
}

export const useCreditTerms = () => useQuery(KEY, getCreditTerms);