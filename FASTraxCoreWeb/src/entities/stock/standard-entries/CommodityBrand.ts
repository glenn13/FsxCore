import {StandardEntry} from '../../StandardEntry';

export interface CommodityBrand extends StandardEntry {}

export const newCommodityBrand = (): CommodityBrand => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});