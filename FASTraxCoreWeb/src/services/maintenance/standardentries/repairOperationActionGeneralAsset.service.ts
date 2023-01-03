import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import RepairOperationActionGeneralAsset from '@app/entities/maintenance/standard-entries/RepairOperationActionGeneralAsset';

export const KEY = generateUUID();

export const getRepairOperationActionGeneralAssets = () => {
  return http.get<RepairOperationActionGeneralAsset[]>(uri.maintenance.SE.repairOperationActions.generalAssets.all);
};

export const useRepairOperationActionGeneralAssets = () => useQuery(KEY, getRepairOperationActionGeneralAssets);
