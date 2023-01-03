import {useQuery} from 'react-query';
import http from '../http.service';
import uri from '../../helpers/endpoints';
import {generateUUID} from './../../helpers/randoms';
import {AttachmentBase64} from '../global/attachments.service';
import {GeneralAsset} from '../../entities/asset/inventory/GeneralAsset';
import GeneralAssetName from '@app/entities/asset/inventory/GeneralAssetName';
import GeneralAssetGroup from '@app/entities/asset/inventory/GeneralAssetGroup';
//import GeneralLinkedAsset from '../../entities/asset/inventory/GeneralLinkedAsset';
//import GeneralWarrantyDetail from '../../entities/asset/inventory/GeneralWarrantyDetail';
import {GeneralAssetGroupForm} from './../../entities/asset/inventory/GeneralAssetGroup';
//import GeneralAttachmentImage from '@app/entities/asset/inventory/GeneralAttachmentImage';
//import GeneralRegistrationDetail from '@app/entities/asset/inventory/GeneralRegistrationDetail';
//import GeneralAttachmentDocument from '@app/entities/asset/inventory/GeneralAttachmentDocument';

const GENERAL_ASSETS_GRID_KEY = generateUUID();

export const getGeneralAssets = () => {
  return http.get<GeneralAsset[]>(uri.assets.generals.base);
};

export const getGeneralAssetUnderMaintenances = () => {
  return http.get<GeneralAsset[]>(uri.assets.generals.maintenance);
};

export const getGeneralAssetsSearch = (query: string) => {
  return http.get<GeneralAsset[]>(uri.assets.generals.search(query));
};

export const getGeneralAssetsFirstOrDefaultImage = (ids: number[]) => {
  return http.get<AttachmentBase64[]>(uri.assets.generals.defaultImages(ids));
};

export const getGeneralAssetsByGroup = (generalAssetGroupId: number) => {
  return http.get<GeneralAsset[]>(uri.assets.generals.groups.findAssets(generalAssetGroupId));
};

export const getGeneralRegistrationDetails = (id: UrlParam) => {
  //return http.get<GeneralRegistrationDetail[]>(uri.assets.generals.registrationDetails(id));
};

export const getGeneralWarrantyDetails = (id: UrlParam) => {
  //return http.get<GeneralWarrantyDetail[]>(uri.assets.generals.warrantyDetails(id));
};

export const getGeneralAttachmentImages = (id: UrlParam) => {
  //return http.get<GeneralAttachmentImage[]>(uri.assets.generals.images(id));
};

export const getGeneralAttachmentDocuments = (id: UrlParam) => {
  //return http.get<GeneralAttachmentDocument[]>(uri.assets.generals.documents(id));
};

export const getGeneralLinkedAssets = (id: UrlParam) => {
  //return http.get<GeneralLinkedAsset[]>(uri.assets.generals.linkedAssets(id));
};

export const getGeneralAssetsForGrid = () => {
  return http.get<GeneralAsset[]>(uri.assets.generals.forGrid);
};

export const useGeneralAssetsGrid = () =>
  useQuery(GENERAL_ASSETS_GRID_KEY, getGeneralAssetsForGrid);

export const getGeneralAsset = (id: UrlParam, withStandardEntries: boolean = false) => {
  return http.get<GeneralAsset>(uri.assets.generals.findFullInfo(id, withStandardEntries));
};

export const postGeneralAsset = (payload: GeneralAsset) => {
  return http.post<GeneralAsset>(uri.assets.generals.base, payload);
};

export const patchGeneralAsset = (payload: GeneralAsset) => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return http.patch<GeneralAsset>(uri.assets.generals.update(payload.id), payload);
};

export const deleteGeneralAsset = (id: UrlParam) => {
  return http.delete<GeneralAsset>(uri.assets.generals.find(id));
};

export const getGeneralAssetGroupsByAssetGroupAndName = (generalAssetNameId: UrlParam) => {
  return http.get<GeneralAssetGroup[]>(
    uri.assets.generals.groups.findByAssetName(generalAssetNameId),
  );
};

export const getGeneralAssetGroups = () => {
  return http.get<GeneralAssetGroup[]>(uri.assets.generals.groups.base);
};

export const GENERAL_ASSET_GROUP_KEY = generateUUID();

export const useGeneralAssetGroups = () => useQuery(GENERAL_ASSET_GROUP_KEY, getGeneralAssetGroups);

export const getGeneralAssetGroup = (id: UrlParam) => {
  return http.get<GeneralAssetGroup>(uri.assets.generals.groups.find(id));
};

export const postGeneralAssetGroup = (payload: GeneralAssetGroupForm) => {
  return http.post<GeneralAssetGroup>(uri.assets.generals.groups.base, payload);
};

export const patchGeneralAssetGroup = (payload: GeneralAssetGroup) => {
  return http.patch<GeneralAssetGroup>(uri.assets.generals.groups.find(payload.id), payload);
};

export const getGeneralAssetNamesByAssetGroup = (assetGroupId: UrlParam) => {
  return http.get<GeneralAssetName[]>(uri.assets.generals.names.findByAssetGroup(assetGroupId));
};

export const GENERAL_ASSET_NAME_KEY = generateUUID();

export const useGeneralAssetNames = () => useQuery(GENERAL_ASSET_NAME_KEY, getGeneralAssetNames);

export const getGeneralAssetNames = () => {
  return http.get<GeneralAssetName[]>(uri.assets.generals.names.base);
};

export const getGeneralAssetName = (id: UrlParam) => {
  return http.get<GeneralAssetName>(uri.assets.generals.names.find(id));
};

export const postGeneralAssetName = (payload: GeneralAssetName) => {
  return http.post<GeneralAssetName>(uri.assets.generals.names.base, payload);
};

export const patchGeneralAssetName = (payload: GeneralAssetName) => {
  return http.patch<GeneralAssetName>(uri.assets.generals.names.find(payload.id), payload);
};

export const getRegisterAssetCount= () =>
    http.get<any>(uri.assets.registers.registerCount());

export default {
  getAssetsForGrid: getGeneralAssetsForGrid,
  getAssets: getGeneralAssets,
  getAsset: getGeneralAsset,
  post: postGeneralAsset,
  patch: patchGeneralAsset,
  getGeneralRegistrationDetails,
  getGeneralWarrantyDetails,
  getGeneralAttachmentImages,
  getGeneralAttachmentDocuments,
  getGeneralLinkedAssets,
  getRegisterAssetCount
};
