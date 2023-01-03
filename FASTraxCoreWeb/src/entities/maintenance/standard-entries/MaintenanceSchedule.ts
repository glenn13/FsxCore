import {StandardEntry} from './../../StandardEntry';

export interface MaintenanceSchedule extends StandardEntry {}

export const newMaintenanceSchedule = (): MaintenanceSchedule => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {MaintenanceSchedule as default};
