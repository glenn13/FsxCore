import { AxiosResponse } from 'axios';
import http from '../../http.service';
import uri from '@app/helpers/endpoints';
import { QueryResult, useQuery } from 'react-query';
import { identity } from 'lodash';
import {generateUUID} from '../../../helpers/randoms';
import { Http2ServerRequest } from 'http2';

const KEY = generateUUID();
const VEHICLE_SUMMARY_KEY = 'VEHICLE_SUMMARY';
export const ASSET_TO_LINKED = 'ASSET_TO_LINKED';

export const deleteVehicle= (id: number) =>
    http.delete(uri.assets.registers.vehicles.delete(id));

export const deleteVehicleArmourDetails = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteArmourDetails(vehicleId));
};

export const deleteVehicleCustomFields = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteCustomFields(vehicleId));
};

export const deleteVehicleDepreciation = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteDepreciation(vehicleId));
};

export const deleteVehicleDepreciationDetails = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteDepreciationDetails(vehicleId));
};

export const deleteVehicleDocuments = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteDocuments(vehicleId));
};

export const deleteVehicleEngineHistory = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteEngineHistory(vehicleId));
};

export const deleteVehicleFuelMonitoring = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteFuelMonitoring(vehicleId));
};

export const deleteVehicleImages = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteImages(vehicleId));
};

export const deleteVehicleLinkedAssets= (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteLinkedAssets(vehicleId));
};

export const deleteVehicleOdometerHistory = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteOdometerHistory(vehicleId));
};

export const deleteVehicleRegistrationDetails = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteRegistrationDetails(vehicleId));
};

export const deleteVehicleWarrantyDetails = (vehicleId: number): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.delete(uri.assets.registers.vehicles.deleteWarrantyDetails(vehicleId));
};


export const getAssetToLinked = async (payload?: AssetLinked): Promise<AxiosResponse<VehicleLinkedAsset[]>> => {
    return http.post<VehicleLinkedAsset[]>(uri.assets.registers.vehicles.toLinkedAssets(), payload);
};

// export const getAssetToLinked = async (payload?: AssetLinked): Promise<AxiosResponse<VehicleLinkedAsset[]>> => {
//     let _result: any;
//     if(payload !== undefined) {
//         return http.post<VehicleLinkedAsset[]>(uri.assets.registers.vehicles.toLinkedAssets(), payload);
//     } else {
//         return emptyVehicleLinkedAsset();
//     }

// };

// export const getAssetToLinked = (payload?: AssetLinked): ReduxThunk<Promise<AxiosResponse<VehicleLinkedAsset[]>>> => async (_, getState) => {
//     return http.post<VehicleLinkedAsset[]>(uri.assets.registers.vehicles.toLinkedAssets(), payload);
// }

// export const submitAssetLinkedPayload = async (payload: AssetLinked): Promise<AxiosResponse> => {
//     const requestToServer = vehicleService.;
//     return requestToServer(payload);
// }


export const getVehicleArmourDetails = (id: UrlParam) => {
    return http.get<VehicleArmourDetail[]>(uri.assets.registers.vehicles.armourDetails(id));
};

export const getVehicleCustomFields = (id: UrlParam): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<VehicleCustomField[]>(uri.assets.registers.vehicles.customFields(id));
};

export const getVehicleCustomFieldsDefault = (): Promise<AxiosResponse> => {
    //Intended to have different model from the returned result from api controller and the response result
    //to retrieve in Web UI for easy to manipulate the entity in Web UI since it will map automatically the properties for each entity.
    return http.get<VehicleCustomField[]>(uri.assets.registers.vehicles.customFieldsDefault());
};

export const getVehicleDepreciationDetails = (id: UrlParam) => {
    return http.get<VehicleDepreciationDetail[]>(uri.assets.registers.vehicles.depreciationDetails(id));
};

export const getVehicleDocumentAttachments = (id: UrlParam) => {
    return http.get<VehicleDocumentAttachment[]>(uri.assets.registers.vehicles.documents(id));
};

export const getVehicleEngineHistory = (id: UrlParam) => {
    return http.get<VehicleEngineHistory[]>(uri.assets.registers.vehicles.engineHistory(id));
};

export const getVehicleFullInfo = (id: UrlParam) => {
    return http.get<Vehicle>(uri.assets.registers.vehicles.fullInfo(id));
};

export const getVehicleFuelMonitoring = (id: UrlParam) => {
    return http.get<VehicleFuelMonitoring[]>(uri.assets.registers.vehicles.fuelMonitoring(id));
};

export const getVehicleImageAttachments = (id: UrlParam) => {
    return http.get<VehicleImageAttachment[]>(uri.assets.registers.vehicles.images(id));
};

