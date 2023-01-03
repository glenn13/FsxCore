import {useQuery} from 'react-query';
import http from '../../http.service';
import {FsxUri} from '../../../helpers/endpoints';
import SkillLevel from '../../../entities/hr/standard-entries/SkillLevel';
import {generateUUID} from '../../../helpers/randoms';

export const KEY = generateUUID();

export const getSkillLevels = () => {
    return http.get<SkillLevel[]>(FsxUri.hr.SE.skilllevels.all);
}

export const useSkillLevels = () => useQuery(KEY, getSkillLevels);