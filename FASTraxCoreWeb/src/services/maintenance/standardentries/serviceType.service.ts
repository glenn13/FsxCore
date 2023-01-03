import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import ServiceType from '@app/entities/maintenance/standard-entries/ServiceType';

export const KEY = generateUUID();

export const getServiceTypes = () => {
  return http.get<ServiceType[]>(uri.maintenance.SE.serviceTypes.all);
};

export const useServiceTypes = () => useQuery(KEY, getServiceTypes);
