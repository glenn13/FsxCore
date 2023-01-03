import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import FaultType from '../../../entities/maintenance/standard-entries/TypeOfFault';

export const KEY = generateUUID();

export const getFaultTypes = () => {
  return http.get<FaultType[]>(uri.maintenance.SE.typeOfFaults.all);
};

export const useFaultTypes = () => useQuery(KEY, getFaultTypes);
