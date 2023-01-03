import { StandardEntry } from '../../StandardEntry';

export interface StockConditionDispositionCode extends StandardEntry {
  remarks: string;
}

export const newStockConditionDispositionCode = (): StockConditionDispositionCode => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  remarks: '',
});

export { StockConditionDispositionCode as default };