import { StandardEntry } from '../../StandardEntry';

export interface StockConditionStatusCode extends StandardEntry {
  remarks: string;
}

export const newStockConditionStatusCode = (): StockConditionStatusCode => ({
  id: 0,
  code: '',
  title: '',
  description: '',
  remarks: ''
});

export { StockConditionStatusCode as default }; 