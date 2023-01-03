import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import MaintenanceStatus from '@app/entities/maintenance/standard-entries/MaintenanceStatus';

const KEY = generateUUID();

export const getMaintenanceStatuses = () => {
  return http.get<MaintenanceStatus[]>(uri.maintenance.SE.maintenancestatuses.all);
};

export const getDefaultMaintenanceStatus = () => {
  return http.get<MaintenanceStatus>(uri.maintenance.SE.maintenancestatuses.default);
};

export const useMaintenanceStatuses = () => useQuery(KEY, getMaintenanceStatuses);
