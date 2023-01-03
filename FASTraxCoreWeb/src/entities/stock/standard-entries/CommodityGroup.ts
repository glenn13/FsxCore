import { StandardEntry } from '../../StandardEntry';

export interface CommodityGroup extends StandardEntry {
  isActive: boolean;
}

export const newCommodityGroup = (): CommodityGroup => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  isActive: true,
});

export { CommodityGroup as default };