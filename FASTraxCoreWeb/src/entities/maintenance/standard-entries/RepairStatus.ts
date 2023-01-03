import {StandardEntry} from './../../StandardEntry';

export interface RepairStatus extends StandardEntry {}

export const newRepairStatus = (): RepairStatus => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {RepairStatus as default};
