import {FsxUri} from '../../../helpers/endpoints';
import HumanResourceContractType from '../../../entities/hr/standard-entries/HumanResourceContractType';
import http from '../../http.service';
import {generateUUID} from '../../../helpers/randoms';
import {useQuery} from 'react-query';

export const KEY = generateUUID();

export const getHumanResourceContractType = () => {
  return http.get<HumanResourceContractType[]>(FsxUri.hr.SE.contracttype.all);
};

export const useHumanResourceContractType = () => useQuery(KEY, getHumanResourceContractType);