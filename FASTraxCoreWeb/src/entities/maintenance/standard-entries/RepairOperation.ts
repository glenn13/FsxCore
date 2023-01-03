import {BaseEntity} from '../../base';
import RepairGroup from './RepairGroup';
import RepairSubGroup from './RepairSubGroup';
import ServiceType from './ServiceType';

export interface RepairOperation extends BaseEntity {
  repairGroupId: number;
  repairSubGroupId: number;
  serviceTypeId: number;
  description: string;
  SRO: string;
  repairGroup?: RepairGroup;
  repairSubGroup?: RepairSubGroup;
  serviceType?: ServiceType;
}

export const newRepairOperation = (): RepairOperation => ({
  id: 0,
  description: '',
  repairGroupId: 0,
  repairSubGroupId: 0,
  serviceTypeId: 0,
  SRO: '',
});

export {RepairOperation as default};
