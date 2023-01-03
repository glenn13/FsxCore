import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import EstimateVehicle from '@app/entities/maintenance/estimate/EstimateVehicle';
import EstimateVehicleAdditionalCharge from '@app/entities/maintenance/estimate/EstimateVehicleAdditionalCharge';
import EstimateVehicleDocumentAttachment from '@app/entities/maintenance/estimate/EstimateVehicleDocumentAttachment';
import EstimateVehicleImageAttachment from '@app/entities/maintenance/estimate/EstimateVehicleImageAttachment';
import EstimateVehicleMaterial from '@app/entities/maintenance/estimate/EstimateVehicleMaterial';

import { setVehicle, setEstimateVehicle } from './vehicle.reducers';
import { setEstimateVehicleAdditionalCharges } from './vehicleAdditionalCharge.reducers';
import { setEstimateVehicleCustomerDetail } from './vehicleCustomerDetail.reducers';
import { setEstimateVehicleDate } from './vehicleDate.reducers';
import { setEstimateVehicleDocumentAttachments } from './vehicleDocumentAttachment.reducers';
import { setEstimateVehicleImageAttachments } from './vehicleImageAttachment.reducers';
import { setEstimateVehicleMaterials } from './vehicleMaterial.reducers';
import { setEstimateVehicleTotal } from './vehicleTotal.reducers';

import estimateVehicleService, {
    getEstimateVehicleAdditionalCharges
    , getEstimateVehicleDocumentAttachments
    , getEstimateVehicleFullInfo
    , getEstimateVehicleImageAttachments
    , getEstimateVehicleMaterials
} from '@app/services/maintenance/estimatevehicle.service';

export const loadEstimateVehicle = (id: number | string): ReduxThunk => async dispatch => {
    const { data: estimateVehicleFullInfo } = await getEstimateVehicleFullInfo(id);

    dispatch(setEstimateVehicle(estimateVehicleFullInfo));

    if (estimateVehicleFullInfo.estimateVehicleCustomerDetails) dispatch(setEstimateVehicleCustomerDetail(estimateVehicleFullInfo.estimateVehicleCustomerDetails));
    if (estimateVehicleFullInfo.estimateVehicleDate) dispatch(setEstimateVehicleDate(estimateVehicleFullInfo.estimateVehicleDate));
    if (estimateVehicleFullInfo.estimateVehicleTotal) dispatch(setEstimateVehicleTotal(estimateVehicleFullInfo.estimateVehicleTotal));
    if (estimateVehicleFullInfo.vehicle) dispatch(setVehicle(estimateVehicleFullInfo.vehicle));
};

export const loadEstimateVehicleAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateVehicleAdditionalCharges(id);
    dispatch(setEstimateVehicleAdditionalCharges(response.data));
};

export const loadEstimateVehicleDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateVehicleDocumentAttachments(id);
    dispatch(setEstimateVehicleDocumentAttachments(response.data));
};

export const loadEstimateVehicleImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateVehicleImageAttachments(id);
    dispatch(setEstimateVehicleImageAttachments(response.data));
};

export const loadEstimateVehicleMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateVehicleMaterials(id);
    dispatch(setEstimateVehicleMaterials(response.data));
};

export const submitEstimateVehicle = (estimateVehicle: EstimateVehicle): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitEstimateVehiclePayload(estimateVehicle);
}

export const submitEstimateVehicleGridDetails = (estimateVehicleId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.estimateVehicleAdditionalChargeReducer.length > 0) {
        await submitEstimateVehicleAdditionalChargesPayload(estimateVehicleId, state.estimateVehicleAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteEstimateVehicleAdditionalCharges(estimateVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.estimateVehicleDocumentAttachmentReducer.length > 0) {
        submitEstimateVehicleDocumentsPayload(estimateVehicleId, state.estimateVehicleDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateVehicleDocuments(estimateVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.estimateVehicleImageAttachmentReducer.length > 0) {
        submitEstimateVehicleImagesPayload(estimateVehicleId, state.estimateVehicleImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateVehicleImages(estimateVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.estimateVehicleMaterialReducer.length > 0) {
        submitEstimateVehicleMaterialsPayload(estimateVehicleId, state.estimateVehicleMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateVehicleMaterials(estimateVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitEstimateVehiclePayload = async (payload: EstimateVehicle): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? estimateVehicleService.patch
        : estimateVehicleService.post;

    return requestToServer(payload);
};

export const submitEstimateVehicleAdditionalChargesPayload = async (varEstimateVehicleId: number, payload: EstimateVehicleAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateVehicleService.postAdditionalCharges : estimateVehicleService.patchAdditionalCharges;

    return requestToServer(varEstimateVehicleId, payload);
}

export const submitEstimateVehicleDocumentsPayload = async (varEstimateVehicleId: number, payload: EstimateVehicleDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateVehicleService.postDocuments : estimateVehicleService.patchDocuments;

    return requestToServer(varEstimateVehicleId, payload);
}

export const submitEstimateVehicleImagesPayload = async (varEstimateVehicleId: number, payload: EstimateVehicleImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateVehicleService.postImages : estimateVehicleService.patchImages;

    return requestToServer(varEstimateVehicleId, payload);
}

export const submitEstimateVehicleMaterialsPayload = async (varEstimateVehicleId: number, payload: EstimateVehicleMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateVehicleService.postMaterials : estimateVehicleService.patchMaterials;

    return requestToServer(varEstimateVehicleId, payload);
}

export const deleteEstimateVehicleAdditionalCharges = async (varEstimateVehicleId: number): Promise<AxiosResponse> => {
    const requestToServer = estimateVehicleService.deleteAdditionalCharges(varEstimateVehicleId);
    return requestToServer;
}

export const deleteEstimateVehicleDocuments = async (varEstimateVehicleId: number): Promise<AxiosResponse> => {
    return estimateVehicleService.deleteDocuments(varEstimateVehicleId);
}

export const deleteEstimateVehicleImages = async (varEstimateVehicleId: number): Promise<AxiosResponse> => {
    return estimateVehicleService.deleteImages(varEstimateVehicleId);
}

export const deleteEstimateVehicleMaterials = async (varEstimateVehicleId: number): Promise<AxiosResponse> => {
    return estimateVehicleService.deleteMaterials(varEstimateVehicleId);
}
