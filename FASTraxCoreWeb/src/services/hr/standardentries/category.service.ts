import {useQuery} from 'react-query';
import http from '../../http.service';
import {FsxUri} from '../../../helpers/endpoints';
import {generateUUID} from '../../../helpers/randoms';
import Category from '../../../entities/hr/standard-entries/Category';

export const KEY = generateUUID();

export const getCategories = () => {
    return http.get<Category[]>(FsxUri.hr.SE.categories.all);
}
 
export const useCategories = () => useQuery(KEY, getCategories);
