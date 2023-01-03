import {AxiosResponse} from 'axios';
import {ReduxThunk} from '../../rootReducer';
import _ from 'lodash';
import componentService from '@app/services/asset/register/component.service';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {setErrors} from '../../common/errors.reducer';
import {setComponent} from './component.reducers';
import {setComponentDepreciationDetail} from './componentDepreciationDetail.reducers';
import {setComponentDocumentAttachment} from './componentDocumentAttachment.reducers';
import {setComponentImageAttachment} from './componentImageAttachment.reducers';
import {setComponentRegistrationDetail} from './componentRegistrationDetail.reducers';
import {setComponentCustomField} from './componentCustomField.reducers';
import { setComponentWarrantyDetail } from './componentWarrantyDetail.reducers';
import { setComponentTransactionHistory } from './componentTransactionHistory.reducers';

export const deleteComponentCustomFields = async (
  componentId: number,
): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteCustomFields(componentId);
  return requestToServer;
};

export const deleteComponentDepreciationDetails = async (
  componentId: number,
): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteDepreciationDetails(componentId);
  return requestToServer;
};

export const deleteComponentDocuments = async (
  componentId: number,
): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteDocuments(componentId);
  return requestToServer;
};

export const deleteComponentImages = async (componentId: number): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteImages(componentId);
  return requestToServer;
};

export const deleteComponentRegistrationDetails = async (
  componentId: number,
): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteRegistrationDetails(componentId);
  return requestToServer;
};

export const deleteComponentWarrantyDetails = async (
  componentId: number,
): Promise<AxiosResponse> => {
  const requestToServer = componentService.deleteWarrantyDetails(componentId);
  return requestToServer;
};

export const loadComponentDepreciationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getDepreciationDetails(id);
  dispatch(setComponentDepreciationDetail(response.data));
};

export const loadComponentDocumentAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getDocuments(id);
  dispatch(setComponentDocumentAttachment(response.data));
};

export const mapComponentCustomFieldsOnEdit = (value: ComponentCustomField[]) => {
  return _.map(value, x => ({...x, tempId: generateNegativeNumber({flat: []})}));
};

export const loadComponentCustomFieldsDefault = (): ReduxThunk<
  Promise<AxiosResponse<ComponentCustomField[]>>
> => async (_, getState) => {
  const response = await componentService.getCustomFieldsDefault();
  return response.data;
};

export const loadComponentCustomFieldsOnEdit = (
  id: UrlParam,
): ReduxThunk<Promise<AxiosResponse<ComponentCustomField[]>>> => async (_, getState) => {
  const response = await componentService.getCustomFields(id);
  return response.data;
};

export const loadComponentCustomFields = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getCustomFields(id);
  dispatch(setComponentCustomField(response.data));
};

export const loadComponentFullInfo = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getFullInfo(id);
  dispatch(setComponent(response.data));
};

export const loadComponentImageAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getImages(id);
  dispatch(setComponentImageAttachment(response.data));
};

export const loadComponentRegistrationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getRegistrationDetails(id);
  dispatch(setComponentRegistrationDetail(response.data));
};

export const loadComponentWarrantyDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getWarrantyDetails(id);
  dispatch(setComponentWarrantyDetail(response.data));
};

export const loadComponentTransactionHistory  = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await componentService.getTransactionHistory(id);
  dispatch(setComponentTransactionHistory(response.data));
}

export const submitComponent = (
  component: Component,
): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
  return submitComponentPayload(component);
};

export const submitComponentPayload = async (payload: Component): Promise<AxiosResponse> => {
  const requestToServer = payload.id ? componentService.patch : componentService.post;
  return requestToServer(payload);
};

export const submitComponentGridDetails = (componentId: number): ReduxThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();

  //Start - Custom Fields
  //Process the saving of custom fields when it is being attached
  if (state.componentCustomFieldReducer.current !== undefined) {
    if (state.componentCustomFieldReducer.current.length > 0) {
      await submitComponentCustomFieldsPayload(
        componentId,
        state.componentCustomFieldReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentCustomFields(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Custom Fields

  //Start - Depreciation Details
  //Process the saving of depreciation details when it is being attached
  if (state.componentDepreciationDetailReducer.current !== undefined) {
    if (state.componentDepreciationDetailReducer.current.length > 0) {
      await submitComponentDepreciationDetailsPayload(
        componentId,
        state.componentDepreciationDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentDepreciationDetails(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Depreciation Details

  //Start - Documents
  //Process the saving of documents when it is being attached
  if (state.componentDocumentAttachmentReducer.current !== undefined) {
    if (state.componentDocumentAttachmentReducer.current.length > 0) {
      await submitComponentDocumentsPayload(
        componentId,
        state.componentDocumentAttachmentReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentDocuments(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Documents

  //Start - Images
  //Process the saving of images when it is being attached
  if (state.componentImageAttachmentReducer.current !== undefined) {
    if (state.componentImageAttachmentReducer.current.length > 0) {
      await submitComponentImagesPayload(
        componentId,
        state.componentImageAttachmentReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentImages(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Images

  //Start - Registration Details
  //Process the saving of registration details when it is being attached
  if (state.componentRegistrationDetailReducer.current !== undefined) {
    if (state.componentRegistrationDetailReducer.current.length > 0) {
      await submitComponentRegistrationDetailsPayload(
        componentId,
        state.componentRegistrationDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentRegistrationDetails(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Registration Details

  //Start - Warranty Details
  //Process the saving of warranty details when it is being attached
  if (state.componentWarrantyDetailReducer.current !== undefined) {
    if (state.componentWarrantyDetailReducer.current.length > 0) {
      await submitComponentWarrantyDetailsPayload(
        componentId,
        state.componentWarrantyDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteComponentWarrantyDetails(componentId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Warranty Details
};

export const submitComponentCustomFieldsPayload = async (
  componentId: number,
  payload: ComponentCustomField[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.componentId >= 1);
  const requestToServer =
    indx === -1 ? componentService.postCustomFields : componentService.patchCustomFields;
  return requestToServer(componentId, payload);
};

export const submitComponentDepreciationDetailsPayload = async (
  componentId: number,
  payload: ComponentDepreciationDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? componentService.postDepreciationDetails
      : componentService.patchDepreciationDetails;
  return requestToServer(componentId, payload);
};

export const submitComponentDocumentsPayload = async (
  componentId: number,
  payload: ComponentDocumentAttachment[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1 ? componentService.postDocuments : componentService.patchDocuments;
  return requestToServer(componentId, payload);
};

export const submitComponentImagesPayload = async (
  componentId: number,
  payload: ComponentImageAttachment[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1 ? componentService.postImages : componentService.patchImages;
  return requestToServer(componentId, payload);
};

export const submitComponentRegistrationDetailsPayload = async (
  componentId: number,
  payload: ComponentRegistrationDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? componentService.postRegistrationDetails
      : componentService.patchRegistrationDetails;
  return requestToServer(componentId, payload);
};

export const submitComponentWarrantyDetailsPayload = async (
  componentId: number,
  payload: ComponentWarrantyDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? componentService.postWarrantyDetails
      : componentService.patchWarrantyDetails;
  return requestToServer(componentId, payload);
};
