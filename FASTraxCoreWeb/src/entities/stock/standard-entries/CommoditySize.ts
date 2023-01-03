import {StandardEntry} from '../../StandardEntry';

export interface CommoditySize extends StandardEntry {}

export const newCommoditySize = (): CommoditySize => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});