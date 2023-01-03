import http from '../http.service';
import uri from '@app/helpers/endpoints';
import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {generateUUID} from '@app/helpers/randoms';


const KEY = generateUUID();

export const getFormPages = async (): Promise<AxiosResponse<FormPage[]>> => {
  return await http.get(uri.catalog.formPages.all);
};

export const useFormPages = () => {
  const result = useQuery(KEY, getFormPages);

  return result;
};
