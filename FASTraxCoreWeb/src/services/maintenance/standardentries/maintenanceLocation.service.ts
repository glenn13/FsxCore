import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import MaintenanceLocation from '../../../entities/maintenance/standard-entries/MaintenanceLocation';

const KEY = generateUUID();

export const getMaintenanceLocations = () => {
  return http.get<MaintenanceLocation[]>(uri.maintenance.SE.maintenancelocations.all);
};

export const useMaintenanceLocations = () => useQuery(KEY, getMaintenanceLocations);
