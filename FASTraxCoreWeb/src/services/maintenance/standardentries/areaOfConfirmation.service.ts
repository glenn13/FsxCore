import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import AreaOfConfirmation from '@app/entities/maintenance/standard-entries/AreaOfConfirmation';

const KEY = generateUUID();

export const getAreaOfConfirmations = () => {
  return http.get<AreaOfConfirmation[]>(uri.maintenance.SE.areaofconfirmations.all);
};

export const useAreaOfConfirmations = () => useQuery(KEY, getAreaOfConfirmations);
