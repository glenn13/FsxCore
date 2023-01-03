import { AxiosResponse } from 'axios';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import { useQuery } from 'react-query';

export const GENERAL_ASSET = 'GENERAL_ASSET';
export const GENERAL_ASSET_ITEM_GROUPS_KEY = 'GENERAL_ASSET_ITEM_GROUPS';
export const GENERAL_ASSET_ITEM_GROUPS_SEARCH_CRITERIA_KEY = 'GENERAL_ASSET_ITEM_GROUP_SEARCH_CRITERIA';
export const GENERAL_ASSET_TO_LINKED = 'GENERAL_ASSET_TO_LINKED';

export const deleteGeneralAsset = (id: number) =>
    http.delete(uri.assets.registers.generalassets.delete(id));

export const deleteGeneralAssetCustomFields = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteCustomFields(generalAssetId));
};

export const deleteGeneralAssetDepreciation = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteDepreciation(generalAssetId));
};

export const deleteGeneralAssetDepreciationDetails = (generalAssetDepreciationId: number): Promise<AxiosResponse> => {
    if (generalAssetDepreciationId <= 0) return Promise.reject('General Asset Depreciation ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteDepreciationDetails(generalAssetDepreciationId));
};

export const deleteGeneralAssetDocuments = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteDocuments(generalAssetId));
};

export const deleteGeneralAssetImages = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteImages(generalAssetId));
};

export const deleteGeneralAssetLinkedAssets = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteLinkedAssets(generalAssetId));
};

export const deleteGeneralAssetRegistrationDetails = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteRegistrationDetails(generalAssetId));
};

export const deleteGeneralAssetWarrantyDetails = (generalAssetId: number): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.delete(uri.assets.registers.generalassets.deleteWarrantyDetails(generalAssetId));
};

export const getGeneralAssetCustomFields = (id: UrlParam): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<GeneralAssetCustomField[]>(uri.assets.registers.generalassets.customFields(id));
};

export const getGeneralAssetCustomFieldsDefault = (): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<GeneralAssetCustomField[]>(uri.assets.registers.generalassets.customFieldsDefault());
};

export const getGeneralAssetDepreciationDetails = (id: UrlParam) => {
    return http.get<GeneralAssetDepreciationDetail[]>(uri.assets.registers.generalassets.depreciationDetails(id));
};

export const getGeneralAssetDocuments = (id: UrlParam) => {
    return http.get<GeneralAssetDocumentAttachment[]>(uri.assets.registers.generalassets.documents(id));
};

export const getGeneralAssetFullInfo = (id: UrlParam) => {
    return http.get<GeneralAsset>(uri.assets.registers.generalassets.fullInfo(id));
};

export const getGeneralAssetImageAttachments = (id: UrlParam) => {
    return http.get<GeneralAssetImageAttachment[]>(uri.assets.registers.generalassets.images(id));
};

export const getGeneralAssetItemGroupsForGrid = () => {
    return http.get<GeneralAssetItemGroup[]>(uri.assets.registers.generalassets.itemGroups());
};

export const getGeneralAssetLinkedAssets = (id: UrlParam): Promise<AxiosResponse> => {
    return http.get<GeneralAssetLinkedAsset[]>(uri.assets.registers.generalassets.linkedAssets(id));
};

export const getGeneralAssetRegistrationDetails = (id: UrlParam) => {
    return http.get<GeneralAssetRegistrationDetail[]>(uri.assets.registers.generalassets.registrationDetails(id));
};

export const getGeneralAssetToLinked = async (id: UrlParam): Promise<AxiosResponse<GeneralAssetLinkedAsset[]>> => {
    return http.get<GeneralAssetLinkedAsset[]>(uri.assets.registers.generalassets.toLinkedAssets(id));
};

export const getGeneralAssetWarrantyDetails = (id: UrlParam) => {
    return http.get<GeneralAssetWarrantyDetail[]>(uri.assets.registers.generalassets.warrantyDetails(id));
};

export const getGeneralAssetTransactionHistory = (id: UrlParam) => {
    return http.get<RegisterTransactionHistory[]>(uri.assets.registers.generalassets.transactionHistory(id));
}

export const patchGeneralAsset = (payload: GeneralAsset): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patch(payload.id), payload);
};

export const patchGeneralAssetCustomFields = (generalAssetId: number, payload: GeneralAssetCustomField[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchCustomFields(generalAssetId), payload);
};

export const patchGeneralAssetDepreciationDetails = (generalAssetId: number, payload: GeneralAssetDepreciationDetail[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchDepreciationDetails(generalAssetId), payload);
};

export const patchGeneralAssetDocuments = (generalAssetId: number, payload: GeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchDocuments(generalAssetId), payload);
};

export const patchGeneralAssetImages = (generalAssetId: number, payload: GeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchImages(generalAssetId), payload);
};

export const patchGeneralAssetLinkedAssets = (generalAssetId: number, payload: GeneralAssetLinkedAsset[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchLinkedAssets(generalAssetId), payload);
};

export const patchGeneralAssetRegistrationDetails = (generalAssetId: number, payload: GeneralAssetRegistrationDetail[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchRegistrationDetails(generalAssetId), payload);
};

