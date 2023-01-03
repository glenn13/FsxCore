import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import EstimateGeneralAsset from '@app/entities/maintenance/estimate/EstimateGeneralAsset';
import EstimateGeneralAssetAdditionalCharge from '@app/entities/maintenance/estimate/EstimateGeneralAssetAdditionalCharge';
import EstimateGeneralAssetDocumentAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetDocumentAttachment';
import EstimateGeneralAssetImageAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetImageAttachment';
import EstimateGeneralAssetMaterial from '@app/entities/maintenance/estimate/EstimateGeneralAssetMaterial';

import { setGeneralAsset, setEstimateGeneralAsset } from './generalAsset.reducers';
import { setEstimateGeneralAssetAdditionalCharges } from './generalAssetAdditionalCharge.reducers';
import { setEstimateGeneralAssetCustomerDetail } from './generalAssetCustomerDetail.reducers';
import { setEstimateGeneralAssetDate } from './generalAssetDate.reducers';
import { setEstimateGeneralAssetDocumentAttachments } from './generalAssetDocumentAttachment.reducers';
import { setEstimateGeneralAssetImageAttachments } from './generalAssetImageAttachment.reducers';
import { setEstimateGeneralAssetMaterials } from './generalAssetMaterial.reducers';
import { setEstimateGeneralAssetTotal } from './generalAssetTotal.reducers';

import estimateGeneralAssetService, {
    getEstimateGeneralAssetAdditionalCharges
    , getEstimateGeneralAssetDocumentAttachments
    , getEstimateGeneralAssetFullInfo
    , getEstimateGeneralAssetImageAttachments
    , getEstimateGeneralAssetMaterials
} from '@app/services/maintenance/estimategeneralasset.service';

export const loadEstimateGeneralAsset = (id: number | string): ReduxThunk => async dispatch => {
    const { data: estimateGeneralAssetFullInfo } = await getEstimateGeneralAssetFullInfo(id);

    dispatch(setEstimateGeneralAsset(estimateGeneralAssetFullInfo));

    if (estimateGeneralAssetFullInfo.estimateGeneralAssetCustomerDetails) dispatch(setEstimateGeneralAssetCustomerDetail(estimateGeneralAssetFullInfo.estimateGeneralAssetCustomerDetails));
    if (estimateGeneralAssetFullInfo.estimateGeneralAssetDate) dispatch(setEstimateGeneralAssetDate(estimateGeneralAssetFullInfo.estimateGeneralAssetDate));
    if (estimateGeneralAssetFullInfo.estimateGeneralAssetTotal) dispatch(setEstimateGeneralAssetTotal(estimateGeneralAssetFullInfo.estimateGeneralAssetTotal));
    if (estimateGeneralAssetFullInfo.generalAsset) dispatch(setGeneralAsset(estimateGeneralAssetFullInfo.generalAsset));
};

export const loadEstimateGeneralAssetAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateGeneralAssetAdditionalCharges(id);
    dispatch(setEstimateGeneralAssetAdditionalCharges(response.data));
};

export const loadEstimateGeneralAssetDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateGeneralAssetDocumentAttachments(id);
    dispatch(setEstimateGeneralAssetDocumentAttachments(response.data));
};

export const loadEstimateGeneralAssetImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateGeneralAssetImageAttachments(id);
    dispatch(setEstimateGeneralAssetImageAttachments(response.data));
};

export const loadEstimateGeneralAssetMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getEstimateGeneralAssetMaterials(id);
    dispatch(setEstimateGeneralAssetMaterials(response.data));
};

export const submitEstimateGeneralAsset = (estimateGeneralAsset: EstimateGeneralAsset): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitEstimateGeneralAssetPayload(estimateGeneralAsset);
}

export const submitEstimateGeneralAssetGridDetails = (estimateGeneralAssetId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.estimateGeneralAssetAdditionalChargeReducer.length > 0) {
        await submitEstimateGeneralAssetAdditionalChargesPayload(estimateGeneralAssetId, state.estimateGeneralAssetAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteEstimateGeneralAssetAdditionalCharges(estimateGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.estimateGeneralAssetDocumentAttachmentReducer.length > 0) {
        submitEstimateGeneralAssetDocumentsPayload(estimateGeneralAssetId, state.estimateGeneralAssetDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateGeneralAssetDocuments(estimateGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.estimateGeneralAssetImageAttachmentReducer.length > 0) {
        submitEstimateGeneralAssetImagesPayload(estimateGeneralAssetId, state.estimateGeneralAssetImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateGeneralAssetImages(estimateGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.estimateGeneralAssetMaterialReducer.length > 0) {
        submitEstimateGeneralAssetMaterialsPayload(estimateGeneralAssetId, state.estimateGeneralAssetMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteEstimateGeneralAssetMaterials(estimateGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitEstimateGeneralAssetPayload = async (payload: EstimateGeneralAsset): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? estimateGeneralAssetService.patch
        : estimateGeneralAssetService.post;

    return requestToServer(payload);
};

export const submitEstimateGeneralAssetAdditionalChargesPayload = async (varEstimateGeneralAssetId: number, payload: EstimateGeneralAssetAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateGeneralAssetService.postAdditionalCharges : estimateGeneralAssetService.patchAdditionalCharges;

    return requestToServer(varEstimateGeneralAssetId, payload);
}

export const submitEstimateGeneralAssetDocumentsPayload = async (varEstimateGeneralAssetId: number, payload: EstimateGeneralAssetDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateGeneralAssetService.postDocuments : estimateGeneralAssetService.patchDocuments;

    return requestToServer(varEstimateGeneralAssetId, payload);
}

export const submitEstimateGeneralAssetImagesPayload = async (varEstimateGeneralAssetId: number, payload: EstimateGeneralAssetImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateGeneralAssetService.postImages : estimateGeneralAssetService.patchImages;

    return requestToServer(varEstimateGeneralAssetId, payload);
}

export const submitEstimateGeneralAssetMaterialsPayload = async (varEstimateGeneralAssetId: number, payload: EstimateGeneralAssetMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? estimateGeneralAssetService.postMaterials : estimateGeneralAssetService.patchMaterials;

    return requestToServer(varEstimateGeneralAssetId, payload);
}

export const deleteEstimateGeneralAssetAdditionalCharges = async (varEstimateGeneralAssetId: number): Promise<AxiosResponse> => {
    const requestToServer = estimateGeneralAssetService.deleteAdditionalCharges(varEstimateGeneralAssetId);
    return requestToServer;
}

export const deleteEstimateGeneralAssetDocuments = async (varEstimateGeneralAssetId: number): Promise<AxiosResponse> => {
    return estimateGeneralAssetService.deleteDocuments(varEstimateGeneralAssetId);
}

export const deleteEstimateGeneralAssetImages = async (varEstimateGeneralAssetId: number): Promise<AxiosResponse> => {
    return estimateGeneralAssetService.deleteImages(varEstimateGeneralAssetId);
}

export const deleteEstimateGeneralAssetMaterials = async (varEstimateGeneralAssetId: number): Promise<AxiosResponse> => {
    return estimateGeneralAssetService.deleteMaterials(varEstimateGeneralAssetId);
}
