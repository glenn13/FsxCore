import {StandardEntry} from './../../StandardEntry';

export const newGeneralAssetName = (assetGroupId: number = 0): GeneralAssetName => ({
  id: 0,
  assetGroupId,
  code: '',
  title: '',
});

export default interface GeneralAssetName extends StandardEntry {
  assetGroupId: number;

  assetGroup?: AssetGroup;
}
