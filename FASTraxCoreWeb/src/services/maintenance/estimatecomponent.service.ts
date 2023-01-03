import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';
import EstimateComponentAdditionalCharge from '@app/entities/maintenance/estimate/EstimateComponentAdditionalCharge';
import EstimateComponentDocumentAttachment from '@app/entities/maintenance/estimate/EstimateComponentDocumentAttachment';
import EstimateComponentImageAttachment from '@app/entities/maintenance/estimate/EstimateComponentImageAttachment';
import EstimateComponentMaterial from '@app/entities/maintenance/estimate/EstimateComponentMaterial';

export const deleteEstimateComponentAdditionalCharges = (estimateComponentId: number): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.delete(uri.maintenance.estimatecomponent.deleteAdditionalCharges(estimateComponentId));
};

export const deleteEstimateComponentDocuments = (estimateComponentId: number): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.delete(uri.maintenance.estimatecomponent.deleteDocuments(estimateComponentId));
};

export const deleteEstimateComponentImages = (estimateComponentId: number): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.delete(uri.maintenance.estimatecomponent.deleteImages(estimateComponentId));
};

export const deleteEstimateComponentMaterials = (estimateComponentId: number): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.delete(uri.maintenance.estimatecomponent.deleteMaterials(estimateComponentId));
};

export const getEstimateComponentAdditionalCharges = (id: UrlParam) => {
    return http.get<EstimateComponentAdditionalCharge[]>(uri.maintenance.estimatecomponent.additionalcharges(id));
};

export const getEstimateComponentDocumentAttachments = (id: UrlParam) => {
    return http.get<EstimateComponentDocumentAttachment[]>(uri.maintenance.estimatecomponent.documents(id));
};

export const getEstimateComponentFullInfo = (id: UrlParam) => {
    return http.get<EstimateComponent>(uri.maintenance.estimatecomponent.findFullInfo(id));
};

export const getEstimateComponentImageAttachments = (id: UrlParam) => {
    return http.get<EstimateComponentImageAttachment[]>(uri.maintenance.estimatecomponent.images(id));
};

export const getEstimateComponentMaterials = (id: UrlParam) => {
    return http.get<EstimateComponentMaterial[]>(uri.maintenance.estimatecomponent.materials(id));
};

export const patchEstimateComponent = (payload: EstimateComponent): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Estimate Component ID is missing');
    return http.patch(uri.maintenance.estimatecomponent.update(payload.id), payload);
};

export const patchEstimateComponentAdditionalCharges = (estimateComponentId: number, payload: EstimateComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.patch(uri.maintenance.estimatecomponent.patchAdditionalCharges(estimateComponentId), payload);
};

export const patchEstimateComponentDocuments = (estimateComponentId: number, payload: EstimateComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.patch(uri.maintenance.estimatecomponent.patchDocuments(estimateComponentId), payload);
};

export const patchEstimateComponentImages = (estimateComponentId: number, payload: EstimateComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.patch(uri.maintenance.estimatecomponent.patchImages(estimateComponentId), payload);
};

export const patchEstimateComponentMaterials = (estimateComponentId: number, payload: EstimateComponentMaterial[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.patch(uri.maintenance.estimatecomponent.patchMaterials(estimateComponentId), payload);
};

export const postEstimateComponent = (payload: EstimateComponent): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.estimatecomponent.base, payload);
};

export const postEstimateComponentAdditionalCharges = (estimateComponentId: number, payload: EstimateComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.post(uri.maintenance.estimatecomponent.postAdditionalCharges(estimateComponentId), payload);
};

export const postEstimateComponentDocuments = (estimateComponentId: number, payload: EstimateComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.post(uri.maintenance.estimatecomponent.postDocuments(estimateComponentId), payload);
};

export const postEstimateComponentImages = (estimateComponentId: number, payload: EstimateComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.post(uri.maintenance.estimatecomponent.postImages(estimateComponentId), payload);
};

export const postEstimateComponentMaterials = (estimateComponentId: number, payload: EstimateComponentMaterial[]): Promise<AxiosResponse> => {
    if (estimateComponentId <= 0) return Promise.reject('Estimate Component ID is missing');
    return http.post(uri.maintenance.estimatecomponent.postMaterials(estimateComponentId), payload);
};

export default {
    deleteAdditionalCharges: deleteEstimateComponentAdditionalCharges,
    deleteDocuments: deleteEstimateComponentDocuments,
    deleteImages: deleteEstimateComponentImages,
    deleteMaterials: deleteEstimateComponentMaterials,
    getEstimateComponentAdditionalCharges,
    getEstimateComponentDocumentAttachments,
    getEstimateComponentFullInfo,
    getEstimateComponentImageAttachments,
    getEstimateComponentMaterials,
    patch: patchEstimateComponent,
    patchAdditionalCharges: patchEstimateComponentAdditionalCharges,
    patchDocuments: patchEstimateComponentDocuments,
    patchImages: patchEstimateComponentImages,
    patchMaterials: patchEstimateComponentMaterials,
    post: postEstimateComponent,
    postAdditionalCharges: postEstimateComponentAdditionalCharges,
    postDocuments: postEstimateComponentDocuments,
    postImages: postEstimateComponentImages,
    postMaterials: postEstimateComponentMaterials
}

