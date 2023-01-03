import { StandardEntry } from '../../StandardEntry';

export interface StockDepartment extends StandardEntry {
  isChargeable: boolean;
}

export const newStockDepartment = (): StockDepartment => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  isChargeable: true,
});

export { StockDepartment as default }; 