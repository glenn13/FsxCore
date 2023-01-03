import {useQuery} from 'react-query';
import http from '../../http.service';
import { FsxUri } from '@app/helpers/endpoints';
import { generateUUID } from '@app/helpers/randoms';
import HumanResourceDepartment from '@app/entities/hr/standard-entries/HumanResourceDepartment';

export const KEY = generateUUID();

export const getHumanResourceDepartments = () => {
    return http.get<HumanResourceDepartment[]>(FsxUri.hr.SE.departments.all);
};

export const useHumanResourceDepartments = () => useQuery(KEY, getHumanResourceDepartments);
