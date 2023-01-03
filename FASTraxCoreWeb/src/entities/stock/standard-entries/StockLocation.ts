import {StandardEntry} from '../../StandardEntry';

export interface StockLocation extends StandardEntry {}

export const newStockLocation = (): StockLocation => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});