import {StandardEntry} from '../../StandardEntry';

export interface RepairCategory extends StandardEntry {}

export const newRepairCategory = (): RepairCategory => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {RepairCategory as default};
