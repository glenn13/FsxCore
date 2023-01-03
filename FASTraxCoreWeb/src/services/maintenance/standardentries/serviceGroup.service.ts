import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import ServiceGroup from '@app/entities/maintenance/standard-entries/ServiceGroup';

export const KEY = generateUUID();

export const getServiceGroups = () => {
  return http.get<ServiceGroup[]>(uri.maintenance.SE.serviceGroups.all);
};

export const useServiceGroups = () => useQuery(KEY, getServiceGroups);
