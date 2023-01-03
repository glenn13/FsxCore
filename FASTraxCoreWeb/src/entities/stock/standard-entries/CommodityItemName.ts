import {StandardEntry} from '../../StandardEntry';

export interface CommodityItemName extends StandardEntry {}

export const newCommodityItemName= (): CommodityItemName => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});