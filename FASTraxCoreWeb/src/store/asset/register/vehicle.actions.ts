import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';
import _ from 'lodash';

import {setVehicle} from './vehicle.reducers'
import {setVehicleArmourDetail} from './vehiclearmourdetail.reducers'
import {setVehicleDepreciationDetail} from './vehicledepreciationdetail.reducers'
import {setVehicleDocumentAttachment} from './vehicledocumentattachment.reducers'
import {setVehicleEngineHistory} from './vehicleenginehistory.reducers'
import {setVehicleFuelMonitoring} from './vehiclefuelmonitoring.reducers'
import {setVehicleImageAttachment} from './vehicleimageattachment.reducers'
import {setVehicleOdometerHistory} from './vehicleodometerhistory.reducers'
import {setVehicleRegistrationDetail} from './vehicleregistrationdetail.reducers'
import {setVehicleWarrantyDetail} from './vehiclewarrantydetail.reducers'
import vehicleService, { deleteVehicleCustomFields } from '@app/services/asset/register/vehicle.service';
import {setVehicleLinkedAsset} from './vehiclelinkedasset.reducers';
import {setVehicleCustomField} from './vehiclecustomfield.reducers';
import { setVehicleTransactionHistory } from './vehicletransactionhistory.reducers';

export const deleteVehicleArmourDetails = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteArmourDetails(vehicleId);
    return requestToServer;
}

export const deleteVehicleDepreciationDetails = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteDepreciationDetails(vehicleId);
    return requestToServer;
}

export const deleteVehicleDocuments = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteDocuments(vehicleId);
    return requestToServer;
}

export const deleteVehicleEngineHistory = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteEngineHistory(vehicleId);
    return requestToServer;
}

export const deleteVehicleFuelMonitoring = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteFuelMonitoring(vehicleId);
    return requestToServer;
}

export const deleteVehicleImages = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteImages(vehicleId);
    return requestToServer;
}

export const deleteVehicleLinkedAssets = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteLinkedAssets(vehicleId);
    return requestToServer;
}

export const deleteVehicleOdometerHistory = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteOdometerHistory(vehicleId);
    return requestToServer;
}

export const deleteVehicleRegistrationDetails = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteRegistrationDetails(vehicleId);
    return requestToServer;
}

export const deleteVehicleWarrantyDetails = async (vehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = vehicleService.deleteWarrantyDetails(vehicleId);
    return requestToServer;
}

export const loadVehicleArmourDetails = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getArmourDetails(id);
    dispatch(setVehicleArmourDetail(response.data));
}

export const loadVehicleCustomFieldsDefault = (): ReduxThunk<Promise<AxiosResponse<VehicleCustomField[]>>> => async (_, getState) => {
    const response = await vehicleService.getCustomFieldsDefault();
    return response.data;
}

export const loadVehicleCustomFieldsOnEdit = (id: UrlParam): ReduxThunk<Promise<AxiosResponse<VehicleCustomField[]>>> => async (_, getState) => {
    const response = await vehicleService.getCustomFields(id);
    return response.data;
}
export const loadVehicleCustomFields = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getCustomFields(id);
    dispatch(setVehicleCustomField(response.data));
}

export const loadVehicleDepreciationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getDepreciationDetails(id);
    dispatch(setVehicleDepreciationDetail(response.data));
}

export const loadVehicleDocumentAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getDocumentAttachments(id);
    dispatch(setVehicleDocumentAttachment(response.data));
}

export const loadVehicleEngineHistory = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getEngineHistory(id);
    dispatch(setVehicleEngineHistory(response.data));
}

export const loadVehicleFuelMonitoring = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getFuelMonitoring(id);
    dispatch(setVehicleFuelMonitoring(response.data));
}

export const loadVehicleFullInfo = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getFullInfo(id);
    dispatch(setVehicle(response.data));
}

export const loadVehicleImageAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getImageAttachments(id);
    dispatch(setVehicleImageAttachment(response.data));
}

