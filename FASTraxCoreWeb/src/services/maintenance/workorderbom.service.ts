import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import WorkOrderBOM from '@app/entities/maintenance/workorder/WorkOrderBOM';
import WorkOrderBOMAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderBOMAdditionalCharge';
import WorkOrderBOMDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMDocumentAttachment';
import WorkOrderBOMImageAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMImageAttachment';
import WorkOrderBOMLabour from '@app/entities/maintenance/workorder/WorkOrderBOMLabour';
import WorkOrderBOMMaterial from '@app/entities/maintenance/workorder/WorkOrderBOMMaterial';

export const deleteWorkOrderBOMAdditionalCharges = (workOrderBOMId: number): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.delete(uri.maintenance.workorderbom.deleteAdditionalCharges(workOrderBOMId));
};

export const deleteWorkOrderBOMDocuments = (workOrderBOMId: number): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.delete(uri.maintenance.workorderbom.deleteDocuments(workOrderBOMId));
};

export const deleteWorkOrderBOMImages = (workOrderBOMId: number): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.delete(uri.maintenance.workorderbom.deleteImages(workOrderBOMId));
};

export const deleteWorkOrderBOMLabours = (workOrderBOMId: number): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.delete(uri.maintenance.workorderbom.deleteLabours(workOrderBOMId));
};

export const deleteWorkOrderBOMMaterials = (workOrderBOMId: number): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.delete(uri.maintenance.workorderbom.deleteMaterials(workOrderBOMId));
};

export const getWorkOrderBOMAdditionalCharges = (id: number | string) => {
    return http.get<WorkOrderBOMAdditionalCharge[]>(uri.maintenance.workorderbom.additionalcharges(id));
};

export const getWorkOrderBOMDocumentAttachments = (id: number | string) => {
    return http.get<WorkOrderBOMDocumentAttachment[]>(uri.maintenance.workorderbom.documents(id));
};

export const getWorkOrderBOMFullInfo = (id: number | string) => {
    return http.get<WorkOrderBOM>(uri.maintenance.workorderbom.findFullInfo(id));
};

export const getWorkOrderBOMImageAttachments = (id: number | string) => {
    return http.get<WorkOrderBOMImageAttachment[]>(uri.maintenance.workorderbom.images(id));
};

export const getWorkOrderBOMLabours = (id: number | string) => {
    return http.get<WorkOrderBOMLabour[]>(uri.maintenance.workorderbom.labours(id));
};

export const getWorkOrderBOMMaterials = (id: number | string) => {
    return http.get<WorkOrderBOMMaterial[]>(uri.maintenance.workorderbom.materials(id));
};

export const patchWorkOrderBOM = (payload: WorkOrderBOM): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.update(payload.id), payload);
};

export const patchWorkOrderBOMAdditionalCharges = (workOrderBOMId: number, payload: WorkOrderBOMAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.patchAdditionalCharges(workOrderBOMId), payload);
};

export const patchWorkOrderBOMDocuments = (workOrderBOMId: number, payload: WorkOrderBOMDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.patchDocuments(workOrderBOMId), payload);
};

export const patchWorkOrderBOMImages = (workOrderBOMId: number, payload: WorkOrderBOMImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.patchImages(workOrderBOMId), payload);
};

export const patchWorkOrderBOMLabours = (workOrderBOMId: number, payload: WorkOrderBOMLabour[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.patchLabours(workOrderBOMId), payload);
};

export const patchWorkOrderBOMMaterials = (workOrderBOMId: number, payload: WorkOrderBOMMaterial[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.patch(uri.maintenance.workorderbom.patchMaterials(workOrderBOMId), payload);
};

export const postWorkOrderBOM = (payload: WorkOrderBOM): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.workorderbom.base, payload);
};

export const postWorkOrderBOMAdditionalCharges = (workOrderBOMId: number, payload: WorkOrderBOMAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.post(uri.maintenance.workorderbom.postAdditionalCharges(workOrderBOMId), payload);
};

export const postWorkOrderBOMDocuments = (workOrderBOMId: number, payload: WorkOrderBOMDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.post(uri.maintenance.workorderbom.postDocuments(workOrderBOMId), payload);
};

export const postWorkOrderBOMImages = (workOrderBOMId: number, payload: WorkOrderBOMImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.post(uri.maintenance.workorderbom.postImages(workOrderBOMId), payload);
};

export const postWorkOrderBOMLabours = (workOrderBOMId: number, payload: WorkOrderBOMLabour[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.post(uri.maintenance.workorderbom.postLabours(workOrderBOMId), payload);
};

export const postWorkOrderBOMMaterials = (workOrderBOMId: number, payload: WorkOrderBOMMaterial[]): Promise<AxiosResponse> => {
    if (workOrderBOMId <= 0) return Promise.reject('Work Order BOM ID is missing');
    return http.post(uri.maintenance.workorderbom.postMaterials(workOrderBOMId), payload);
};

export default {
    deleteAdditionalCharges: deleteWorkOrderBOMAdditionalCharges,
    deleteDocuments: deleteWorkOrderBOMDocuments,
    deleteImages: deleteWorkOrderBOMImages,
    deleteLabours: deleteWorkOrderBOMLabours,
    deleteMaterials: deleteWorkOrderBOMMaterials,
    getWorkOrderBOMAdditionalCharges,
    getWorkOrderBOMDocumentAttachments,
    getWorkOrderBOMFullInfo,
    getWorkOrderBOMImageAttachments,
    getWorkOrderBOMLabours,
    getWorkOrderBOMMaterials,
    patch: patchWorkOrderBOM,
    patchAdditionalCharges: patchWorkOrderBOMAdditionalCharges,
    patchDocuments: patchWorkOrderBOMDocuments,
    patchImages: patchWorkOrderBOMImages,
    patchLabours: patchWorkOrderBOMLabours,
    patchMaterials: patchWorkOrderBOMMaterials,
    post: postWorkOrderBOM,
    postAdditionalCharges: postWorkOrderBOMAdditionalCharges,
    postDocuments: postWorkOrderBOMDocuments,
    postImages: postWorkOrderBOMImages,
    postLabours: postWorkOrderBOMLabours,
    postMaterials: postWorkOrderBOMMaterials
}

