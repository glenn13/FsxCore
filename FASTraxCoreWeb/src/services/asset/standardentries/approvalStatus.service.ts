import {useQuery} from 'react-query';
import {AxiosResponse} from 'axios';
import http from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import ApprovalStatus from '@app/entities/asset/standard-entries/DispositionApprovalStatus';

export const APPROVAL_STATUS_KEY = 'APPROVAL_STATUS';

export const getApprovalStatus = async (): Promise<AxiosResponse<ApprovalStatus[]>> => {
    return await http.get(FsxUri.assets.SE.dispositionApprovalStatus.all);
};  

export const useApprovals = () => useQuery(APPROVAL_STATUS_KEY, getApprovalStatus);
