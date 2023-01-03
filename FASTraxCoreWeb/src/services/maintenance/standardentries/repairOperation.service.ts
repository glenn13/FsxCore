import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairOperation from '@app/entities/maintenance/standard-entries/RepairOperation';

export const KEY = generateUUID();

interface repairOperationFilter {
  id?: number;
  assetCategoryId?: number;
}

export const getRepairOperations = (filter?: repairOperationFilter) => {
  if (filter && filter.assetCategoryId) return http.get<RepairOperation[]>(uri.maintenance.SE.repairOperations.findByAssetCategory(filter.assetCategoryId));

  return http.get<RepairOperation[]>(uri.maintenance.SE.repairOperations.all);
};

export const useRepairOperations = (filter?: repairOperationFilter) => useQuery(KEY, () => getRepairOperations(filter));
