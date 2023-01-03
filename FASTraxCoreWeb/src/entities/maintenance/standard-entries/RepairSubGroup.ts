import {BaseEntity} from '../../base';
import RepairGroup from './RepairGroup';
import RepairLevel from './RepairLevel';

export interface RepairSubGroup extends BaseEntity {
  repairGroupId: number;
  SRO: string;
  repairLevelId: number;
  description: string;
  repairGroup?: RepairGroup;
  repairLevel?: RepairLevel;
}

export const newRepairSubGroup = (): RepairSubGroup => ({
  id: 0,
  SRO: '',
  repairLevelId: 0,
  description: '',
  repairGroupId: 0,
});

export {RepairSubGroup as default};
