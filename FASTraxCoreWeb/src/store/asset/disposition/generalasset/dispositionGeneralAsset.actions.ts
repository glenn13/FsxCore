import { AxiosResponse } from 'axios';
import { ReduxThunk, RootState } from '../../../rootReducer';
import { setErrors } from '../../../common/errors.reducer';
import _ from 'lodash';

import {setDispositionGeneralAsset} from './dispositionGeneralAsset.reducers';
import {setDispositionGeneralAssetDamagedAreas} from './dispositionGeneralAssetDamagedArea.reducers';
import {setDispositionGeneralAssetRequiredRepairs} from './dispositionGeneralAssetRequiredRepair.reducers';
import {setDispositionGeneralAssetImages} from './dispositionGeneralAssetImage.reducers';
import {setDispositionGeneralAssetDocuments} from './dispositionGeneralAssetDocument.reducers';
import {setDispositionGeneralAssetApprovals} from './dispositionGeneralAssetApproval.reducers';

import {
    getDispositionGeneralAsset,
    postDispositionGeneralAsset,
    patchDispositionGeneralAsset,

    getDispositionGeneralAssetDamagedAreas,
    postDispositionGeneralAssetDamagedArea,
    patchDispositionGeneralAssetDamagedArea,
    deleteDispositionGeneralAssetDamagedArea,

    getDispositionGeneralAssetRequiredRepairs,
    postDispositionGeneralAssetRequiredRepair,
    patchDispositionGeneralAssetRequiredRepair,
    deleteDispositionGeneralAssetRequiredRepair,

    getDispositionGeneralAssetImages,
    postDispositionGeneralAssetImage,
    patchDispositionGeneralAssetImage,
    deleteDispositionGeneralAssetImage,

    getDispositionGeneralAssetDocuments,
    postDispositionGeneralAssetDocument,
    patchDispositionGeneralAssetDocument,
    deleteDispositionGeneralAssetDocument,

    getDispositionGeneralAssetApprovals,
    postDispositionGeneralAssetApproval,
    patchDispositionGeneralAssetApproval,
    deleteDispositionGeneralAssetApproval,

  } from '@app/services/asset/disposition/dispositionGeneralAsset.service';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import DispositionDamageadArea from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDamagedArea';
import DispositionRequiredRepair from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetRequiredRepair';
import DispositionGeneralAssetImage from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetImage';
import DispositionGeneralAssetDocument from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDocument';
import DispositionGeneralAssetApproval from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetApproval';

export const loadDispositionGeneralAsset = (id: number | string): ReduxThunk => async dispatch => {
    const { data: dispositionGeneralAsset } = await getDispositionGeneralAsset(id);
    dispatch(setDispositionGeneralAsset(dispositionGeneralAsset));
}

export const loadDispositionGeneralAssetDamagedAreas = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionGeneralAssetDamagedAreas(id);
    dispatch(setDispositionGeneralAssetDamagedAreas(response.data));
}

export const loadDispositionGeneralAssetRequiredRepairs = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionGeneralAssetRequiredRepairs(id);
    dispatch(setDispositionGeneralAssetRequiredRepairs(response.data));
}

export const loadDispositionGeneralAssetImages = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionGeneralAssetImages(id);
    dispatch(setDispositionGeneralAssetImages(response.data));
}

export const loadDispositionGeneralAssetDocuments = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionGeneralAssetDocuments(id);
    dispatch(setDispositionGeneralAssetDocuments(response.data));
}

export const loadDispositionGeneralAssetApprovals = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionGeneralAssetApprovals(id);
    dispatch(setDispositionGeneralAssetApprovals(response.data));
}

export const submitDispositionGeneralAsset = (dispositionGeneralAsset: DispositionGeneralAsset): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitDispositionGeneralAssetPayload(dispositionGeneralAsset);
}

export const submitDispositionGeneralAssetPayload = async (payload: DispositionGeneralAsset): Promise<AxiosResponse> => {
    const requestToServer = payload.id ? patchDispositionGeneralAsset : postDispositionGeneralAsset;
    return requestToServer(payload);
}

