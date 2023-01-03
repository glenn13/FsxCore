import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import uri from '../../../helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import { DispositionDamagedArea } from '@app/entities/asset/standard-entries/DispositionDamagedArea';

export const KEY = generateUUID();

export const getCustomTypeField = () => {
  return http.get<DispositionDamagedArea[]>(uri.assets.SE.customFieldType.all);
};

export const useCustomFieldTypes = () => useQuery(KEY, getCustomTypeField);


