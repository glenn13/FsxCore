import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import WorkOrderGeneralAsset from '@app/entities/maintenance/workorder/WorkOrderGeneralAsset';
import WorkOrderGeneralAssetAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetAdditionalCharge';
import WorkOrderGeneralAssetDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetDocumentAttachment';
import WorkOrderGeneralAssetImageAttachment from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetImageAttachment';
import WorkOrderGeneralAssetMaterial from '@app/entities/maintenance/workorder/WorkOrderGeneralAssetMaterial';

import { setGeneralAsset, setWorkOrderGeneralAsset } from './generalAsset.reducers';
import { setWorkOrderGeneralAssetAdditionalCharges } from './generalAssetAdditionalCharge.reducers';
import { setWorkOrderGeneralAssetCustomerDetail } from './generalAssetCustomerDetail.reducers';
import { setWorkOrderGeneralAssetDate } from './generalAssetDate.reducers';
import { setWorkOrderGeneralAssetDocumentAttachments } from './generalAssetDocumentAttachment.reducers';
import { setWorkOrderGeneralAssetImageAttachments } from './generalAssetImageAttachment.reducers';
import { setWorkOrderGeneralAssetLabours } from './generalAssetLabour.reducers';
import { setWorkOrderGeneralAssetMaterials } from './generalAssetMaterial.reducers';
import { setWorkOrderGeneralAssetMobileService } from './generalAssetMobileService.reducers';
import { setWorkOrderGeneralAssetTotal } from './generalAssetTotal.reducers';

import workOrderGeneralAssetService, {
    getWorkOrderGeneralAssetAdditionalCharges
    , getWorkOrderGeneralAssetDocumentAttachments
    , getWorkOrderGeneralAssetFullInfo
    , getWorkOrderGeneralAssetImageAttachments
    , getWorkOrderGeneralAssetLabours
    , getWorkOrderGeneralAssetMaterials
} from '@app/services/maintenance/workordergeneralasset.service';

export const loadWorkOrderGeneralAsset = (id: number | string): ReduxThunk => async dispatch => {
    const { data: workOrderGeneralAssetFullInfo } = await getWorkOrderGeneralAssetFullInfo(id);

    dispatch(setWorkOrderGeneralAsset(workOrderGeneralAssetFullInfo));

    if (workOrderGeneralAssetFullInfo.workOrderGeneralAssetCustomerDetails) dispatch(setWorkOrderGeneralAssetCustomerDetail(workOrderGeneralAssetFullInfo.workOrderGeneralAssetCustomerDetails));
    if (workOrderGeneralAssetFullInfo.workOrderGeneralAssetDate) dispatch(setWorkOrderGeneralAssetDate(workOrderGeneralAssetFullInfo.workOrderGeneralAssetDate));
    if (workOrderGeneralAssetFullInfo.workOrderGeneralAssetMobileService) dispatch(setWorkOrderGeneralAssetMobileService(workOrderGeneralAssetFullInfo.workOrderGeneralAssetMobileService));
    if (workOrderGeneralAssetFullInfo.workOrderGeneralAssetTotal) dispatch(setWorkOrderGeneralAssetTotal(workOrderGeneralAssetFullInfo.workOrderGeneralAssetTotal));
    // if (workOrderGeneralAssetFullInfo.generalAsset) dispatch(setGeneralAsset(workOrderGeneralAssetFullInfo.generalAsset));
};

export const loadWorkOrderGeneralAssetAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderGeneralAssetAdditionalCharges(id);
    dispatch(setWorkOrderGeneralAssetAdditionalCharges(response.data));
};

export const loadWorkOrderGeneralAssetDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderGeneralAssetDocumentAttachments(id);
    dispatch(setWorkOrderGeneralAssetDocumentAttachments(response.data));
};

export const loadWorkOrderGeneralAssetImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderGeneralAssetImageAttachments(id);
    dispatch(setWorkOrderGeneralAssetImageAttachments(response.data));
};

