import { AxiosResponse } from 'axios';
import { ReduxThunk, RootState } from '../../../rootReducer';
import { setErrors } from '../../../common/errors.reducer';
import _ from 'lodash';

import {setDispositionComponent} from './dispositionComponent.reducers';
import {setDispositionComponentDamagedAreas} from './dispositionComponentDamagedArea.reducers';
import {setDispositionComponentRequiredRepairs} from './dispositionComponentRequiredRepair.reducers';
import {setDispositionComponentImages} from './dispositionComponentImage.reducers';
import {setDispositionComponentDocuments} from './dispositionComponentDocument.reducers';
import {setDispositionComponentApprovals} from './dispositionComponentApproval.reducers';
import {
    getDispositionComponent,
    postDispositionComponent,
    patchDispositionComponent,
    getDispositionComponentDamagedAreas,
    postDispositionComponentDamagedArea,
    patchDispositionComponentDamagedArea,
    deleteDispositionComponentDamagedArea,
    getDispositionComponentRequiredRepairs,
    postDispositionComponentRequiredRepair,
    patchDispositionComponentRequiredRepair,
    deleteDispositionComponentRequiredRepair,
    getDispositionComponentImages,
    postDispositionComponentImage,
    patchDispositionComponentImage,
    deleteDispositionComponentImage,
    getDispositionComponentDocuments,
    postDispositionComponentDocument,
    patchDispositionComponentDocument,
    deleteDispositionComponentDocument,
    getDispositionComponentApprovals,
    postDispositionComponentApproval,
    patchDispositionComponentApproval,
    deleteDispositionComponentApproval,
  } from '@app/services/asset/disposition/dispositionComponent.service';
import DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import DispositionDamageadArea from '@app/entities/asset/disposition/component/DispositionComponentDamagedArea';
import DispositionRequiredRepair from '@app/entities/asset/disposition/component/DispositionComponentRequiredRepair';
import DispositionComponentImage from '@app/entities/asset/disposition/component/DispositionComponentImage';
import DispositionComponentDocument from '@app/entities/asset/disposition/component/DispositionComponentDocument';
import DispositionComponentApproval from '@app/entities/asset/disposition/component/DispositionComponentApproval';

export const loadDispositionComponent = (id: number | string): ReduxThunk => async dispatch => {
    const { data: dispositionComponent } = await getDispositionComponent(id);
    dispatch(setDispositionComponent(dispositionComponent));
}

export const loadDispositionComponentDamagedAreas = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionComponentDamagedAreas(id);
    dispatch(setDispositionComponentDamagedAreas(response.data));
}

export const loadDispositionComponentRequiredRepairs = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionComponentRequiredRepairs(id);
    dispatch(setDispositionComponentRequiredRepairs(response.data));
}

export const loadDispositionComponentImages = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionComponentImages(id);
    dispatch(setDispositionComponentImages(response.data));
}

export const loadDispositionComponentDocuments = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionComponentDocuments(id);
    dispatch(setDispositionComponentDocuments(response.data));
}

export const loadDispositionComponentApprovals = (id: UrlParam): ReduxThunk => async dispatch => {
    const response = await getDispositionComponentApprovals(id);
    dispatch(setDispositionComponentApprovals(response.data));
}

export const submitDispositionComponent = (dispositionComponent: DispositionComponent): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitDispositionComponentPayload(dispositionComponent);
}

export const submitDispositionComponentPayload = async (payload: DispositionComponent): Promise<AxiosResponse> => {
    const requestToServer = payload.id ? patchDispositionComponent : postDispositionComponent;
    return requestToServer(payload);
}

export const submitDispositionComponentDamagedAreaPayload = async (dispositionComponentId: number, payload: DispositionDamageadArea[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionComponentDamagedArea : patchDispositionComponentDamagedArea;
    return requestToServer(dispositionComponentId, payload);
}

export const submitDispositionRequiredRepairPayload = async (dispositionComponentId: number, payload: DispositionRequiredRepair[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionComponentRequiredRepair : patchDispositionComponentRequiredRepair;
    return requestToServer(dispositionComponentId, payload);
}

export const submitDispositionComponentImagePayload = async (dispositionComponentId: number, payload: DispositionComponentImage[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionComponentImage : patchDispositionComponentImage;
    return requestToServer(dispositionComponentId, payload);
}

export const submitDispositionComponentDocumentPayload = async (dispositionComponentId: number, payload: DispositionComponentDocument[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionComponentDocument : patchDispositionComponentDocument;
    return requestToServer(dispositionComponentId, payload);
}

export const submitDispositionComponentApprovalPayload = async (dispositionComponentId: number, payload: DispositionComponentApproval[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);
    const requestToServer = indx === -1 ? postDispositionComponentApproval : patchDispositionComponentApproval;
    return requestToServer(dispositionComponentId, payload);
}

export const addOrUpdateDispositionComponent = (
    dispositionComponent: DispositionComponent,
  ): ReduxThunk<Promise<AxiosResponse<DispositionComponent>>> => async (_, getState) => {
    const state = getState();
    const consolidatedComponent = consolidateDispositionComponent(dispositionComponent, state);
    if (dispositionComponent.id) return patchDispositionComponent(consolidatedComponent);
    return postDispositionComponent(consolidatedComponent);
  };

export const consolidateDispositionComponent = (dispositionComponent: DispositionComponent, state: RootState) => {
  const {} = state;
  const consolidated: DispositionComponent = {...dispositionComponent};
  return consolidated;
};

export const submitDispositionComponentDetails = (dispositionComponentId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Damaged Areas
    //Process the saving of Damaged Areas when it is being attached
    if (state.dispositionComponentDamagedAreaReducer.length > 0) {
        await submitDispositionComponentDamagedAreaPayload(dispositionComponentId, state.dispositionComponentDamagedAreaReducer)
        
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionComponentDamagedArea(dispositionComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas

    //Start - Required Repair
    //Process the saving of Required Repairs when it is being attached
    if (state.dispositionComponentRequiredRepairReducer.length > 0) {
        await submitDispositionRequiredRepairPayload(dispositionComponentId, state.dispositionComponentRequiredRepairReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionComponentRequiredRepair(dispositionComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Damaged Areas
    
    //Start - Image Attachment
    //Process the saving of image attachment when it is being attached
    if (state.dispositionComponentImageReducer.length > 0) {
        await submitDispositionComponentImagePayload(dispositionComponentId, state.dispositionComponentImageReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteDispositionComponentImage(dispositionComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Image Attachment

    //Start - Document Attachment
    //Process the saving of document attachment when it is being attached
        if (state.dispositionComponentDocumentReducer.length > 0) {
            submitDispositionComponentDocumentPayload(dispositionComponentId, state.dispositionComponentDocumentReducer)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        } else {
            deleteDispositionComponentDocument(dispositionComponentId)
                .catch(error => {
                    if (!error.response) return dispatch(setErrors(error));
                    const response: AxiosResponse = error.response;
                    dispatch(setErrors(response.data));
                });
        }
    //End - Document Attachment

    //Start - Approvals
    //Process the saving of approvals
    if (state.dispositionComponentApprovalReducer.length > 0) {
        submitDispositionComponentApprovalPayload(dispositionComponentId, state.dispositionComponentApprovalReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteDispositionComponentApproval(dispositionComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Approvals

    }