export const loadVehicleLinkedAssets = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getLinkedAssets(id);
    dispatch(setVehicleLinkedAsset(response.data));
}

export const loadVehicleLinkedAssetsOnEdit = (
    id: UrlParam,
  ): ReduxThunk<Promise<AxiosResponse<VehicleLinkedAsset[]>>> => async (_, getState) => {
    const response = await vehicleService.getLinkedAssets(id);
    return response.data;
  };

export const loadVehicleOdometerHistory = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getOdometerHistory(id);
    dispatch(setVehicleOdometerHistory(response.data));
}

export const loadVehicleRegistrationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getRegistrationDetail(id);
    dispatch(setVehicleRegistrationDetail(response.data));
}

export const loadVehicleWarrantyDetails = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getWarrantyDetail(id);
    dispatch(setVehicleWarrantyDetail(response.data));
}

export const loadVehicleTransactionHistory  = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await vehicleService.getTransactionHistory(id);
    dispatch(setVehicleTransactionHistory(response.data));
  }

export const submitVehicle = (vehicle: Vehicle): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitVehiclePayload(vehicle);
}

export const submitVehicleAssetLinked = (assetLinked: AssetLinked): ReduxThunk<Promise<AxiosResponse<VehicleLinkedAsset[]>>> => async (_, getState) => {
    return submitVehicleAssetLinkedPayload(assetLinked);
}

export const submitVehicleAssetLinkedPayload = async (payload: AssetLinked): Promise<AxiosResponse<VehicleLinkedAsset[]>> => {
    const requestToServer = vehicleService.postAssetLinked;
    return requestToServer(payload);
}

export const submitVehiclePayload = async (payload: Vehicle): Promise<AxiosResponse> => {
    const requestToServer = payload.id ? vehicleService.patch : vehicleService.post;
    return requestToServer(payload);
}

