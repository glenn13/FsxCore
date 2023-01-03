import {useQuery} from 'react-query';
import http from '../../http.service';
import {FsxUri} from '../../../helpers/endpoints';
import {generateUUID} from '../../../helpers/randoms';
import Nationality from '../../../entities/hr/standard-entries/Nationality';

export const KEY = generateUUID();

export const getNationalities = () => {
    return http.get<Nationality[]>(FsxUri.hr.SE.nationalities.all);
}
 
export const useNationalities = () => useQuery(KEY, getNationalities);