export const getVehicleLinkedAssets = (id: UrlParam) : Promise<AxiosResponse> => {
    return http.get<VehicleLinkedAsset[]>(uri.assets.registers.vehicles.linkedAssets(id));
};


export const getVehicleOdometerHistory = (id: UrlParam) => {
    return http.get<VehicleOdometerHistory[]>(uri.assets.registers.vehicles.odometerHistory(id));
};

export const getVehicleRegistrationDetail = (id: UrlParam) => {
    return http.get<VehicleRegistrationDetail[]>(uri.assets.registers.vehicles.registrationDetails(id));
};

export const getVehicleSummaryForGrid = () => {
    return http.get<VehicleSummary[]>(uri.assets.registers.vehicles.summaryForGrid());
};

export const getVehicleWarrantyDetail = (id: UrlParam) => {
    return http.get<VehicleWarrantyDetail[]>(uri.assets.registers.vehicles.warrantyDetails(id));
};

export const getVehicleTransactionHistory = (id: UrlParam) => {
    return http.get<RegisterTransactionHistory[]>(uri.assets.registers.vehicles.transactionHistory(id));
}

export const patchVehicle = (payload: Vehicle): Promise<AxiosResponse> => {
    if (!payload.id) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patch(payload.id), payload);
};

export const patchVehicleArmourDetails = (vehicleId: number, payload: VehicleArmourDetail[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchArmourDetails(vehicleId), payload);
};

export const patchVehicleCustomFields = (vehicleId: number, payload: VehicleCustomField[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchCustomFields(vehicleId), payload);
};

export const patchVehicleDepreciationDetails = (vehicleId: number, payload: VehicleDepreciationDetail[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchDepreciationDetails(vehicleId), payload);
};

export const patchVehicleDocumentAttachments = (vehicleId: number, payload: VehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchDocuments(vehicleId), payload);
};

export const patchVehicleEngineHistory = (vehicleId: number, payload: VehicleEngineHistory[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchEngineHistory(vehicleId), payload);
};

export const patchVehicleFuelMonitoring = (vehicleId: number, payload: VehicleFuelMonitoring[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchFuelMonitoring(vehicleId), payload);
};

export const patchVehicleImageAttachment = (vehicleId: number, payload: VehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchImages(vehicleId), payload);
};

export const patchVehicleLinkedAsset = (vehicleId: number, payload: VehicleLinkedAsset[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchLinkedAssets(vehicleId), payload);
};

export const patchVehicleOdometerHistory = (vehicleId: number, payload: VehicleOdometerHistory[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchOdometerHistory(vehicleId), payload);
};

export const patchVehicleRegistrationDetail = (vehicleId: number, payload: VehicleRegistrationDetail[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchRegistrationDetails(vehicleId), payload);
};

export const patchVehicleWarrantyDetail = (vehicleId: number, payload: VehicleWarrantyDetail[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.patch(uri.assets.registers.vehicles.patchWarrantyDetails(vehicleId), payload);
};

export const postVehicleAssetLinked = (payload: AssetLinked): Promise<AxiosResponse<VehicleLinkedAsset[]>> => {
    return http.post(uri.assets.registers.vehicles.toLinkedAssets(), payload);
};

export const postVehicle = (payload: Vehicle): Promise<AxiosResponse> => {
    return http.post(uri.assets.registers.vehicles.base, payload);
};

export const postVehicleArmourDetails = (vehicleId: number, payload: VehicleArmourDetail[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postArmourDetails(vehicleId), payload);
};

export const postVehicleCustomFields = (vehicleId: number, payload: VehicleCustomField[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postCustomFields(vehicleId), payload);
};

export const postVehicleDepreciationDetails = (vehicleId: number, payload: VehicleDepreciationDetail[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postDepreciationDetails(vehicleId), payload);
};

export const postVehicleDocumentAttachments = (vehicleId: number, payload: VehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postDocuments(vehicleId), payload);
};

export const postVehicleEngineHistory = (vehicleId: number, payload: VehicleEngineHistory[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postEngineHistory(vehicleId), payload);
};

export const postVehicleFuelMonitoring = (vehicleId: number, payload: VehicleFuelMonitoring[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postFuelMonitoring(vehicleId), payload);
};

export const postVehicleImageAttachment = (vehicleId: number, payload: VehicleImageAttachment[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postImages(vehicleId), payload);
};

export const postVehicleLinkedAsset = (vehicleId: number, payload: VehicleLinkedAsset[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postLinkedAssets(vehicleId), payload);
};