export const submitVehicleGridDetails = (vehicleId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Armour Detail
    //Process the saving of armour details when it is being attached
    if(state.vehicleArmourDetailReducer.current !== undefined) {
        if (state.vehicleArmourDetailReducer.current.length > 0) {
            await submitVehicleArmourDetailsPayload(vehicleId, state.vehicleArmourDetailReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleArmourDetails(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Armour Detail

     //Start - Custom Fields
    //Process the saving of custom fields when it is being attached
    if(state.vehicleCustomFieldReducer.current !== undefined) {
        if (state.vehicleCustomFieldReducer.current.length > 0) {
            await submitVehicleCustomFieldsPayload(vehicleId, state.vehicleCustomFieldReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleCustomFields(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Custom Fields


    //Start - Depreciation Detail
    //Process the saving of armour details when it is being attached
    if(state.vehicleDepreciationDetailReducer.current !== undefined) {
        if (state.vehicleDepreciationDetailReducer.current.length > 0) {
            await submitVehicleDepreciationDetailsPayload(vehicleId, state.vehicleDepreciationDetailReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleDepreciationDetails(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Depreciation Detail

    //Start - Document Attachment
    //Process the saving of document attachment when it is being attached
    if(state.vehicleDocumentAttachmentReducer.current !== undefined) {
        if (state.vehicleDocumentAttachmentReducer.current.length > 0) {
            await submitVehicleDocumentAttachmentsPayload(vehicleId, state.vehicleDocumentAttachmentReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleDocuments(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Document Attachment

    //Start - Engine History
    //Process the saving of engine history when it is being attached
    if(state.vehicleEngineHistoryReducer.current !== undefined) {
        if (state.vehicleEngineHistoryReducer.current.length > 0) {
            await submitVehicleEngineHistoryPayload(vehicleId, state.vehicleEngineHistoryReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleEngineHistory(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Engine History

    //Start - Fuel Monitoring
    //Process the saving of fuel monitoring when it is being attached
    if(state.vehicleFuelMonitoringReducer.current !== undefined) {
        if (state.vehicleFuelMonitoringReducer.current.length > 0) {
            await submitVehicleFuelMonitoringPayload(vehicleId, state.vehicleFuelMonitoringReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleFuelMonitoring(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Fuel Monitoring

    //Start - Image Attachment
    //Process the saving of image attachment when it is being attached
    if(state.vehicleImageAttachmentReducer.current !== undefined) {
        if (state.vehicleImageAttachmentReducer.current.length > 0) {
            await submitVehicleImageAttachmentPayload(vehicleId, state.vehicleImageAttachmentReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleImages(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Image Attachment

    //Start - Odometer History
    //Process the saving of odometer history when it is being attached
    if(state.vehicleOdometerHistoryReducer.current !== undefined) {
        if (state.vehicleOdometerHistoryReducer.current.length > 0) {
            await submitVehicleOdometerHistoryPayload(vehicleId, state.vehicleOdometerHistoryReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleOdometerHistory(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Odometer History

    //Start - Linked Assets
    if(state.vehicleLinkedAssetReducer.current !== undefined) {
        if (state.vehicleLinkedAssetReducer.current.length > 0) {
            await submitVehicleLinkedAssetPayload(vehicleId, state.vehicleLinkedAssetReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleLinkedAssets(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });

        }
    }
    //End - Linked Assets

    //Start - Registration Detail
    //Process the saving of registration detail when it is being attached
    if(state.vehicleRegistrationDetailReducer.current !== undefined) {
        if (state.vehicleRegistrationDetailReducer.current.length > 0) {
            await submitVehicleRegistrationDetailsPayload(vehicleId, state.vehicleRegistrationDetailReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleRegistrationDetails(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Registration Detail

    //Start - Warranty detail
    //Process the saving of warranty detail when it is being attached
    if(state.vehicleWarrantyDetailReducer.current !== undefined) {
        if (state.vehicleWarrantyDetailReducer.current.length > 0) {
            await submitVehicleWarrantyDetailsPayload(vehicleId, state.vehicleWarrantyDetailReducer.current)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            await deleteVehicleWarrantyDetails(vehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    }   
    //End - Warranty detail
}

export const submitVehicleArmourDetailsPayload = async (vehicleId: number, payload: VehicleArmourDetail[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postArmourDetails : vehicleService.patchArmourDetails;
    return requestToServer(vehicleId, payload);
};

export const submitVehicleCustomFieldsPayload = async (vehicleId: number, payload: VehicleCustomField[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.vehicleId >= 1);
    const requestToServer = indx === -1 ? vehicleService.postCustomFields : vehicleService.patchCustomFields;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleDepreciationDetailsPayload = async (vehicleId: number, payload: VehicleDepreciationDetail[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postDepreciationDetails : vehicleService.patchDepreciationDetails;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleDocumentAttachmentsPayload = async (vehicleId: number, payload: VehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postDocumentAttachments : vehicleService.patchDocumentAttachments;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleEngineHistoryPayload = async (vehicleId: number, payload: VehicleEngineHistory[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postEngineHistory : vehicleService.patchEngineHistory;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleFuelMonitoringPayload = async (vehicleId: number, payload: VehicleFuelMonitoring[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postFuelMonitoring : vehicleService.patchFuelMonitoring;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleImageAttachmentPayload = async (vehicleId: number, payload: VehicleImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postImageAttachment : vehicleService.patchImageAttachment;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleLinkedAssetPayload = async (vehicleId: number, payload: VehicleLinkedAsset[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postLinkedAsset : vehicleService.patchLinkedAsset;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleOdometerHistoryPayload = async (vehicleId: number, payload: VehicleOdometerHistory[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postOdometerHistory : vehicleService.patchOdometerHistory;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleRegistrationDetailsPayload = async (vehicleId: number, payload: VehicleRegistrationDetail[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postRegistrationDetail : vehicleService.patchRegistrationDetail;
    return requestToServer(vehicleId, payload);
}

export const submitVehicleWarrantyDetailsPayload = async (vehicleId: number, payload: VehicleWarrantyDetail[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? vehicleService.postWarrantyDetail : vehicleService.patchWarrantyDetail;
    return requestToServer(vehicleId, payload);
}





