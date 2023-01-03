import {ProjectSite} from '@app/entities/catalog';
import GeneralAssetName from './GeneralAssetName';
import {StandardEntry} from './../../StandardEntry';

interface GeneralAssetInfo {
  projectSiteId: number;
  availableQty: number;
  issuedQty: number;
  damagedQty: number;

  projectSite?: ProjectSite;
  generalAssetName?: GeneralAssetName;
}

export default interface GeneralAssetGroup extends StandardEntry, GeneralAssetInfo {
  generalAssetNameId: number;
}

export type GeneralAssetGroupForm = Omit<GeneralAssetGroup, keyof GeneralAssetInfo>;

export const newGeneralAssetGroup = (): GeneralAssetGroup => ({
  id: 0,
  generalAssetNameId: 0,
  title: '',
  code: '',
  projectSiteId: 0,
  availableQty: 0,
  issuedQty: 0,
  damagedQty: 0,
});

export const newGeneralAssetGroupForm = (): GeneralAssetGroupForm => ({
  id: 0,
  generalAssetNameId: 0,
  title: '',
  code: '',
});
