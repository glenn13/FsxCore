import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import EstimateComponent from '@app/entities/maintenance/estimate/EstimateComponent';
import EstimateComponentAdditionalCharge from '@app/entities/maintenance/estimate/EstimateComponentAdditionalCharge';
import EstimateComponentDocumentAttachment from '@app/entities/maintenance/estimate/EstimateComponentDocumentAttachment';
import EstimateComponentImageAttachment from '@app/entities/maintenance/estimate/EstimateComponentImageAttachment';
import EstimateComponentMaterial from '@app/entities/maintenance/estimate/EstimateComponentMaterial';

import { setComponent, setEstimateComponent } from './component.reducers';
import { setEstimateComponentAdditionalCharges } from './componentAdditionalCharge.reducers';
import { setEstimateComponentCustomerDetail } from './componentCustomerDetail.reducers';
import { setEstimateComponentDate } from './componentDate.reducers';
import { setEstimateComponentDocumentAttachments } from './componentDocumentAttachment.reducers';
import { setEstimateComponentImageAttachments } from './componentImageAttachment.reducers';
import { setEstimateComponentMaterials } from './componentMaterial.reducers';
import { setEstimateComponentTotal } from './componentTotal.reducers';

import estimateComponentService, {
    getEstimateComponentAdditionalCharges
    , getEstimateComponentDocumentAttachments
    , getEstimateComponentFullInfo
    , getEstimateComponentImageAttachments
    , getEstimateComponentMaterials
} from '@app/services/maintenance/estimatecomponent.service';

export const loadEstimateComponent = (id: number | string): ReduxThunk => async dispatch => {
    const { data: estimateComponentFullInfo } = await getEstimateComponentFullInfo(id);

    dispatch(setEstimateComponent(estimateComponentFullInfo));

    if (estimateComponentFullInfo.estimateComponentCustomerDetails) dispatch(setEstimateComponentCustomerDetail(estimateComponentFullInfo.estimateComponentCustomerDetails));
    if (estimateComponentFullInfo.estimateComponentDate) dispatch(setEstimateComponentDate(estimateComponentFullInfo.estimateComponentDate));
    if (estimateComponentFullInfo.estimateComponentTotal) dispatch(setEstimateComponentTotal(estimateComponentFullInfo.estimateComponentTotal));
    if (estimateComponentFullInfo.component) dispatch(setComponent(estimateComponentFullInfo.component));
};

export const loadEstimateComponentAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateComponentAdditionalCharges(id);
    dispatch(setEstimateComponentAdditionalCharges(response.data));
};

export const loadEstimateComponentDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateComponentDocumentAttachments(id);
    dispatch(setEstimateComponentDocumentAttachments(response.data));
};

export const loadEstimateComponentImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateComponentImageAttachments(id);
    dispatch(setEstimateComponentImageAttachments(response.data));
};

export const loadEstimateComponentMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateComponentMaterials(id);
    dispatch(setEstimateComponentMaterials(response.data));
};

export const submitEstimateComponent = (estimateComponent: EstimateComponent): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitEstimateComponentPayload(estimateComponent);
}

export const submitEstimateComponentGridDetails = (estimateComponentId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.estimateComponentAdditionalChargeReducer.length > 0) {
        await submitEstimateComponentAdditionalChargesPayload(estimateComponentId, state.estimateComponentAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteEstimateComponentAdditionalCharges(estimateComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.estimateComponentDocumentAttachmentReducer.length > 0) {
        submitEstimateComponentDocumentsPayload(estimateComponentId, state.estimateComponentDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateComponentDocuments(estimateComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.estimateComponentImageAttachmentReducer.length > 0) {
        submitEstimateComponentImagesPayload(estimateComponentId, state.estimateComponentImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateComponentImages(estimateComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.estimateComponentMaterialReducer.length > 0) {
        submitEstimateComponentMaterialsPayload(estimateComponentId, state.estimateComponentMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateComponentMaterials(estimateComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitEstimateComponentPayload = async (payload: EstimateComponent): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? estimateComponentService.patch
        : estimateComponentService.post;

    return requestToServer(payload);
};

export const submitEstimateComponentAdditionalChargesPayload = async (varEstimateComponentId: number, payload: EstimateComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateComponentService.postAdditionalCharges : estimateComponentService.patchAdditionalCharges;

    return requestToServer(varEstimateComponentId, payload);
}

export const submitEstimateComponentDocumentsPayload = async (varEstimateComponentId: number, payload: EstimateComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateComponentService.postDocuments : estimateComponentService.patchDocuments;

    return requestToServer(varEstimateComponentId, payload);
}

export const submitEstimateComponentImagesPayload = async (varEstimateComponentId: number, payload: EstimateComponentImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateComponentService.postImages : estimateComponentService.patchImages;

    return requestToServer(varEstimateComponentId, payload);
}

export const submitEstimateComponentMaterialsPayload = async (varEstimateComponentId: number, payload: EstimateComponentMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateComponentService.postMaterials : estimateComponentService.patchMaterials;

    return requestToServer(varEstimateComponentId, payload);
}

export const deleteEstimateComponentAdditionalCharges = async (varEstimateComponentId: number): Promise<AxiosResponse> => {
    const requestToServer = estimateComponentService.deleteAdditionalCharges(varEstimateComponentId);
    return requestToServer;
}

export const deleteEstimateComponentDocuments = async (varEstimateComponentId: number): Promise<AxiosResponse> => {
    return estimateComponentService.deleteDocuments(varEstimateComponentId);
}

export const deleteEstimateComponentImages = async (varEstimateComponentId: number): Promise<AxiosResponse> => {
    return estimateComponentService.deleteImages(varEstimateComponentId);
}

export const deleteEstimateComponentMaterials = async (varEstimateComponentId: number): Promise<AxiosResponse> => {
    return estimateComponentService.deleteMaterials(varEstimateComponentId);
}
