import {StandardEntry} from '../../StandardEntry';

export interface AssetUOM extends StandardEntry {}

export const newAssetUOM = (): AssetUOM => ({
  id: 0,
  code: '',
  title: '',
  description: '',
});
