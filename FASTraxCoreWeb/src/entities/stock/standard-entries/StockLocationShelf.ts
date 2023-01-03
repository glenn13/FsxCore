import {StandardEntry} from '../../StandardEntry';

export interface StockLocationShelf extends StandardEntry {}

export const newStockLocationShelf = (): StockLocationShelf => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});