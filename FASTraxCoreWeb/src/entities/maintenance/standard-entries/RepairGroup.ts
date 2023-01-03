import { BaseEntity } from '../../base';

export interface RepairGroup extends BaseEntity {
  assetCategoryId: number;
  description: string;
  SRO: string;
  assetCategory?: AssetCategory;
}

export const newRepairGroup = (): RepairGroup => ({
  id: 0,
  description: '',
  assetCategoryId: 0,
  SRO: '',
});

export {RepairGroup as default};
