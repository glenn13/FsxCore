import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairCategory from '@app/entities/maintenance/standard-entries/RepairCategory';

export const KEY = generateUUID();

export const getRepairCategories = () => {
  return http.get<RepairCategory[]>(uri.maintenance.SE.repaircategories.all);
};

export const useRepairCategories = () => useQuery(KEY, getRepairCategories);
