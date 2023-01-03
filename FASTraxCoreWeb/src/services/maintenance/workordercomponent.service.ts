import { AxiosResponse } from 'axios';
import http from '../http.service';
import uri from '@app/helpers/endpoints';

import WorkOrderComponent from '@app/entities/maintenance/workorder/WorkOrderComponent';
import WorkOrderComponentAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderComponentAdditionalCharge';
import WorkOrderComponentDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentDocumentAttachment';
import WorkOrderComponentImageAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentImageAttachment';
import WorkOrderComponentLabour from '@app/entities/maintenance/workorder/WorkOrderComponentLabour';
import WorkOrderComponentMaterial from '@app/entities/maintenance/workorder/WorkOrderComponentMaterial';
import RepairOperationSelection from '../../entities/maintenance/RepairOperationSelection';
import RepairSubGroup from '../../entities/maintenance/standard-entries/RepairSubGroup';
import RepairOperationDetails from '../../entities/maintenance/RepairOperationDetails';

export const deleteWorkOrderComponentAdditionalCharges = (workOrderComponentId: number): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.delete(uri.maintenance.workordercomponent.deleteAdditionalCharges(workOrderComponentId));
};

export const deleteWorkOrderComponentDocuments = (workOrderComponentId: number): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.delete(uri.maintenance.workordercomponent.deleteDocuments(workOrderComponentId));
};

export const deleteWorkOrderComponentImages = (workOrderComponentId: number): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.delete(uri.maintenance.workordercomponent.deleteImages(workOrderComponentId));
};

export const deleteWorkOrderComponentLabours = (workOrderComponentId: number): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.delete(uri.maintenance.workordercomponent.deleteLabours(workOrderComponentId));
};

export const deleteWorkOrderComponentMaterials = (workOrderComponentId: number): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.delete(uri.maintenance.workordercomponent.deleteMaterials(workOrderComponentId));
};

export const getRepairOperationAction = (payload: RepairSubGroup[]): Promise<AxiosResponse<RepairOperationDetails[]>> => {
    return http.post(uri.maintenance.workordercomponent.repairOperationAction(), payload);
};

export const getRepairOperationSelection = () => {
    return http.get<RepairOperationSelection[]>(uri.maintenance.workordercomponent.repairOperationSelection());
};

export const getWorkOrderComponentAdditionalCharges = (id: UrlParam) => {
    return http.get<WorkOrderComponentAdditionalCharge[]>(uri.maintenance.workordercomponent.additionalcharges(id));
};

export const getWorkOrderComponentDocumentAttachments = (id: UrlParam) => {
    return http.get<WorkOrderComponentDocumentAttachment[]>(uri.maintenance.workordercomponent.documents(id));
};

export const getWorkOrderComponentFullInfo = (id: UrlParam) => {
    return http.get<WorkOrderComponent>(uri.maintenance.workordercomponent.findFullInfo(id));
};

export const getWorkOrderComponentImageAttachments = (id: UrlParam) => {
    return http.get<WorkOrderComponentImageAttachment[]>(uri.maintenance.workordercomponent.images(id));
};

export const getWorkOrderComponentLabours = (id: UrlParam) => {
    return http.get<WorkOrderComponentLabour[]>(uri.maintenance.workordercomponent.labours(id));
};

export const getWorkOrderComponentMaterials = (id: UrlParam) => {
    return http.get<WorkOrderComponentMaterial[]>(uri.maintenance.workordercomponent.materials(id));
};

export const patchWorkOrderComponent = (payload: WorkOrderComponent): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.update(payload.id), payload);
};

export const patchWorkOrderComponentAdditionalCharges = (workOrderComponentId: number, payload: WorkOrderComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.patchAdditionalCharges(workOrderComponentId), payload);
};

export const patchWorkOrderComponentDocuments = (workOrderComponentId: number, payload: WorkOrderComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.patchDocuments(workOrderComponentId), payload);
};

export const patchWorkOrderComponentImages = (workOrderComponentId: number, payload: WorkOrderComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.patchImages(workOrderComponentId), payload);
};

export const patchWorkOrderComponentLabours = (workOrderComponentId: number, payload: WorkOrderComponentLabour[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.patchLabours(workOrderComponentId), payload);
};

export const patchWorkOrderComponentMaterials = (workOrderComponentId: number, payload: WorkOrderComponentMaterial[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.patch(uri.maintenance.workordercomponent.patchMaterials(workOrderComponentId), payload);
};

export const postWorkOrderComponent = (payload: WorkOrderComponent): Promise<AxiosResponse> => {
    return http.post(uri.maintenance.workordercomponent.base, payload);
};

export const postWorkOrderComponentAdditionalCharges = (workOrderComponentId: number, payload: WorkOrderComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.post(uri.maintenance.workordercomponent.postAdditionalCharges(workOrderComponentId), payload);
};

export const postWorkOrderComponentDocuments = (workOrderComponentId: number, payload: WorkOrderComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.post(uri.maintenance.workordercomponent.postDocuments(workOrderComponentId), payload);
};

export const postWorkOrderComponentImages = (workOrderComponentId: number, payload: WorkOrderComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.post(uri.maintenance.workordercomponent.postImages(workOrderComponentId), payload);
};

export const postWorkOrderComponentLabours = (workOrderComponentId: number, payload: WorkOrderComponentLabour[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.post(uri.maintenance.workordercomponent.postLabours(workOrderComponentId), payload);
};

export const postWorkOrderComponentMaterials = (workOrderComponentId: number, payload: WorkOrderComponentMaterial[]): Promise<AxiosResponse> => {
    if (workOrderComponentId <= 0) return Promise.reject('Work Order Component ID is missing');
    return http.post(uri.maintenance.workordercomponent.postMaterials(workOrderComponentId), payload);
};

export default {
    deleteAdditionalCharges: deleteWorkOrderComponentAdditionalCharges,
    deleteDocuments: deleteWorkOrderComponentDocuments,
    deleteImages: deleteWorkOrderComponentImages,
    deleteLabours: deleteWorkOrderComponentLabours,
    deleteMaterials: deleteWorkOrderComponentMaterials,
    getWorkOrderComponentAdditionalCharges,
    getWorkOrderComponentDocumentAttachments,
    getWorkOrderComponentFullInfo,
    getWorkOrderComponentImageAttachments,
    getWorkOrderComponentLabours,
    getWorkOrderComponentMaterials,
    getRepairOperationAction,
    patch: patchWorkOrderComponent,
    patchAdditionalCharges: patchWorkOrderComponentAdditionalCharges,
    patchDocuments: patchWorkOrderComponentDocuments,
    patchImages: patchWorkOrderComponentImages,
    patchLabours: patchWorkOrderComponentLabours,
    patchMaterials: patchWorkOrderComponentMaterials,
    post: postWorkOrderComponent,
    postAdditionalCharges: postWorkOrderComponentAdditionalCharges,
    postDocuments: postWorkOrderComponentDocuments,
    postImages: postWorkOrderComponentImages,
    postLabours: postWorkOrderComponentLabours,
    postMaterials: postWorkOrderComponentMaterials
}