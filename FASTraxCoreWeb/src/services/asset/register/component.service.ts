import { AxiosResponse } from 'axios';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import { useQuery } from 'react-query';

const COMPONENT_SUMMARY_KEY = 'VEHICLE_SUMMARY';

export const deleteComponent = (id: number) =>
    http.delete(uri.assets.registers.components.delete(id));

export const deleteComponentCustomFields = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteCustomFields(componentId));
};

export const deleteComponentDepreciation = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteDepreciation(componentId));
};

export const deleteComponentDepreciationDetails = (componentDepreciationId: number): Promise<AxiosResponse> => {
    if (componentDepreciationId <= 0) return Promise.reject('Component Depreciation ID is missing');
    return http.delete(uri.assets.registers.components.deleteDepreciationDetails(componentDepreciationId));
};

export const deleteComponentDocuments = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteDocuments(componentId));
};

export const deleteComponentImages = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteImages(componentId));
};

export const deleteComponentRegistrationDetails = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteRegistrationDetails(componentId));
};

export const deleteComponentWarrantyDetails = (componentId: number): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.delete(uri.assets.registers.components.deleteWarrantyDetails(componentId));
};

export const getComponentSummaryForGrid = () => {
    return http.get<ComponentSummary[]>(uri.assets.registers.components.summaryForGrid());
};

export const getComponentCustomFields = (id: UrlParam): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<ComponentCustomField[]>(uri.assets.registers.components.customFields(id));
};

export const getComponentCustomFieldsDefault = (): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<ComponentCustomField[]>(uri.assets.registers.components.customFieldsDefault());
};

export const getComponentTransactionHistory = (id: UrlParam) => {
    return http.get<RegisterTransactionHistory[]>(uri.assets.registers.components.transactionHistory(id));
}

export const getComponentDepreciationDetails = (id: UrlParam) => {
    return http.get<ComponentDepreciationDetail[]>(uri.assets.registers.components.depreciationDetails(id));
};

export const getComponentDocuments = (id: UrlParam) => {
    return http.get<ComponentDocumentAttachment[]>(uri.assets.registers.components.documents(id));
};

export const getComponentFullInfo = (id: UrlParam) => {
    return http.get<Component>(uri.assets.registers.components.fullInfo(id));
};

export const getComponentImageAttachments = (id: UrlParam) => {
    return http.get<ComponentImageAttachment[]>(uri.assets.registers.components.images(id));
};

export const getComponentRegistrationDetails = (id: UrlParam) => {
    return http.get<ComponentRegistrationDetail[]>(uri.assets.registers.components.registrationDetails(id));
};

export const getComponentWarrantyDetails = (id: UrlParam) => {
    return http.get<ComponentWarrantyDetail[]>(uri.assets.registers.components.warrantyDetails(id));
};

export const patchComponent = (payload: Component): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patch(payload.id), payload);
};

export const patchComponentCustomFields = (componentId: number, payload: ComponentCustomField[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchCustomFields(componentId), payload);
};

export const patchComponentDepreciationDetails = (componentId: number, payload: ComponentDepreciationDetail[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchDepreciationDetails(componentId), payload);
};

export const patchComponentDocuments = (componentId: number, payload: ComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchDocuments(componentId), payload);
};

export const patchComponentImages = (componentId: number, payload: ComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchImages(componentId), payload);
};

export const patchComponentRegistrationDetails = (componentId: number, payload: ComponentRegistrationDetail[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchRegistrationDetails(componentId), payload);
};

export const patchComponentWarrantyDetails = (componentId: number, payload: ComponentWarrantyDetail[]): Promise<AxiosResponse> => {
    if (!componentId) return Promise.reject('Component ID is missing');
    return http.patch(uri.assets.registers.components.patchWarrantyDetails(componentId), payload);
};

export const postComponent = (payload: Component): Promise<AxiosResponse> => {
    return http.post(uri.assets.registers.components.base, payload);
};

export const postComponentCustomFields = (componentId: number, payload: ComponentCustomField[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postCustomFields(componentId), payload);
};

export const postComponentDepreciationDetails = (componentId: number, payload: ComponentDepreciationDetail[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postDepreciationDetails(componentId), payload);
};

export const postComponentDocuments = (componentId: number, payload: ComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postDocuments(componentId), payload);
};

export const postComponentImages = (componentId: number,payload: ComponentImageAttachment[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postImages(componentId), payload);
};

export const postComponentRegistrationDetails = (componentId: number, payload: ComponentRegistrationDetail[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postRegistrationDetails(componentId), payload);
};

export const postComponentWarrantyDetails = (componentId: number, payload: ComponentWarrantyDetail[]): Promise<AxiosResponse> => {
    if (componentId <= 0) return Promise.reject('Component ID is missing');
    return http.post(uri.assets.registers.components.postWarrantyDetails(componentId), payload);
};

export const useComponentSummaryForGrid = () =>
    useQuery(COMPONENT_SUMMARY_KEY,getComponentSummaryForGrid);

export default {
    deleteCustomFields: deleteComponentCustomFields,
    deleteDepreciation: deleteComponentDepreciation,
    deleteDepreciationDetails: deleteComponentDepreciationDetails,
    deleteDocuments: deleteComponentDocuments,
    deleteImages: deleteComponentImages,
    deleteRegistrationDetails: deleteComponentRegistrationDetails,
    deleteWarrantyDetails: deleteComponentWarrantyDetails,
    getCustomFields: getComponentCustomFields,
    getCustomFieldsDefault: getComponentCustomFieldsDefault,
    getDepreciationDetails: getComponentDepreciationDetails,
    getDocuments: getComponentDocuments,
    getFullInfo: getComponentFullInfo,
    getImages: getComponentImageAttachments,
    getRegistrationDetails: getComponentRegistrationDetails,
    getWarrantyDetails: getComponentWarrantyDetails,
    getTransactionHistory: getComponentTransactionHistory,
    patch: patchComponent,
    patchCustomFields: patchComponentCustomFields,
    patchDepreciationDetails: patchComponentDepreciationDetails,
    patchDocuments: patchComponentDocuments,
    patchImages: patchComponentImages,
    patchRegistrationDetails: patchComponentRegistrationDetails,
    patchWarrantyDetails: patchComponentWarrantyDetails,
    post: postComponent,
    postCustomFields: postComponentCustomFields,
    postDepreciationDetails: postComponentDepreciationDetails,
    postDocuments: postComponentDocuments,
    postImages: postComponentImages,
    postRegistrationDetails: postComponentRegistrationDetails,
    postWarrantyDetails: postComponentWarrantyDetails
}



