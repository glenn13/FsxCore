import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import MaintenanceDepartment from '@app/entities/maintenance/standard-entries/MaintenanceDepartment';

export const KEY = generateUUID();

export const getMaintenanceDepartments = () => {
  return http.get<MaintenanceDepartment[]>(uri.maintenance.SE.maintenancedepartments.all);
};

export const useMaintenanceDepartments = () => useQuery(KEY, getMaintenanceDepartments);
