import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import http from '@app/services/http.service';
import uri from '../../../helpers/endpoints';

import { generateUUID } from '@app/helpers/randoms';
import CustomField from '@app/entities/global/CustomField';

export const KEY = generateUUID();

export const getCustomField = () => {
  return http.get<CustomField[]>(uri.assets.SE.customField.all);
};

export const useCustomFields = () => useQuery(KEY, getCustomField);


