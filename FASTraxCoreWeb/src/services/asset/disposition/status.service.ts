import DispositionStatus from '@app/entities/asset/standard-entries/DispositionStatus';
import {FsxUri} from '@app/helpers/endpoints';
import {generateUUID} from '@app/helpers/randoms';
import httpService from '@app/services/http.service';
import {useQuery} from 'react-query';

const KEY = generateUUID();

export const getDispositionStatuses = () => {
  return httpService.get<DispositionStatus[]>(FsxUri.assets.SE.dispositionStatus.all);
};

export const useDispositionStatus = () => {
  const result = useQuery(KEY, getDispositionStatuses);

  return result;
};