export const postVehicleOdometerHistory = (vehicleId: number, payload: VehicleOdometerHistory[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postOdometerHistory(vehicleId), payload);
};

export const postVehicleRegistrationDetail = (vehicleId: number, payload: VehicleRegistrationDetail[]): Promise<AxiosResponse> => {
    if (vehicleId <= 0) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postRegistrationDetails(vehicleId), payload);
};

export const postVehicleWarrantyDetail = (vehicleId: number, payload: VehicleWarrantyDetail[]): Promise<AxiosResponse> => {
    if (!vehicleId) return Promise.reject('Vehicle ID is missing');
    return http.post(uri.assets.registers.vehicles.postWarrantyDetails(vehicleId), payload);
};

export const useVehicleSummaryForGrid = () =>
    useQuery(VEHICLE_SUMMARY_KEY,getVehicleSummaryForGrid);

// export const useAssetToLinked = (payload?: AssetLinked) =>
//     useQuery(ASSET_TO_LINKED, () => getAssetToLinked(payload));

export const useAssetToLinked = (payload?: AssetLinked) => {
    return useQuery(ASSET_TO_LINKED, () => getAssetToLinked(payload));
    // if (payload !== undefined) {
    //     return useQuery(ASSET_TO_LINKED, () => getAssetToLinked(payload));
    // } else {
    //   return Promise.reject();
    // }
}

export const getVehicles = () => {
    return http.get<Vehicle[]>(uri.assets.registers.vehicles.summaryForGrid());
  };
  
export const useVehicles = () => useQuery(KEY, getVehicles);
  
export default {
    deleteArmourDetails: deleteVehicleArmourDetails,
    deleteCustomFields: deleteVehicleCustomFields,
    deleteDepreciation: deleteVehicleDepreciation,
    deleteDepreciationDetails: deleteVehicleDepreciationDetails,
    deleteDocuments: deleteVehicleDocuments,
    deleteEngineHistory: deleteVehicleEngineHistory,
    deleteFuelMonitoring: deleteVehicleFuelMonitoring,
    deleteImages: deleteVehicleImages,
    deleteLinkedAssets: deleteVehicleLinkedAssets,
    deleteOdometerHistory: deleteVehicleOdometerHistory,
    deleteRegistrationDetails: deleteVehicleRegistrationDetails,
    deleteWarrantyDetails: deleteVehicleWarrantyDetails,
    getArmourDetails: getVehicleArmourDetails,
    getCustomFields: getVehicleCustomFields,
    getCustomFieldsDefault: getVehicleCustomFieldsDefault,
    getDepreciationDetails: getVehicleDepreciationDetails,
    getDocumentAttachments: getVehicleDocumentAttachments,
    getEngineHistory: getVehicleEngineHistory,
    getFuelMonitoring: getVehicleFuelMonitoring,
    getFullInfo: getVehicleFullInfo,
    getImageAttachments: getVehicleImageAttachments,
    getLinkedAssets: getVehicleLinkedAssets,
    getOdometerHistory: getVehicleOdometerHistory,
    getRegistrationDetail: getVehicleRegistrationDetail,
    getWarrantyDetail: getVehicleWarrantyDetail,
    getTransactionHistory: getVehicleTransactionHistory,
    patch: patchVehicle,
    patchArmourDetails: patchVehicleArmourDetails,
    patchCustomFields: patchVehicleCustomFields,
    patchDepreciationDetails: patchVehicleDepreciationDetails,
    patchDocumentAttachments: patchVehicleDocumentAttachments,
    patchEngineHistory: patchVehicleEngineHistory,
    patchFuelMonitoring: patchVehicleFuelMonitoring,
    patchImageAttachment: patchVehicleImageAttachment,
    patchLinkedAsset: patchVehicleLinkedAsset,
    patchOdometerHistory: patchVehicleOdometerHistory,
    patchRegistrationDetail: patchVehicleRegistrationDetail,
    patchWarrantyDetail: patchVehicleWarrantyDetail,
    post: postVehicle,
    postAssetLinked: postVehicleAssetLinked,
    postArmourDetails: postVehicleArmourDetails,
    postCustomFields: postVehicleCustomFields,
    postDepreciationDetails: postVehicleDepreciationDetails,
    postDocumentAttachments: postVehicleDocumentAttachments,
    postEngineHistory: postVehicleEngineHistory,
    postFuelMonitoring: postVehicleFuelMonitoring,
    postImageAttachment: postVehicleImageAttachment,
    postLinkedAsset: postVehicleLinkedAsset,
    postOdometerHistory: postVehicleOdometerHistory,
    postRegistrationDetail: postVehicleRegistrationDetail,
    postWarrantyDetail: postVehicleWarrantyDetail
}








