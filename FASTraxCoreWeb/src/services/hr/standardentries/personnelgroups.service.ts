import {useQuery} from 'react-query';
import http from '../../http.service';
import {FsxUri} from '../../../helpers/endpoints';
import {generateUUID} from '../../../helpers/randoms';
import PersonnelGroup from '../../../entities/hr/standard-entries/PersonnelGroup';

export const KEY = generateUUID();

export const getPersonnelGroups = () => {
  return http.get<PersonnelGroup[]>(FsxUri.hr.SE.personnelgroups.all);
};

export const usePersonnelGroups = () => useQuery(KEY, getPersonnelGroups);
