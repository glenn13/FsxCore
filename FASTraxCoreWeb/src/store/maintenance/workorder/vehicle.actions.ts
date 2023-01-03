import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import WorkOrderVehicle from '@app/entities/maintenance/workorder/WorkOrderVehicle';
import WorkOrderVehicleAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderVehicleAdditionalCharge';
import WorkOrderVehicleDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleDocumentAttachment';
import WorkOrderVehicleImageAttachment from '@app/entities/maintenance/workorder/WorkOrderVehicleImageAttachment';
import WorkOrderVehicleMaterial from '@app/entities/maintenance/workorder/WorkOrderVehicleMaterial';

import { setVehicle, setWorkOrderVehicle } from './vehicle.reducers';
import { setWorkOrderVehicleAdditionalCharges } from './vehicleAdditionalCharge.reducers';
import { setWorkOrderVehicleCustomerDetail } from './vehicleCustomerDetail.reducers';
import { setWorkOrderVehicleDate } from './vehicleDate.reducers';
import { setWorkOrderVehicleDocumentAttachments } from './vehicleDocumentAttachment.reducers';
import { setWorkOrderVehicleImageAttachments } from './vehicleImageAttachment.reducers';
import { setWorkOrderVehicleLabours } from './vehicleLabour.reducers';
import { setWorkOrderVehicleMaterials } from './vehicleMaterial.reducers';
import { setWorkOrderVehicleMobileService } from './vehicleMobileService.reducers';
import { setWorkOrderVehicleTotal } from './vehicleTotal.reducers';

import workOrderVehicleService, {
    getWorkOrderVehicleAdditionalCharges
    , getWorkOrderVehicleDocumentAttachments
    , getWorkOrderVehicleFullInfo
    , getWorkOrderVehicleImageAttachments
    , getWorkOrderVehicleLabours
    , getWorkOrderVehicleMaterials
} from '@app/services/maintenance/workordervehicle.service';

export const loadWorkOrderVehicle = (id: number | string): ReduxThunk => async dispatch => {
    const { data: workOrderVehicleFullInfo } = await getWorkOrderVehicleFullInfo(id);

    dispatch(setWorkOrderVehicle(workOrderVehicleFullInfo));

    if (workOrderVehicleFullInfo.workOrderVehicleCustomerDetails) dispatch(setWorkOrderVehicleCustomerDetail(workOrderVehicleFullInfo.workOrderVehicleCustomerDetails));
    if (workOrderVehicleFullInfo.workOrderVehicleDate) dispatch(setWorkOrderVehicleDate(workOrderVehicleFullInfo.workOrderVehicleDate));
    if (workOrderVehicleFullInfo.workOrderVehicleMobileService) dispatch(setWorkOrderVehicleMobileService(workOrderVehicleFullInfo.workOrderVehicleMobileService));
    if (workOrderVehicleFullInfo.workOrderVehicleTotal) dispatch(setWorkOrderVehicleTotal(workOrderVehicleFullInfo.workOrderVehicleTotal));
    // if (workOrderVehicleFullInfo.vehicle) dispatch(setVehicle(workOrderVehicleFullInfo.vehicle));
};

export const loadWorkOrderVehicleAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderVehicleAdditionalCharges(id);
    dispatch(setWorkOrderVehicleAdditionalCharges(response.data));
};

export const loadWorkOrderVehicleDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderVehicleDocumentAttachments(id);
    dispatch(setWorkOrderVehicleDocumentAttachments(response.data));
};

export const loadWorkOrderVehicleImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderVehicleImageAttachments(id);
    dispatch(setWorkOrderVehicleImageAttachments(response.data));
};

export const loadWorkOrderVehicleLabours = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderVehicleLabours(id);
    dispatch(setWorkOrderVehicleLabours(response.data));
};

export const loadWorkOrderVehicleMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderVehicleMaterials(id);
    dispatch(setWorkOrderVehicleMaterials(response.data));
};

export const submitWorkOrderVehicle = (workOrderVehicle: WorkOrderVehicle): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitWorkOrderVehiclePayload(workOrderVehicle);
}

export const submitWorkOrderVehicleDetails = (workOrderVehicleId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.workOrderVehicleAdditionalChargeReducer.length > 0) {
        await submitWorkOrderVehicleAdditionalChargesPayload(workOrderVehicleId, state.workOrderVehicleAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteWorkOrderVehicleAdditionalCharges(workOrderVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.workOrderVehicleDocumentAttachmentReducer.length > 0) {
        submitWorkOrderVehicleDocumentsPayload(workOrderVehicleId, state.workOrderVehicleDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderVehicleDocuments(workOrderVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.workOrderVehicleImageAttachmentReducer.length > 0) {
        submitWorkOrderVehicleImagesPayload(workOrderVehicleId, state.workOrderVehicleImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderVehicleImages(workOrderVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.workOrderVehicleMaterialReducer.length > 0) {
        submitWorkOrderVehicleMaterialsPayload(workOrderVehicleId, state.workOrderVehicleMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderVehicleMaterials(workOrderVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitWorkOrderVehiclePayload = async (payload: WorkOrderVehicle): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? workOrderVehicleService.patch
        : workOrderVehicleService.post;

    return requestToServer(payload);
};

export const submitWorkOrderVehicleAdditionalChargesPayload = async (varWorkOrderVehicleId: number, payload: WorkOrderVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderVehicleService.postAdditionalCharges : workOrderVehicleService.patchAdditionalCharges;

    return requestToServer(varWorkOrderVehicleId, payload);
}

export const submitWorkOrderVehicleDocumentsPayload = async (varWorkOrderVehicleId: number, payload: WorkOrderVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderVehicleService.postDocuments : workOrderVehicleService.patchDocuments;

    return requestToServer(varWorkOrderVehicleId, payload);
}

export const submitWorkOrderVehicleImagesPayload = async (varWorkOrderVehicleId: number, payload: WorkOrderVehicleImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderVehicleService.postImages : workOrderVehicleService.patchImages;

    return requestToServer(varWorkOrderVehicleId, payload);
}

export const submitWorkOrderVehicleMaterialsPayload = async (varWorkOrderVehicleId: number, payload: WorkOrderVehicleMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderVehicleService.postMaterials : workOrderVehicleService.patchMaterials;

    return requestToServer(varWorkOrderVehicleId, payload);
}

export const deleteWorkOrderVehicleAdditionalCharges = async (varWorkOrderVehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = workOrderVehicleService.deleteAdditionalCharges(varWorkOrderVehicleId);
    return requestToServer;
}

export const deleteWorkOrderVehicleDocuments = async (varWorkOrderVehicleId: number): Promise<AxiosResponse> => {
    return workOrderVehicleService.deleteDocuments(varWorkOrderVehicleId);
}

export const deleteWorkOrderVehicleImages = async (varWorkOrderVehicleId: number): Promise<AxiosResponse> => {
    return workOrderVehicleService.deleteImages(varWorkOrderVehicleId);
}

export const deleteWorkOrderVehicleMaterials = async (varWorkOrderVehicleId: number): Promise<AxiosResponse> => {
    return workOrderVehicleService.deleteMaterials(varWorkOrderVehicleId);
}
