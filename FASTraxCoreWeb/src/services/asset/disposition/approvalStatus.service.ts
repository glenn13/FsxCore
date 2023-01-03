import DispositionApprovalStatus from '@app/entities/asset/standard-entries/DispositionApprovalStatus';
import {FsxUri} from '@app/helpers/endpoints';
import {generateUUID} from '@app/helpers/randoms';
import httpService from '@app/services/http.service';
import {useQuery} from 'react-query';

const KEY = generateUUID();

export const getDispositionApprovalStatuses = () => {
  return httpService.get<DispositionApprovalStatus[]>(FsxUri.assets.SE.dispositionApprovalStatus.all);

};

export const useDispositionApprovalStatus = () => {
  const result = useQuery(KEY, getDispositionApprovalStatuses);
  return result;
  
};
