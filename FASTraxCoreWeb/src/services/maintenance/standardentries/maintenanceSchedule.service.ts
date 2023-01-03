import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import MaintenanceSchedule from '@app/entities/maintenance/standard-entries/MaintenanceSchedule';

export const KEY = generateUUID();

export const getMaintenanceSchedules = () => {
  return http.get<MaintenanceSchedule[]>(uri.maintenance.SE.maintenanceschedules.all);
};

export const useMaintenanceSchedules = () => useQuery(KEY, getMaintenanceSchedules);
