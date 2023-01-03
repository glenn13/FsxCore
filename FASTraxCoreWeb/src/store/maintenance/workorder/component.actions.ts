import { AxiosResponse } from 'axios';
import { ReduxThunk } from '../../rootReducer';
import { setErrors } from '../../common/errors.reducer';

import WorkOrderComponent from '@app/entities/maintenance/workorder/WorkOrderComponent';
import WorkOrderComponentAdditionalCharge from '@app/entities/maintenance/workorder/WorkOrderComponentAdditionalCharge';
import WorkOrderComponentDocumentAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentDocumentAttachment';
import WorkOrderComponentImageAttachment from '@app/entities/maintenance/workorder/WorkOrderComponentImageAttachment';
import WorkOrderComponentMaterial from '@app/entities/maintenance/workorder/WorkOrderComponentMaterial';

import { setComponent, setWorkOrderComponent } from './component.reducers';
import { setWorkOrderComponentAdditionalCharges } from './componentAdditionalCharge.reducers';
import { setWorkOrderComponentCustomerDetail } from './componentCustomerDetail.reducers';
import { setWorkOrderComponentDate } from './componentDate.reducers';
import { setWorkOrderComponentDocumentAttachments } from './componentDocumentAttachment.reducers';
import { setWorkOrderComponentImageAttachments } from './componentImageAttachment.reducers';
import { setWorkOrderComponentLabours } from './componentLabour.reducers';
import { setWorkOrderComponentMaterials } from './componentMaterial.reducers';
import { setWorkOrderComponentMobileService } from './componentMobileService.reducers';
import { setWorkOrderComponentTotal } from './componentTotal.reducers';
import { setWorkOrderComponentRepairSelections } from './componentRepairSelection.reducers';

import workOrderComponentService, {
    getWorkOrderComponentAdditionalCharges
    , getWorkOrderComponentDocumentAttachments
    , getWorkOrderComponentFullInfo
    , getWorkOrderComponentImageAttachments
    , getWorkOrderComponentLabours
    , getWorkOrderComponentMaterials
    , getRepairOperationSelection
} from '@app/services/maintenance/workordercomponent.service';
import RepairSubGroup from '../../../entities/maintenance/standard-entries/RepairSubGroup';

export const loadWorkOrderComponent = (id: number | string): ReduxThunk => async dispatch => {
    const { data: workOrderComponentFullInfo } = await getWorkOrderComponentFullInfo(id);

    dispatch(setWorkOrderComponent(workOrderComponentFullInfo));

    if (workOrderComponentFullInfo.workOrderComponentCustomerDetails) dispatch(setWorkOrderComponentCustomerDetail(workOrderComponentFullInfo.workOrderComponentCustomerDetails));
    if (workOrderComponentFullInfo.workOrderComponentDate) dispatch(setWorkOrderComponentDate(workOrderComponentFullInfo.workOrderComponentDate));
    if (workOrderComponentFullInfo.workOrderComponentMobileService) dispatch(setWorkOrderComponentMobileService(workOrderComponentFullInfo.workOrderComponentMobileService));
    if (workOrderComponentFullInfo.workOrderComponentTotal) dispatch(setWorkOrderComponentTotal(workOrderComponentFullInfo.workOrderComponentTotal));
    // if (workOrderComponentFullInfo.component) dispatch(setComponent(workOrderComponentFullInfo.component));
};

export const loadWorkOrderComponentAdditionalCharge = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderComponentAdditionalCharges(id);
    dispatch(setWorkOrderComponentAdditionalCharges(response.data));
};

export const loadWorkOrderComponentDocumentAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderComponentDocumentAttachments(id);
    dispatch(setWorkOrderComponentDocumentAttachments(response.data));
};

export const loadWorkOrderComponentImageAttachments = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderComponentImageAttachments(id);
    dispatch(setWorkOrderComponentImageAttachments(response.data));
};

export const loadWorkOrderComponentLabours = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderComponentLabours(id);
    dispatch(setWorkOrderComponentLabours(response.data));
};

export const loadWorkOrderComponentMaterials = (id: number | string): ReduxThunk => async dispatch => {
    const response = await getWorkOrderComponentMaterials(id);
    dispatch(setWorkOrderComponentMaterials(response.data));
};

export const loadWorkOrderComponentRepairAction = async (payload: RepairSubGroup[]): Promise<AxiosResponse> => {
    const requestToServer = workOrderComponentService.getRepairOperationAction;
    return requestToServer(payload);
}

