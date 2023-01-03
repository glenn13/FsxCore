import {BaseEntity} from '../../base';

export interface RepairType extends BaseEntity {
  description: string;
}

export const newRepairType = (): RepairType => ({
  id: 0,
  description: '',
});

export {RepairType as default};
