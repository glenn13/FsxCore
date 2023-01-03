import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import EstimateGeneralAsset from '@app/entities/maintenance/estimate/EstimateGeneralAsset';
import EstimateGeneralAssetAdditionalCharge from '@app/entities/maintenance/estimate/EstimateGeneralAssetAdditionalCharge';
import EstimateGeneralAssetDocumentAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetDocumentAttachment';
import EstimateGeneralAssetImageAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetImageAttachment';
import EstimateGeneralAssetMaterial from '@app/entities/maintenance/estimate/EstimateGeneralAssetMaterial';

export const deleteEstimateGeneralAssetAdditionalCharges = (estimateGeneralAssetId: number): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.delete(uri.maintenance.estimategeneralasset.deleteAdditionalCharges(estimateGeneralAssetId));
};

export const deleteEstimateGeneralAssetDocuments = (estimateGeneralAssetId: number): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.delete(uri.maintenance.estimategeneralasset.deleteDocuments(estimateGeneralAssetId));
};

export const deleteEstimateGeneralAssetImages = (estimateGeneralAssetId: number): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.delete(uri.maintenance.estimategeneralasset.deleteImages(estimateGeneralAssetId));
};

export const deleteEstimateGeneralAssetMaterials = (estimateGeneralAssetId: number): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.delete(uri.maintenance.estimategeneralasset.deleteMaterials(estimateGeneralAssetId));
};

export const getEstimateGeneralAssetAdditionalCharges = (id: UrlParam) => {
    return http.get<EstimateGeneralAssetAdditionalCharge[]>(uri.maintenance.estimategeneralasset.additionalcharges(id));
};

export const getEstimateGeneralAssetDocumentAttachments = (id: UrlParam) => {
    return http.get<EstimateGeneralAssetDocumentAttachment[]>(uri.maintenance.estimategeneralasset.documents(id));
};

export const getEstimateGeneralAssetFullInfo = (id: UrlParam) => {
    return http.get<EstimateGeneralAsset>(uri.maintenance.estimategeneralasset.findFullInfo(id));
};

export const getEstimateGeneralAssetImageAttachments = (id: UrlParam) => {
    return http.get<EstimateGeneralAssetImageAttachment[]>(uri.maintenance.estimategeneralasset.images(id));
};

export const getEstimateGeneralAssetMaterials = (id: UrlParam) => {
    return http.get<EstimateGeneralAssetMaterial[]>(uri.maintenance.estimategeneralasset.materials(id));
};

export const patchEstimateGeneralAsset = (payload: EstimateGeneralAsset): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Estimate General Asset ID is missing');
    return http.patch(uri.maintenance.estimategeneralasset.update(payload.id), payload);
};

export const patchEstimateGeneralAssetAdditionalCharges = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.patch(uri.maintenance.estimategeneralasset.patchAdditionalCharges(estimateGeneralAssetId), payload);
};

export const patchEstimateGeneralAssetDocuments = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.patch(uri.maintenance.estimategeneralasset.patchDocuments(estimateGeneralAssetId), payload);
};

export const patchEstimateGeneralAssetImages = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.patch(uri.maintenance.estimategeneralasset.patchImages(estimateGeneralAssetId), payload);
};

export const patchEstimateGeneralAssetMaterials = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.patch(uri.maintenance.estimategeneralasset.patchMaterials(estimateGeneralAssetId), payload);
};

export const postEstimateGeneralAsset = (payload: EstimateGeneralAsset): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.estimategeneralasset.base, payload);
};

export const postEstimateGeneralAssetAdditionalCharges = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.post(uri.maintenance.estimategeneralasset.postAdditionalCharges(estimateGeneralAssetId), payload);
};

export const postEstimateGeneralAssetDocuments = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.post(uri.maintenance.estimategeneralasset.postDocuments(estimateGeneralAssetId), payload);
};

export const postEstimateGeneralAssetImages = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.post(uri.maintenance.estimategeneralasset.postImages(estimateGeneralAssetId), payload);
};

export const postEstimateGeneralAssetMaterials = (estimateGeneralAssetId: number, payload: EstimateGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    if (estimateGeneralAssetId <= 0) return Promise.reject('Estimate General Asset ID is missing');
    return http.post(uri.maintenance.estimategeneralasset.postMaterials(estimateGeneralAssetId), payload);
};

export default {
    deleteAdditionalCharges: deleteEstimateGeneralAssetAdditionalCharges,
    deleteDocuments: deleteEstimateGeneralAssetDocuments,
    deleteImages: deleteEstimateGeneralAssetImages,
    deleteMaterials: deleteEstimateGeneralAssetMaterials,
    getEstimateGeneralAssetAdditionalCharges,
    getEstimateGeneralAssetDocumentAttachments,
    getEstimateGeneralAssetFullInfo,
    getEstimateGeneralAssetImageAttachments,
    getEstimateGeneralAssetMaterials,
    patch: patchEstimateGeneralAsset,
    patchAdditionalCharges: patchEstimateGeneralAssetAdditionalCharges,
    patchDocuments: patchEstimateGeneralAssetDocuments,
    patchImages: patchEstimateGeneralAssetImages,
    patchMaterials: patchEstimateGeneralAssetMaterials,
    post: postEstimateGeneralAsset,
    postAdditionalCharges: postEstimateGeneralAssetAdditionalCharges,
    postDocuments: postEstimateGeneralAssetDocuments,
    postImages: postEstimateGeneralAssetImages,
    postMaterials: postEstimateGeneralAssetMaterials
}

