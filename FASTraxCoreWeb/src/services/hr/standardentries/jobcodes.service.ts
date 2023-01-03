import {useQuery} from 'react-query';
import http from '../../http.service';
import {FsxUri} from './../../../helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import JobCode from '../../../entities/hr/standard-entries/JobCode';

export const KEY = generateUUID();

export const getJobCodes = () => {
  return http.get<JobCode[]>(FsxUri.hr.SE.jobcodes.all);
};

export const useJobCodes = () => useQuery(KEY, getJobCodes);
