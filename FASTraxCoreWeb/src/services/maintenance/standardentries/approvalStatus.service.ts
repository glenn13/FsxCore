import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import ApprovalStatus from '@app/entities/maintenance/standard-entries/ApprovalStatus';

const KEY = generateUUID();

export const getApprovalStatuses = () => {
  return http.get<ApprovalStatus[]>(uri.maintenance.SE.approvalstatuses.all);
};

export const useApprovalStatuses = () => useQuery(KEY, getApprovalStatuses);
