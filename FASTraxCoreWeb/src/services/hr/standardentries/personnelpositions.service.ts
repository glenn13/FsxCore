import {FsxUri} from '../../../helpers/endpoints';
import PersonnelPosition from '../../../entities/hr/standard-entries/PersonnelPosition';
import http from '../../http.service';
import {generateUUID} from '../../../helpers/randoms';
import {useQuery} from 'react-query';

export const KEY = generateUUID();

export const getPersonnelPositions = () => {
  return http.get<PersonnelPosition[]>(FsxUri.hr.SE.personnelpositions.all);
};

export const usePersonnelPositions = () => useQuery(KEY, getPersonnelPositions);