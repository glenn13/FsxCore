import {BaseEntity} from '../../base';

export interface RepairAction extends BaseEntity {
  description?: string | null;
}

export const newRepairAction = (): RepairAction => ({
  id: 0,
  description: '',
});

export {RepairAction as default};
