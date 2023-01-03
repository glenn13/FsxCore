import {StandardEntry} from './../../StandardEntry';

export interface MaintenanceDepartment extends StandardEntry {}

export const newMaintenanceDepartment = (): MaintenanceDepartment => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {MaintenanceDepartment as default};
