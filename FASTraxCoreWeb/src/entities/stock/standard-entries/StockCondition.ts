import { StandardEntry } from '../../StandardEntry';

export interface StockCondition extends StandardEntry {
  remarks: string;
}

export const newStockCondition = (): StockCondition => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  remarks: ''
});

export { StockCondition as default };