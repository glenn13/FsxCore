import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import WorkOrderVehicleAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderVehicleAdditionalCharge';
import WorkOrderVehicleDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleDocumentAttachment';
import WorkOrderVehicleImageAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleImageAttachment';
import WorkOrderVehicleLabour from '@app/entities/maintenance/workorder/WorkOrderVehicleLabour';
import WorkOrderVehicleMaterial from '@app/entities/maintenance/workorder/WorkOrderVehicleMaterial';

export const deleteWorkOrderVehicleAdditionalCharges = (workOrderVehicleId: number): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.delete(uri.maintenance.workordervehicle.deleteAdditionalCharges(workOrderVehicleId));
};

export const deleteWorkOrderVehicleDocuments = (workOrderVehicleId: number): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.delete(uri.maintenance.workordervehicle.deleteDocuments(workOrderVehicleId));
};

export const deleteWorkOrderVehicleImages = (workOrderVehicleId: number): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.delete(uri.maintenance.workordervehicle.deleteImages(workOrderVehicleId));
};

export const deleteWorkOrderVehicleLabours = (workOrderVehicleId: number): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.delete(uri.maintenance.workordervehicle.deleteLabours(workOrderVehicleId));
};

export const deleteWorkOrderVehicleMaterials = (workOrderVehicleId: number): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.delete(uri.maintenance.workordervehicle.deleteMaterials(workOrderVehicleId));
};

export const getWorkOrderVehicleAdditionalCharges = (id: UrlParam) => {
    return http.get<WorkOrderVehicleAdditionalCharge[]>(uri.maintenance.workordervehicle.additionalcharges(id));
};

export const getWorkOrderVehicleDocumentAttachments = (id: UrlParam) => {
    return http.get<WorkOrderVehicleDocumentAttachment[]>(uri.maintenance.workordervehicle.documents(id));
};

export const getWorkOrderVehicleFullInfo = (id: UrlParam) => {
    return http.get<WorkOrderVehicle>(uri.maintenance.workordervehicle.findFullInfo(id));
};

export const getWorkOrderVehicleImageAttachments = (id: UrlParam) => {
    return http.get<WorkOrderVehicleImageAttachment[]>(uri.maintenance.workordervehicle.images(id));
};

export const getWorkOrderVehicleLabours = (id: UrlParam) => {
    return http.get<WorkOrderVehicleLabour[]>(uri.maintenance.workordervehicle.labours(id));
};

export const getWorkOrderVehicleMaterials = (id: UrlParam) => {
    return http.get<WorkOrderVehicleMaterial[]>(uri.maintenance.workordervehicle.materials(id));
};

export const patchWorkOrderVehicle = (payload: WorkOrderVehicle): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.update(payload.id), payload);
};

export const patchWorkOrderVehicleAdditionalCharges = (workOrderVehicleId: number, payload: WorkOrderVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.patchAdditionalCharges(workOrderVehicleId), payload);
};

export const patchWorkOrderVehicleDocuments = (workOrderVehicleId: number, payload: WorkOrderVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.patchDocuments(workOrderVehicleId), payload);
};

export const patchWorkOrderVehicleImages = (workOrderVehicleId: number, payload: WorkOrderVehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.patchImages(workOrderVehicleId), payload);
};

export const patchWorkOrderVehicleLabours = (workOrderVehicleId: number, payload: WorkOrderVehicleLabour[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.patchLabours(workOrderVehicleId), payload);
};

export const patchWorkOrderVehicleMaterials = (workOrderVehicleId: number, payload: WorkOrderVehicleMaterial[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.patch(uri.maintenance.workordervehicle.patchMaterials(workOrderVehicleId), payload);
};

export const postWorkOrderVehicle = (payload: WorkOrderVehicle): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.workordervehicle.base, payload);
};

export const postWorkOrderVehicleAdditionalCharges = (workOrderVehicleId: number, payload: WorkOrderVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.post(uri.maintenance.workordervehicle.postAdditionalCharges(workOrderVehicleId), payload);
};

export const postWorkOrderVehicleDocuments = (workOrderVehicleId: number, payload: WorkOrderVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.post(uri.maintenance.workordervehicle.postDocuments(workOrderVehicleId), payload);
};

export const postWorkOrderVehicleImages = (workOrderVehicleId: number, payload: WorkOrderVehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.post(uri.maintenance.workordervehicle.postImages(workOrderVehicleId), payload);
};

export const postWorkOrderVehicleLabours = (workOrderVehicleId: number, payload: WorkOrderVehicleLabour[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.post(uri.maintenance.workordervehicle.postLabours(workOrderVehicleId), payload);
};

export const postWorkOrderVehicleMaterials = (workOrderVehicleId: number, payload: WorkOrderVehicleMaterial[]): Promise<AxiosResponse> => {
    if (workOrderVehicleId <= 0) return Promise.reject('Work Order Vehicle ID is missing');
    return http.post(uri.maintenance.workordervehicle.postMaterials(workOrderVehicleId), payload);
};

export default {
    deleteAdditionalCharges: deleteWorkOrderVehicleAdditionalCharges,
    deleteDocuments: deleteWorkOrderVehicleDocuments,
    deleteImages: deleteWorkOrderVehicleImages,
    deleteLabours: deleteWorkOrderVehicleLabours,
    deleteMaterials: deleteWorkOrderVehicleMaterials,
    getWorkOrderVehicleAdditionalCharges,
    getWorkOrderVehicleDocumentAttachments,
    getWorkOrderVehicleFullInfo,
    getWorkOrderVehicleImageAttachments,
    getWorkOrderVehicleLabours,
    getWorkOrderVehicleMaterials,
    patch: patchWorkOrderVehicle,
    patchAdditionalCharges: patchWorkOrderVehicleAdditionalCharges,
    patchDocuments: patchWorkOrderVehicleDocuments,
    patchImages: patchWorkOrderVehicleImages,
    patchLabours: patchWorkOrderVehicleLabours,
    patchMaterials: patchWorkOrderVehicleMaterials,
    post: postWorkOrderVehicle,
    postAdditionalCharges: postWorkOrderVehicleAdditionalCharges,
    postDocuments: postWorkOrderVehicleDocuments,
    postImages: postWorkOrderVehicleImages,
    postLabours: postWorkOrderVehicleLabours,
    postMaterials: postWorkOrderVehicleMaterials
}

