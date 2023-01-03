import {StandardEntry} from '../../StandardEntry';

export interface StockCategory extends StandardEntry {}

export const newStockCategory = (): StockCategory => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});