export const loadWorkOrderGeneralAssetLabours = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderGeneralAssetLabours(id);
    dispatch(setWorkOrderGeneralAssetLabours(response.data));
};

export const loadWorkOrderGeneralAssetMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderGeneralAssetMaterials(id);
    dispatch(setWorkOrderGeneralAssetMaterials(response.data));
};

export const submitWorkOrderGeneralAsset = (workOrderGeneralAsset: WorkOrderGeneralAsset): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitWorkOrderGeneralAssetPayload(workOrderGeneralAsset);
}

export const submitWorkOrderGeneralAssetDetails = (workOrderGeneralAssetId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.workOrderGeneralAssetAdditionalChargeReducer.length > 0) {
        await submitWorkOrderGeneralAssetAdditionalChargesPayload(workOrderGeneralAssetId, state.workOrderGeneralAssetAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteWorkOrderGeneralAssetAdditionalCharges(workOrderGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.workOrderGeneralAssetDocumentAttachmentReducer.length > 0) {
        submitWorkOrderGeneralAssetDocumentsPayload(workOrderGeneralAssetId, state.workOrderGeneralAssetDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderGeneralAssetDocuments(workOrderGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.workOrderGeneralAssetImageAttachmentReducer.length > 0) {
        submitWorkOrderGeneralAssetImagesPayload(workOrderGeneralAssetId, state.workOrderGeneralAssetImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderGeneralAssetImages(workOrderGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.workOrderGeneralAssetMaterialReducer.length > 0) {
        submitWorkOrderGeneralAssetMaterialsPayload(workOrderGeneralAssetId, state.workOrderGeneralAssetMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderGeneralAssetMaterials(workOrderGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitWorkOrderGeneralAssetPayload = async (payload: WorkOrderGeneralAsset): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? workOrderGeneralAssetService.patch
        : workOrderGeneralAssetService.post;

    return requestToServer(payload);
};

export const submitWorkOrderGeneralAssetAdditionalChargesPayload = async (varWorkOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderGeneralAssetService.postAdditionalCharges : workOrderGeneralAssetService.patchAdditionalCharges;

    return requestToServer(varWorkOrderGeneralAssetId, payload);
}

export const submitWorkOrderGeneralAssetDocumentsPayload = async (varWorkOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderGeneralAssetService.postDocuments : workOrderGeneralAssetService.patchDocuments;

    return requestToServer(varWorkOrderGeneralAssetId, payload);
}

export const submitWorkOrderGeneralAssetImagesPayload = async (varWorkOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderGeneralAssetService.postImages : workOrderGeneralAssetService.patchImages;

    return requestToServer(varWorkOrderGeneralAssetId, payload);
}

export const submitWorkOrderGeneralAssetMaterialsPayload = async (varWorkOrderGeneralAssetId: number, payload: WorkOrderGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderGeneralAssetService.postMaterials : workOrderGeneralAssetService.patchMaterials;

    return requestToServer(varWorkOrderGeneralAssetId, payload);
}

export const deleteWorkOrderGeneralAssetAdditionalCharges = async (varWorkOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    const requestToServer = workOrderGeneralAssetService.deleteAdditionalCharges(varWorkOrderGeneralAssetId);
    return requestToServer;
}

export const deleteWorkOrderGeneralAssetDocuments = async (varWorkOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    return workOrderGeneralAssetService.deleteDocuments(varWorkOrderGeneralAssetId);
}

export const deleteWorkOrderGeneralAssetImages = async (varWorkOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    return workOrderGeneralAssetService.deleteImages(varWorkOrderGeneralAssetId);
}

export const deleteWorkOrderGeneralAssetMaterials = async (varWorkOrderGeneralAssetId: number): Promise<AxiosResponse> => {
    return workOrderGeneralAssetService.deleteMaterials(varWorkOrderGeneralAssetId);
}
