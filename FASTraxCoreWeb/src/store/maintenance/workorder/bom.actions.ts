import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import WorkOrderBOM from '@app/entities/maintenance/workorder/WorkOrderBOM';
import WorkOrderBOMAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderBOMAdditionalCharge';
import WorkOrderBOMDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMDocumentAttachment';
import WorkOrderBOMImageAttachment from '@app/entities/maintenance/workorder/WorkOrderBOMImageAttachment';
import WorkOrderBOMMaterial from '@app/entities/maintenance/workorder/WorkOrderBOMMaterial';


import { setWorkOrderBOMAdditionalCharges } from './bomAdditionalCharge.reducers';
import { setWorkOrderBOMCustomerDetail } from './bomCustomerDetail.reducers';
import { setWorkOrderBOMDate } from './bomDate.reducers';
import { setWorkOrderBOMDocumentAttachments } from './bomDocumentAttachment.reducers';
import { setWorkOrderBOMImageAttachments } from './bomImageAttachment.reducers';
import { setWorkOrderBOMLabours } from './bomLabour.reducers';
import { setWorkOrderBOMMaterials } from './bomMaterial.reducers';
import { setWorkOrderBOMTotal } from './bomTotal.reducers';

import workOrderBOMService, {
    getWorkOrderBOMAdditionalCharges
    , getWorkOrderBOMDocumentAttachments
    , getWorkOrderBOMFullInfo
    , getWorkOrderBOMImageAttachments
    , getWorkOrderBOMLabours
    , getWorkOrderBOMMaterials
} from '@app/services/maintenance/workorderbom.service';

export const loadWorkOrderBOM = (id: number | string): ReduxThunk => async dispatch => {
    const { data: workOrderBOMFullInfo } = await getWorkOrderBOMFullInfo(id);

    if (workOrderBOMFullInfo.workOrderBOMCustomerDetails) dispatch(setWorkOrderBOMCustomerDetail(workOrderBOMFullInfo.workOrderBOMCustomerDetails));
    if (workOrderBOMFullInfo.workOrderBOMDate) dispatch(setWorkOrderBOMDate(workOrderBOMFullInfo.workOrderBOMDate));
    if (workOrderBOMFullInfo.workOrderBOMTotal) dispatch(setWorkOrderBOMTotal(workOrderBOMFullInfo.workOrderBOMTotal));
};

export const loadWorkOrderBOMAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderBOMAdditionalCharges(id);
    dispatch(setWorkOrderBOMAdditionalCharges(response.data));
};

export const loadWorkOrderBOMDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderBOMDocumentAttachments(id);
    dispatch(setWorkOrderBOMDocumentAttachments(response.data));
};

export const loadWorkOrderBOMImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderBOMImageAttachments(id);
    dispatch(setWorkOrderBOMImageAttachments(response.data));
};

export const loadWorkOrderBOMLabours = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderBOMLabours(id);
    dispatch(setWorkOrderBOMLabours(response.data));
};

export const loadWorkOrderBOMMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderBOMMaterials(id);
    dispatch(setWorkOrderBOMMaterials(response.data));
};

export const submitWorkOrderBOM = (workOrderBOM: WorkOrderBOM): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitWorkOrderBOMPayload(workOrderBOM);
}

export const submitWorkOrderBOMGridDetails = (workOrderBOMId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.workOrderBOMAdditionalChargeReducer.length > 0) {
        await submitWorkOrderBOMAdditionalChargesPayload(workOrderBOMId, state.workOrderBOMAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteWorkOrderBOMAdditionalCharges(workOrderBOMId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.workOrderBOMDocumentAttachmentReducer.length > 0) {
        submitWorkOrderBOMDocumentsPayload(workOrderBOMId, state.workOrderBOMDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderBOMDocuments(workOrderBOMId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.workOrderBOMImageAttachmentReducer.length > 0) {
        submitWorkOrderBOMImagesPayload(workOrderBOMId, state.workOrderBOMImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderBOMImages(workOrderBOMId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.workOrderBOMMaterialReducer.length > 0) {
        submitWorkOrderBOMMaterialsPayload(workOrderBOMId, state.workOrderBOMMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderBOMMaterials(workOrderBOMId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitWorkOrderBOMPayload = async (payload: WorkOrderBOM): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? workOrderBOMService.patch
        : workOrderBOMService.post;

    return requestToServer(payload);
};

export const submitWorkOrderBOMAdditionalChargesPayload = async (varWorkOrderBOMId: number, payload: WorkOrderBOMAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderBOMService.postAdditionalCharges : workOrderBOMService.patchAdditionalCharges;

    return requestToServer(varWorkOrderBOMId, payload);
}

export const submitWorkOrderBOMDocumentsPayload = async (varWorkOrderBOMId: number, payload: WorkOrderBOMDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderBOMService.postDocuments : workOrderBOMService.patchDocuments;

    return requestToServer(varWorkOrderBOMId, payload);
}

export const submitWorkOrderBOMImagesPayload = async (varWorkOrderBOMId: number, payload: WorkOrderBOMImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderBOMService.postImages : workOrderBOMService.patchImages;

    return requestToServer(varWorkOrderBOMId, payload);
}

export const submitWorkOrderBOMMaterialsPayload = async (varWorkOrderBOMId: number, payload: WorkOrderBOMMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderBOMService.postMaterials : workOrderBOMService.patchMaterials;

    return requestToServer(varWorkOrderBOMId, payload);
}

export const deleteWorkOrderBOMAdditionalCharges = async (varWorkOrderBOMId: number): Promise<AxiosResponse> => {
    const requestToServer = workOrderBOMService.deleteAdditionalCharges(varWorkOrderBOMId);
    return requestToServer;
}

export const deleteWorkOrderBOMDocuments = async (varWorkOrderBOMId: number): Promise<AxiosResponse> => {
    return workOrderBOMService.deleteDocuments(varWorkOrderBOMId);
}

export const deleteWorkOrderBOMImages = async (varWorkOrderBOMId: number): Promise<AxiosResponse> => {
    return workOrderBOMService.deleteImages(varWorkOrderBOMId);
}

export const deleteWorkOrderBOMMaterials = async (varWorkOrderBOMId: number): Promise<AxiosResponse> => {
    return workOrderBOMService.deleteMaterials(varWorkOrderBOMId);
}
