import {StandardEntry} from '../../StandardEntry';

export interface StockVersion extends StandardEntry {}

export const newStockVersion = (): StockVersion => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});