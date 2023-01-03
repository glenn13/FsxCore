import FsxUri from '@app/helpers/endpoints';
import httpService from '../http.service';
import {useQuery} from 'react-query';

/* -------------------------------------------------------------------------- */
/*                                    Axios                                   */
/* -------------------------------------------------------------------------- */

/**
 * Fetch inspection summary
 */
export const getTimesheetPersonnelMaitenanceSummary = () =>
  httpService.get<TimesheetPersonnelMaintenance[]>(FsxUri.maintenance.timesheetpersonnelmaintenance.summary());

/* -------------------------------------------------------------------------- */
/*                                 React Query                                */
/* -------------------------------------------------------------------------- */

/**
 * useQuery instance of maintenance inspection summary
 */
export const useTimesheetPersonnelMaitenanceSummary = () => useQuery('timesheetPersonnelMaitenanceSummary', getTimesheetPersonnelMaitenanceSummary);
