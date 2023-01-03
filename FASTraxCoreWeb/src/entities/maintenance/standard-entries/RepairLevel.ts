import {BaseEntity} from '../../base';

export interface RepairLevel extends BaseEntity {
  description: string;
}

export const newRepairLevel = (): RepairLevel => ({
  id: 0,
  description: '',
});

export {RepairLevel as default};
