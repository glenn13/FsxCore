import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import WorkOrderGeneralAsset from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import WorkOrderGeneralAssetAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetAdditionalCharge';
import WorkOrderGeneralAssetDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDocumentAttachment';
import WorkOrderGeneralAssetImageAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetImageAttachment';
import WorkOrderGeneralAssetLabour from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetLabour';
import WorkOrderGeneralAssetMaterial from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMaterial';

export const deleteWorkOrderGeneralAssetAdditionalCharges = (workOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.delete(uri.maintenance.workordergeneralasset.deleteAdditionalCharges(workOrderGeneralAssetId));
};

export const deleteWorkOrderGeneralAssetDocuments = (workOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.delete(uri.maintenance.workordergeneralasset.deleteDocuments(workOrderGeneralAssetId));
};

export const deleteWorkOrderGeneralAssetImages = (workOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.delete(uri.maintenance.workordergeneralasset.deleteImages(workOrderGeneralAssetId));
};

export const deleteWorkOrderGeneralAssetLabours = (workOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.delete(uri.maintenance.workordergeneralasset.deleteLabours(workOrderGeneralAssetId));
};

export const deleteWorkOrderGeneralAssetMaterials = (workOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.delete(uri.maintenance.workordergeneralasset.deleteMaterials(workOrderGeneralAssetId));
};

export const getWorkOrderGeneralAssetAdditionalCharges = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAssetAdditionalCharge[]>(uri.maintenance.workordergeneralasset.additionalcharges(id));
};

export const getWorkOrderGeneralAssetDocumentAttachments = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAssetDocumentAttachment[]>(uri.maintenance.workordergeneralasset.documents(id));
};

export const getWorkOrderGeneralAssetFullInfo = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAsset>(uri.maintenance.workordergeneralasset.findFullInfo(id));
};

export const getWorkOrderGeneralAssetImageAttachments = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAssetImageAttachment[]>(uri.maintenance.workordergeneralasset.images(id));
};

export const getWorkOrderGeneralAssetLabours = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAssetLabour[]>(uri.maintenance.workordergeneralasset.labours(id));
};

export const getWorkOrderGeneralAssetMaterials = (id: UrlParam) => {
    return http.get<WorkOrderGeneralAssetMaterial[]>(uri.maintenance.workordergeneralasset.materials(id));
};

export const patchWorkOrderGeneralAsset = (payload: WorkOrderGeneralAsset): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.update(payload.id), payload);
};

export const patchWorkOrderGeneralAssetAdditionalCharges = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.patchAdditionalCharges(workOrderGeneralAssetId), payload);
};

export const patchWorkOrderGeneralAssetDocuments = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.patchDocuments(workOrderGeneralAssetId), payload);
};

export const patchWorkOrderGeneralAssetImages = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.patchImages(workOrderGeneralAssetId), payload);
};

export const patchWorkOrderGeneralAssetLabours = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetLabour[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.patchLabours(workOrderGeneralAssetId), payload);
};

export const patchWorkOrderGeneralAssetMaterials = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.patch(uri.maintenance.workordergeneralasset.patchMaterials(workOrderGeneralAssetId), payload);
};

export const postWorkOrderGeneralAsset = (payload: WorkOrderGeneralAsset): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.workordergeneralasset.base, payload);
};

export const postWorkOrderGeneralAssetAdditionalCharges = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.post(uri.maintenance.workordergeneralasset.postAdditionalCharges(workOrderGeneralAssetId), payload);
};

export const postWorkOrderGeneralAssetDocuments = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.post(uri.maintenance.workordergeneralasset.postDocuments(workOrderGeneralAssetId), payload);
};

export const postWorkOrderGeneralAssetImages = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.post(uri.maintenance.workordergeneralasset.postImages(workOrderGeneralAssetId), payload);
};

export const postWorkOrderGeneralAssetLabours = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetLabour[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.post(uri.maintenance.workordergeneralasset.postLabours(workOrderGeneralAssetId), payload);
};

export const postWorkOrderGeneralAssetMaterials = (workOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    if (workOrderGeneralAssetId <= 0) return Promise.reject('Work Order General Asset ID is missing');
    return http.post(uri.maintenance.workordergeneralasset.postMaterials(workOrderGeneralAssetId), payload);
};

export default {
    deleteAdditionalCharges: deleteWorkOrderGeneralAssetAdditionalCharges,
    deleteDocuments: deleteWorkOrderGeneralAssetDocuments,
    deleteImages: deleteWorkOrderGeneralAssetImages,
    deleteLabours: deleteWorkOrderGeneralAssetLabours,
    deleteMaterials: deleteWorkOrderGeneralAssetMaterials,
    getWorkOrderGeneralAssetAdditionalCharges,
    getWorkOrderGeneralAssetDocumentAttachments,
    getWorkOrderGeneralAssetFullInfo,
    getWorkOrderGeneralAssetImageAttachments,
    getWorkOrderGeneralAssetLabours,
    getWorkOrderGeneralAssetMaterials,
    patch: patchWorkOrderGeneralAsset,
    patchAdditionalCharges: patchWorkOrderGeneralAssetAdditionalCharges,
    patchDocuments: patchWorkOrderGeneralAssetDocuments,
    patchImages: patchWorkOrderGeneralAssetImages,
    patchLabours: patchWorkOrderGeneralAssetLabours,
    patchMaterials: patchWorkOrderGeneralAssetMaterials,
    post: postWorkOrderGeneralAsset,
    postAdditionalCharges: postWorkOrderGeneralAssetAdditionalCharges,
    postDocuments: postWorkOrderGeneralAssetDocuments,
    postImages: postWorkOrderGeneralAssetImages,
    postLabours: postWorkOrderGeneralAssetLabours,
    postMaterials: postWorkOrderGeneralAssetMaterials
}