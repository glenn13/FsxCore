import {useQuery} from 'react-query';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import {generateUUID} from './../../../helpers/randoms';
import DateRangeType from '@app/entities/maintenance/standard-entries/DateRangeType';

const KEY = generateUUID();

export const getDateRangeTypes = () => {
  return http.get<DateRangeType[]>(uri.maintenance.SE.daterangetypes.all);
};

export const useDateRangeTypes = () => useQuery(KEY, getDateRangeTypes);
