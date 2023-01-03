import { AxiosResponse } from 'axios';
import { ReduxThunk, RootState } from '../../../rootReducer';
import { setErrors } from '../../../common/errors.reducer';
import _ from 'lodash';

import {setDispositionVehicle} from './dispositionVehicle.reducers';
import {setDispositionVehicleDamagedAreas} from './dispositionVehicleDamagedArea.reducers';
import {setDispositionVehicleRequiredRepairs} from './dispositionVehicleRequiredRepair.reducers';
import {setDispositionVehicleImages} from './dispositionVehicleImage.reducers';
import {setDispositionVehicleDocuments} from './dispositionVehicleDocument.reducers';
import {setDispositionVehicleApprovals} from './dispositionVehicleApproval.reducers';
import {
    getDispositionVehicle,
    postDispositionVehicle,
    patchDispositionVehicle,
    getDispositionVehicleDamagedAreas,
    postDispositionVehicleDamagedArea,
    patchDispositionVehicleDamagedArea,
    deleteDispositionVehicleDamagedArea,
    getDispositionVehicleRequiredRepairs,
    postDispositionVehicleRequiredRepair,
    patchDispositionVehicleRequiredRepair,
    deleteDispositionVehicleRequiredRepair,
    getDispositionVehicleImages,
    postDispositionVehicleImage,
    patchDispositionVehicleImage,
    deleteDispositionVehicleImage,
    getDispositionVehicleDocuments,
    postDispositionVehicleDocument,
    patchDispositionVehicleDocument,
    deleteDispositionVehicleDocument,
    getDispositionVehicleApprovals,
    postDispositionVehicleApproval,
    patchDispositionVehicleApproval,
    deleteDispositionVehicleApproval,
  } from '@app/services/asset/disposition/dispositionVehicle.service';
import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import DispositionDamageadArea from '@app/entities/asset/disposition/vehicle/DispositionVehicleDamagedArea';
import DispositionRequiredRepair from '@app/entities/asset/disposition/vehicle/DispositionVehicleRequiredRepair';
import DispositionVehicleImage from '@app/entities/asset/disposition/vehicle/DispositionVehicleImage';
import DispositionVehicleDocument from '@app/entities/asset/disposition/vehicle/DispositionVehicleDocument';
import DispositionVehicleApproval from '@app/entities/asset/disposition/vehicle/DispositionVehicleApproval';

export const loadDispositionVehicle = (id: number | string): ReduxThunk => async dispatch => {
    const { data: dispositionVehicle } = await getDispositionVehicle(id);
    dispatch(setDispositionVehicle(dispositionVehicle));
}

export const loadDispositionVehicleDamagedAreas = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionVehicleDamagedAreas(id);
    dispatch(setDispositionVehicleDamagedAreas(response.data));
}

export const loadDispositionVehicleRequiredRepairs = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionVehicleRequiredRepairs(id);
    dispatch(setDispositionVehicleRequiredRepairs(response.data));
}

export const loadDispositionVehicleImages = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionVehicleImages(id);
    dispatch(setDispositionVehicleImages(response.data));
}

export const loadDispositionVehicleDocuments = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionVehicleDocuments(id);
    dispatch(setDispositionVehicleDocuments(response.data));
}

export const loadDispositionVehicleApprovals = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionVehicleApprovals(id);
    dispatch(setDispositionVehicleApprovals(response.data));
}

export const submitDispositionVehicle = (dispositionVehicle: DispositionVehicle): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitDispositionVehiclePayload(dispositionVehicle);
}

export const submitDispositionVehiclePayload = async (payload: DispositionVehicle): Promise<AxiosResponse> => {
    const requestToServer = payload.id ? patchDispositionVehicle : postDispositionVehicle;
    return requestToServer(payload);
}

export const submitDispositionVehicleDamagedAreaPayload = async (dispositionVehicleId: number, payload: DispositionDamageadArea[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionVehicleDamagedArea : patchDispositionVehicleDamagedArea;
    return requestToServer(dispositionVehicleId, payload);
}

export const submitDispositionRequiredRepairPayload = async (dispositionVehicleId: number, payload: DispositionRequiredRepair[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionVehicleRequiredRepair : patchDispositionVehicleRequiredRepair;
    return requestToServer(dispositionVehicleId, payload);
}

export const submitDispositionVehicleImagePayload = async (dispositionVehicleId: number, payload: DispositionVehicleImage[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionVehicleImage : patchDispositionVehicleImage;
    return requestToServer(dispositionVehicleId, payload);
}

export const submitDispositionVehicleDocumentPayload = async (dispositionVehicleId: number, payload: DispositionVehicleDocument[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionVehicleDocument : patchDispositionVehicleDocument;
    return requestToServer(dispositionVehicleId, payload);
}

export const submitDispositionVehicleApprovalPayload = async (dispositionVehicleId: number, payload: DispositionVehicleApproval[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionVehicleApproval : patchDispositionVehicleApproval;
    return requestToServer(dispositionVehicleId, payload);
}

export const addOrUpdateDispositionVehicle = (
    dispositionVehicle: DispositionVehicle,
  ): ReduxThunk<Promise<AxiosResponse<DispositionVehicle>>> => async (_, getState) => {
    const state = getState();
    const consolidatedDispositionVehicle = consolidateDispositionVehicle(dispositionVehicle, state);
    if (dispositionVehicle.id) return patchDispositionVehicle(consolidatedDispositionVehicle);
    return postDispositionVehicle(consolidatedDispositionVehicle);
  };

export const consolidateDispositionVehicle = (dispositionVehicle: DispositionVehicle, state: RootState) => {
  const {} = state;
  const consolidated: DispositionVehicle = {...dispositionVehicle};
  return consolidated;
};

export const submitDispositionVehicleDetails = (dispositionVehicleId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Damaged Areas
    //Process the saving of Damaged Areas when it is being attached
    if (state.dispositionVehicleDamagedAreaReducer.length > 0) {
        await submitDispositionVehicleDamagedAreaPayload(dispositionVehicleId, state.dispositionVehicleDamagedAreaReducer)
        
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionVehicleDamagedArea(dispositionVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas

    //Start - Required Repair
    //Process the saving of Required Repairs when it is being attached
    if (state.dispositionVehicleRequiredRepairReducer.length > 0) {
        await submitDispositionRequiredRepairPayload(dispositionVehicleId, state.dispositionVehicleRequiredRepairReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionVehicleRequiredRepair(dispositionVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas

    //Start - Image Attachment
    //Process the saving of image attachment when it is being attached
    if (state.dispositionVehicleImageReducer.length > 0) {
        await submitDispositionVehicleImagePayload(dispositionVehicleId, state.dispositionVehicleImageReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionVehicleImage(dispositionVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Image Attachment

    //Start - Document Attachment
    //Process the saving of document attachment when it is being attached
        if (state.dispositionVehicleDocumentReducer.length > 0) {
            submitDispositionVehicleDocumentPayload(dispositionVehicleId, state.dispositionVehicleDocumentReducer)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            deleteDispositionVehicleDocument(dispositionVehicleId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    //End - Document Attachment

    //Start - Approvals
    //Process the saving of approvals
    if (state.dispositionVehicleApprovalReducer.length > 0) {
        submitDispositionVehicleApprovalPayload(dispositionVehicleId, state.dispositionVehicleApprovalReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteDispositionVehicleApproval(dispositionVehicleId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Approvals

    }