export const loadWorkOrderComponentRepairSelection = (): ReduxThunk => async dispatch => {
    const response = await getRepairOperationSelection();
    dispatch(setWorkOrderComponentRepairSelections(response.data));
};

export const submitWorkOrderComponent = (workOrderComponent: WorkOrderComponent): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
    return submitWorkOrderComponentPayload(workOrderComponent);
}

export const submitWorkOrderComponentDetails = (workOrderComponentId: number): ReduxThunk => async (dispatch, getState) => {
    const state = getState();

    //Start - Additional Charges
    //Process the saving of additional charges when it is being attached
    if (state.workOrderComponentAdditionalChargeReducer.length > 0) {
        await submitWorkOrderComponentAdditionalChargesPayload(workOrderComponentId, state.workOrderComponentAdditionalChargeReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        await deleteWorkOrderComponentAdditionalCharges(workOrderComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Additional Charges

    //Start - Documents
    //Process the saving of Documents when it is being attached
    if (state.workOrderComponentDocumentAttachmentReducer.length > 0) {
        submitWorkOrderComponentDocumentsPayload(workOrderComponentId, state.workOrderComponentDocumentAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderComponentDocuments(workOrderComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Documents

    //Start - Images
    //Process the saving of images when it is being attached
    if (state.workOrderComponentImageAttachmentReducer.length > 0) {
        submitWorkOrderComponentImagesPayload(workOrderComponentId, state.workOrderComponentImageAttachmentReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderComponentImages(workOrderComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Images

    //Start - Materials
    //Process the saving of materials when it is being attached
    if (state.workOrderComponentMaterialReducer.length > 0) {
        submitWorkOrderComponentMaterialsPayload(workOrderComponentId, state.workOrderComponentMaterialReducer)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    } else {
        deleteWorkOrderComponentMaterials(workOrderComponentId)
            .catch(error => {
                if (!error.response) return dispatch(setErrors(error));
                const response: AxiosResponse = error.response;
                dispatch(setErrors(response.data));
            });
    }
    //End - Materials

};

export const submitWorkOrderComponentPayload = async (payload: WorkOrderComponent): Promise<AxiosResponse> => {
    const requestToServer = payload.id
        ? workOrderComponentService.patch
        : workOrderComponentService.post;

    return requestToServer(payload);
};

export const submitWorkOrderComponentAdditionalChargesPayload = async (varWorkOrderComponentId: number, payload: WorkOrderComponentAdditionalCharge[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderComponentService.postAdditionalCharges : workOrderComponentService.patchAdditionalCharges;

    return requestToServer(varWorkOrderComponentId, payload);
}

export const submitWorkOrderComponentDocumentsPayload = async (varWorkOrderComponentId: number, payload: WorkOrderComponentDocumentAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderComponentService.postDocuments : workOrderComponentService.patchDocuments;

    return requestToServer(varWorkOrderComponentId, payload);
}

export const submitWorkOrderComponentImagesPayload = async (varWorkOrderComponentId: number, payload: WorkOrderComponentImageAttachment[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderComponentService.postImages : workOrderComponentService.patchImages;

    return requestToServer(varWorkOrderComponentId, payload);
}

export const submitWorkOrderComponentMaterialsPayload = async (varWorkOrderComponentId: number, payload: WorkOrderComponentMaterial[]): Promise<AxiosResponse> => {
    const indx = payload.findIndex(x => x.id >= 1);

    const requestToServer = indx === -1 ? workOrderComponentService.postMaterials : workOrderComponentService.patchMaterials;

    return requestToServer(varWorkOrderComponentId, payload);
}

export const deleteWorkOrderComponentAdditionalCharges = async (varWorkOrderComponentId: number): Promise<AxiosResponse> => {
    const requestToServer = workOrderComponentService.deleteAdditionalCharges(varWorkOrderComponentId);
    return requestToServer;
}

export const deleteWorkOrderComponentDocuments = async (varWorkOrderComponentId: number): Promise<AxiosResponse> => {
    return workOrderComponentService.deleteDocuments(varWorkOrderComponentId);
}

export const deleteWorkOrderComponentImages = async (varWorkOrderComponentId: number): Promise<AxiosResponse> => {
    return workOrderComponentService.deleteImages(varWorkOrderComponentId);
}

export const deleteWorkOrderComponentMaterials = async (varWorkOrderComponentId: number): Promise<AxiosResponse> => {
    return workOrderComponentService.deleteMaterials(varWorkOrderComponentId);
}
