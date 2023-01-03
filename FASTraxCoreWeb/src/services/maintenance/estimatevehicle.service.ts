import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';
import EstimateVehicleAdditionalCharge from '@app/entities/maintenance/estimate/EstimateVehicleAdditionalCharge';
import EstimateVehicleDocumentAttachment from '@app/entities/maintenance/estimate/EstimateVehicleDocumentAttachment';
import EstimateVehicleImageAttachment from '@app/entities/maintenance/estimate/EstimateVehicleImageAttachment';
import EstimateVehicleMaterial from '@app/entities/maintenance/estimate/EstimateVehicleMaterial';

export const deleteEstimateVehicleAdditionalCharges = (estimateVehicleId: number): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.delete(uri.maintenance.estimatevehicle.deleteAdditionalCharges(estimateVehicleId));
};

export const deleteEstimateVehicleDocuments = (estimateVehicleId: number): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.delete(uri.maintenance.estimatevehicle.deleteDocuments(estimateVehicleId));
};

export const deleteEstimateVehicleImages = (estimateVehicleId: number): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.delete(uri.maintenance.estimatevehicle.deleteImages(estimateVehicleId));
};

export const deleteEstimateVehicleMaterials = (estimateVehicleId: number): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.delete(uri.maintenance.estimatevehicle.deleteMaterials(estimateVehicleId));
};

export const getEstimateVehicleAdditionalCharges = (id: UrlParam) => {
    return http.get<EstimateVehicleAdditionalCharge[]>(uri.maintenance.estimatevehicle.additionalcharges(id));
};

export const getEstimateVehicleDocumentAttachments = (id: UrlParam) => {
    return http.get<EstimateVehicleDocumentAttachment[]>(uri.maintenance.estimatevehicle.documents(id));
};

export const getEstimateVehicleFullInfo = (id: UrlParam) => {
    return http.get<EstimateVehicle>(uri.maintenance.estimatevehicle.findFullInfo(id));
};

export const getEstimateVehicleImageAttachments = (id: UrlParam) => {
    return http.get<EstimateVehicleImageAttachment[]>(uri.maintenance.estimatevehicle.images(id));
};

export const getEstimateVehicleMaterials = (id: UrlParam) => {
    return http.get<EstimateVehicleMaterial[]>(uri.maintenance.estimatevehicle.materials(id));
};

export const patchEstimateVehicle = (payload: EstimateVehicle): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Estimate Vehicle ID is missing');
    return http.patch(uri.maintenance.estimatevehicle.update(payload.id), payload);
};

export const patchEstimateVehicleAdditionalCharges = (estimateVehicleId: number, payload: EstimateVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.patch(uri.maintenance.estimatevehicle.patchAdditionalCharges(estimateVehicleId), payload);
};

export const patchEstimateVehicleDocuments = (estimateVehicleId: number, payload: EstimateVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.patch(uri.maintenance.estimatevehicle.patchDocuments(estimateVehicleId), payload);
};

export const patchEstimateVehicleImages = (estimateVehicleId: number, payload: EstimateVehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.patch(uri.maintenance.estimatevehicle.patchImages(estimateVehicleId), payload);
};

export const patchEstimateVehicleMaterials = (estimateVehicleId: number, payload: EstimateVehicleMaterial[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.patch(uri.maintenance.estimatevehicle.patchMaterials(estimateVehicleId), payload);
};

export const postEstimateVehicle = (payload: EstimateVehicle): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.estimatevehicle.base, payload);
};

export const postEstimateVehicleAdditionalCharges = (estimateVehicleId: number, payload: EstimateVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.post(uri.maintenance.estimatevehicle.postAdditionalCharges(estimateVehicleId), payload);
};

export const postEstimateVehicleDocuments = (estimateVehicleId: number, payload: EstimateVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.post(uri.maintenance.estimatevehicle.postDocuments(estimateVehicleId), payload);
};

export const postEstimateVehicleImages = (estimateVehicleId: number, payload: EstimateVehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.post(uri.maintenance.estimatevehicle.postImages(estimateVehicleId), payload);
};

export const postEstimateVehicleMaterials = (estimateVehicleId: number, payload: EstimateVehicleMaterial[]): Promise<AxiosResponse> => {
    if (estimateVehicleId <= 0) return Promise.reject('Estimate Vehicle ID is missing');
    return http.post(uri.maintenance.estimatevehicle.postMaterials(estimateVehicleId), payload);
};

export default {
    deleteAdditionalCharges: deleteEstimateVehicleAdditionalCharges,
    deleteDocuments: deleteEstimateVehicleDocuments,
    deleteImages: deleteEstimateVehicleImages,
    deleteMaterials: deleteEstimateVehicleMaterials,
    getEstimateVehicleAdditionalCharges,
    getEstimateVehicleDocumentAttachments,
    getEstimateVehicleFullInfo,
    getEstimateVehicleImageAttachments,
    getEstimateVehicleMaterials,
    patch: patchEstimateVehicle,
    patchAdditionalCharges: patchEstimateVehicleAdditionalCharges,
    patchDocuments: patchEstimateVehicleDocuments,
    patchImages: patchEstimateVehicleImages,
    patchMaterials: patchEstimateVehicleMaterials,
    post: postEstimateVehicle,
    postAdditionalCharges: postEstimateVehicleAdditionalCharges,
    postDocuments: postEstimateVehicleDocuments,
    postImages: postEstimateVehicleImages,
    postMaterials: postEstimateVehicleMaterials
}

