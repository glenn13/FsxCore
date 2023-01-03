import {StandardEntry} from '../../StandardEntry';

export interface StockSeries extends StandardEntry {}

export const newStockSeries = (): StockSeries => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});