import DispositionType from '@app/entities/asset/standard-entries/DispositionType';
import {FsxUri} from '@app/helpers/endpoints';
import {generateUUID} from '@app/helpers/randoms';
import httpService from '@app/services/http.service';
import {useQuery} from 'react-query';

const KEY = generateUUID();

export const getDispositionTypes = () => {
  return httpService.get<DispositionType[]>(FsxUri.assets.SE.dispositionType.all);
};

export const useDispositionType = () => {
  const result = useQuery(KEY, getDispositionTypes);

  return result;
};