export const submitDispositionGeneralAssetDamagedAreaPayload = async (dispositionGeneralAssetId: number, payload: DispositionDamageadArea[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionGeneralAssetDamagedArea : patchDispositionGeneralAssetDamagedArea;
    return requestToServer(dispositionGeneralAssetId, payload);
}

export const submitDispositionRequiredRepairPayload = async (dispositionGeneralAssetId: number, payload: DispositionRequiredRepair[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionGeneralAssetRequiredRepair : patchDispositionGeneralAssetRequiredRepair;
    return requestToServer(dispositionGeneralAssetId, payload);
}

export const submitDispositionGeneralAssetImagePayload = async (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetImage[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionGeneralAssetImage : patchDispositionGeneralAssetImage;
    return requestToServer(dispositionGeneralAssetId, payload);
}

export const submitDispositionGeneralAssetDocumentPayload = async (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetDocument[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionGeneralAssetDocument : patchDispositionGeneralAssetDocument;
    return requestToServer(dispositionGeneralAssetId, payload);
}

export const submitDispositionGeneralAssetApprovalPayload = async (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetApproval[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionGeneralAssetApproval : patchDispositionGeneralAssetApproval;
    return requestToServer(dispositionGeneralAssetId, payload);
}

export const addOrUpdateDispositionGeneralAsset = (
    dispositionGeneralAsset: DispositionGeneralAsset,
  ): ReduxThunk<Promise<AxiosResponse<DispositionGeneralAsset>>> => async (_, getState) => {
    const state = getState();
    const consolidatedGeneralAsset = consolidateDispositionGeneralAsset(dispositionGeneralAsset, state);
    if (dispositionGeneralAsset.id) return patchDispositionGeneralAsset(consolidatedGeneralAsset);
    return postDispositionGeneralAsset(consolidatedGeneralAsset);
  };

export const consolidateDispositionGeneralAsset = (dispositionGeneralAsset: DispositionGeneralAsset, state: RootState) => {
  const {} = state;
  const consolidated: DispositionGeneralAsset = {...dispositionGeneralAsset};
  return consolidated;
};

export const submitDispositionGeneralAssetDetails = (dispositionGeneralAssetId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Damaged Areas
    //Process the saving of Damaged Areas when it is being attached
    if (state.dispositionGeneralAssetDamagedAreaReducer.length > 0) {
        await submitDispositionGeneralAssetDamagedAreaPayload(dispositionGeneralAssetId, state.dispositionGeneralAssetDamagedAreaReducer)
        
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionGeneralAssetDamagedArea(dispositionGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas

    //Start - Required Repair
    //Process the saving of Required Repairs when it is being attached
    if (state.dispositionGeneralAssetRequiredRepairReducer.length > 0) {
        await submitDispositionRequiredRepairPayload(dispositionGeneralAssetId, state.dispositionGeneralAssetRequiredRepairReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionGeneralAssetRequiredRepair(dispositionGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas

    //Start - Image Attachment
    //Process the saving of image attachment when it is being attached
    if (state.dispositionGeneralAssetImageReducer.length > 0) {
        await submitDispositionGeneralAssetImagePayload(dispositionGeneralAssetId, state.dispositionGeneralAssetImageReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionGeneralAssetImage(dispositionGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Image Attachment

    //Start - Document Attachment
    //Process the saving of document attachment when it is being attached
    if (state.dispositionGeneralAssetDocumentReducer.length > 0) {
        submitDispositionGeneralAssetDocumentPayload(dispositionGeneralAssetId, state.dispositionGeneralAssetDocumentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteDispositionGeneralAssetDocument(dispositionGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Document Attachment

    //Start - Approvals
    //Process the saving of approvals
    if (state.dispositionGeneralAssetApprovalReducer.length > 0) {
        submitDispositionGeneralAssetApprovalPayload(dispositionGeneralAssetId, state.dispositionGeneralAssetApprovalReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteDispositionGeneralAssetApproval(dispositionGeneralAssetId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Approvals

    }