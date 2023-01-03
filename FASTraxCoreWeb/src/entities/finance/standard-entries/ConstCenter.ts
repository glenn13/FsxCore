import {StandardEntry} from './../../StandardEntry';

export interface CostCenter extends StandardEntry {}

export const newCostCenter = (): CostCenter => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});

export {CostCenter as default};
