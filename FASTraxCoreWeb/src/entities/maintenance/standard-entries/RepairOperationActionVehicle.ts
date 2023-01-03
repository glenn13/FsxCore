import {BaseEntity} from '../../base';
import RepairOperation from './RepairOperation';

export interface RepairOperationActionVehicle extends BaseEntity {
  salesPrice: number;
  hours: number;
  repairActionId: number;
  repairOperationId: number;
  repairOperation?: RepairOperation;
}

export const newRepairOperationActionVehicle = (): RepairOperationActionVehicle => ({
  id: 0,
  repairActionId: 0,
  repairOperationId: 0,
  salesPrice: 0,
  hours: 0,
});

export {RepairOperationActionVehicle as default};
