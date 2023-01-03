import FsxUri from '@app/helpers/endpoints';
import httpService from '../http.service';
import {useQuery} from 'react-query';
import { Modules } from '@app/entities/catalog/Modules';

/* -------------------------------------------------------------------------- */
/*                                    Axios                                   */
/* -------------------------------------------------------------------------- */

/**
 * Fetch inspection summary
 */
export const getModulesList = () =>
  httpService.get<Modules[]>(FsxUri.catalog.modules.list());

/* -------------------------------------------------------------------------- */
/*                                 React Query                                */
/* -------------------------------------------------------------------------- */

/**
 * useQuery instance of maintenance inspection summary
 */
export const useModulesList = () => useQuery('modulesList', getModulesList);
