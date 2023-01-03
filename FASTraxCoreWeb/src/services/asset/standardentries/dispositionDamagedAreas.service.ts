import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import uri from '../../../helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { DispositionDamagedArea } from '@app/entities/asset/standard-entries/DispositionDamagedArea';

export const KEY = generateUUID();

export const getDispositionDamagedAreas = () => {
  return http.get<DispositionDamagedArea[]>(uri.assets.SE.dispositionDamagedArea.all);
};

export const useDispositionDamagedAreas = () => useQuery(KEY, getDispositionDamagedAreas);