export const patchGeneralAssetWarrantyDetails = (generalAssetId: number, payload: GeneralAssetWarrantyDetail[]): Promise<AxiosResponse> => {
    if (!generalAssetId) return Promise.reject('General Asset ID is missing');
    return http.patch(uri.assets.registers.generalassets.patchWarrantyDetails(generalAssetId), payload);
};

export const postGeneralAsset = (payload: GeneralAsset): Promise<AxiosResponse> => {
    return http.post(uri.assets.registers.generalassets.base, payload);
};

export const postGeneralAssetCustomFields = (generalAssetId: number, payload: GeneralAssetCustomField[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postCustomFields(generalAssetId), payload);
};

export const postGeneralAssetDepreciationDetails = (generalAssetId: number, payload: GeneralAssetDepreciationDetail[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    console.log('postdep')
    return http.post(uri.assets.registers.generalassets.postDepreciationDetails(generalAssetId), payload);
};

export const postGeneralAssetDocuments = (generalAssetId: number, payload: GeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postDocuments(generalAssetId), payload);
};

export const postGeneralAssetImages = (generalAssetId: number,payload: GeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postImages(generalAssetId), payload);
};

export const postGeneralAssetLinkedAssets = (generalAssetId: number,payload: GeneralAssetLinkedAsset[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postLinkedAssets(generalAssetId), payload);
};

export const postGeneralAssetSecondaryDetails = (payload: GeneralAssetItemGroupSearchCriteria): Promise<AxiosResponse<GeneralAssetSecondaryDetail[]>> => {
    return http.post<GeneralAssetSecondaryDetail[]>(uri.assets.registers.generalassets.postSecondaryDetails(), payload);
};

export const postGeneralAssetRegistrationDetails = (generalAssetId: number, payload: GeneralAssetRegistrationDetail[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postRegistrationDetails(generalAssetId), payload);
};

export const postGeneralAssetWarrantyDetails = (generalAssetId: number, payload: GeneralAssetWarrantyDetail[]): Promise<AxiosResponse> => {
    if (generalAssetId <= 0) return Promise.reject('General Asset ID is missing');
    return http.post(uri.assets.registers.generalassets.postWarrantyDetails(generalAssetId), payload);
};

export const getGeneralAsset = () => {
    return http.get<GeneralAssetItemGroup[]>(uri.assets.registers.generalassets.base);
};

export const useGeneralAssetItemGroupsForGrid = () =>
  useQuery(GENERAL_ASSET_ITEM_GROUPS_KEY, getGeneralAssetItemGroupsForGrid);

export const useGeneralAssetToLinked = (id: UrlParam) =>
  useQuery(GENERAL_ASSET_TO_LINKED, () => getGeneralAssetToLinked(id));

  export const useGeneralAssets = () =>
  useQuery(GENERAL_ASSET, getGeneralAsset);


export default {
    deleteCustomFields: deleteGeneralAssetCustomFields,
    deleteDepreciation: deleteGeneralAssetDepreciation,
    deleteDepreciationDetails: deleteGeneralAssetDepreciationDetails,
    deleteDocuments: deleteGeneralAssetDocuments,
    deleteImages: deleteGeneralAssetImages,
    deleteLinkedAssets: deleteGeneralAssetLinkedAssets,
    deleteRegistrationDetails: deleteGeneralAssetRegistrationDetails,
    deleteWarrantyDetails: deleteGeneralAssetWarrantyDetails,
    getCustomFields: getGeneralAssetCustomFields,
    getCustomFieldsDefault: getGeneralAssetCustomFieldsDefault,
    getDepreciationDetails: getGeneralAssetDepreciationDetails,
    getDocuments: getGeneralAssetDocuments,
    getFullInfo: getGeneralAssetFullInfo,
    getImages: getGeneralAssetImageAttachments,
    getItemGroupsForGrid: getGeneralAssetItemGroupsForGrid,
    getLinkedAssets: getGeneralAssetLinkedAssets,
    getRegistrationDetails: getGeneralAssetRegistrationDetails,
    getToLinked: getGeneralAssetToLinked,
    getWarrantyDetails: getGeneralAssetWarrantyDetails,
    getTransactionHistory: getGeneralAssetTransactionHistory,
    patch: patchGeneralAsset,
    patchCustomFields: patchGeneralAssetCustomFields,
    patchDepreciationDetails: patchGeneralAssetDepreciationDetails,
    patchDocuments: patchGeneralAssetDocuments,
    patchImages: patchGeneralAssetImages,
    patchLinkedAssets: patchGeneralAssetLinkedAssets,
    patchRegistrationDetails: patchGeneralAssetRegistrationDetails,
    patchWarrantyDetails: patchGeneralAssetWarrantyDetails,
    post: postGeneralAsset,
    postCustomFields: postGeneralAssetCustomFields,
    postDepreciationDetails: postGeneralAssetDepreciationDetails,
    postDocuments: postGeneralAssetDocuments,
    postImages: postGeneralAssetImages,
    postLinkedAssets: postGeneralAssetLinkedAssets,
    postRegistrationDetails: postGeneralAssetRegistrationDetails,
    postSecondaryDetails: postGeneralAssetSecondaryDetails,
    postWarrantyDetails: postGeneralAssetWarrantyDetails
}



