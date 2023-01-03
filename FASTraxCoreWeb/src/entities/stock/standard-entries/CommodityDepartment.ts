import { StandardEntry } from '../../StandardEntry';

export interface CommodityDepartment extends StandardEntry {
  isChargeable: boolean;
}

export const newCommodityDepartment = (): CommodityDepartment => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  isChargeable: true,
});

export { CommodityDepartment as default };