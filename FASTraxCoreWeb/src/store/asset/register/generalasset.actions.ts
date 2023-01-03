import {AxiosResponse} from 'axios';
import {ReduxThunk} from '../../rootReducer';
import _ from 'lodash';
import generalAssetService from '@app/services/asset/register/generalasset.service';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {setErrors} from '../../common/errors.reducer';
import {setGeneralAsset} from './generalasset.reducers';
import {setGeneralAssetDepreciationDetail} from './generalassetdepreciationdetail.reducers';
import {setGeneralAssetDocumentAttachment} from './generalassetdocumentattachment.reducers';
import {setGeneralAssetImageAttachment} from './generalassetimageattachment.reducers';
import {setGeneralAssetRegistrationDetail} from './generalassetregistrationdetail.reducers';
import {setGeneralAssetWarrantyDetail} from './generalassetwarrantydetail.reducers';
import {setGeneralAssetLinkedAsset} from './generalassetlinkedasset.reducers';
import {setGeneralAssetCustomField} from './generalassetcustomfield.reducers';
import { setGeneralAssetTransactionHistory } from './generalassettransactionhistory.reducers';

export const deleteGeneralAssetCustomFields = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteCustomFields(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetDepreciationDetails = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteDepreciationDetails(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetDocuments = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteDocuments(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetImages = async (generalAssetId: number): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteImages(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetLinkedAssets = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteLinkedAssets(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetRegistrationDetails = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteRegistrationDetails(generalAssetId);
  return requestToServer;
};

export const deleteGeneralAssetWarrantyDetails = async (
  generalAssetId: number,
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.deleteWarrantyDetails(generalAssetId);
  return requestToServer;
};

export const loadGeneralAssetDepreciationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getDepreciationDetails(id);
  dispatch(setGeneralAssetDepreciationDetail(response.data));
};

export const loadGeneralAssetDocumentAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getDocuments(id);
  dispatch(setGeneralAssetDocumentAttachment(response.data));
};

export const mapGeneralAssetCustomFieldsOnEdit = (value: GeneralAssetCustomField[]) => {
  return _.map(value, x => ({...x, tempId: generateNegativeNumber({flat: []})}));
};

export const loadGeneralAssetCustomFieldsDefault = (): ReduxThunk<
  Promise<AxiosResponse<GeneralAssetCustomField[]>>
> => async (_, getState) => {
  const response = await generalAssetService.getCustomFieldsDefault();
  return response.data;
};

export const loadGeneralAssetCustomFieldsOnEdit = (
  id: UrlParam,
): ReduxThunk<Promise<AxiosResponse<GeneralAssetCustomField[]>>> => async (_, getState) => {
  const response = await generalAssetService.getCustomFields(id);
  return response.data;
};
export const loadGeneralAssetCustomFields = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getCustomFields(id);
  dispatch(setGeneralAssetCustomField(response.data));
};

export const loadGeneralAssetFullInfo = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getFullInfo(id);
  dispatch(setGeneralAsset(response.data));
};

export const loadGeneralAssetImageAttachments = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getImages(id);
  dispatch(setGeneralAssetImageAttachment(response.data));
};

export const loadGeneralAssetLinkedAssetsOnEdit = (
  id: UrlParam,
): ReduxThunk<Promise<AxiosResponse<GeneralAssetLinkedAsset[]>>> => async (_, getState) => {
  const response = await generalAssetService.getLinkedAssets(id);
  return response.data;
};

export const loadGeneralAssetLinkedAssets = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getLinkedAssets(id);
  dispatch(setGeneralAssetLinkedAsset(response.data));
};

export const loadGeneralAssetRegistrationDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getRegistrationDetails(id);
  dispatch(setGeneralAssetRegistrationDetail(response.data));
};

export const loadGeneralAssetWarrantyDetails = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getWarrantyDetails(id);
  dispatch(setGeneralAssetWarrantyDetail(response.data));
};

export const loadGeneralAssetSecondaryDetails = (
  payload: GeneralAssetItemGroupSearchCriteria,
): Promise<AxiosResponse<GeneralAssetSecondaryDetail[]>> => {
  return generalAssetService.postSecondaryDetails(payload);
};

export const loadGeneralAssetTransactionHistory  = (id: UrlParam): ReduxThunk => async dispatch => {
  const response = await generalAssetService.getTransactionHistory(id);
  dispatch(setGeneralAssetTransactionHistory(response.data));
}

export const submitGeneralAsset = (
  generalAsset: GeneralAsset,
): ReduxThunk<Promise<AxiosResponse<number>>> => async (_, getState) => {
  return submitGeneralAssetPayload(generalAsset);
};

export const submitGeneralAssetPayload = async (payload: GeneralAsset): Promise<AxiosResponse> => {
  const requestToServer = payload.id ? generalAssetService.patch : generalAssetService.post;
  return requestToServer(payload);
};

export const submitGeneralAssetGridDetails = (generalAssetId: number): ReduxThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();

  //Start - Custom Fields
  //Process the saving of custom fields when it is being attached
  if (state.generalAssetCustomFieldReducer.current !== undefined) {
    if (state.generalAssetCustomFieldReducer.current.length > 0) {
      await submitGeneralAssetCustomFieldsPayload(
        generalAssetId,
        state.generalAssetCustomFieldReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetCustomFields(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Custom Fields

  //Start - Depreciation Details
  //Process the saving of depreciation details when it is being attached
  if (state.generalAssetDepreciationDetailReducer.current !== undefined) {
    if (state.generalAssetDepreciationDetailReducer.current.length > 0) {
      await submitGeneralAssetDepreciationDetailsPayload(
        generalAssetId,
        state.generalAssetDepreciationDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetDepreciationDetails(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Depreciation Details

  //Start - Documents
  //Process the saving of documents when it is being attached
  if (state.generalAssetDocumentAttachmentReducer.current !== undefined) {
    if (state.generalAssetDocumentAttachmentReducer.current.length > 0) {
      await submitGeneralAssetDocumentsPayload(
        generalAssetId,
        state.generalAssetDocumentAttachmentReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetDocuments(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Documents

  //Start - Images
  //Process the saving of images when it is being attached
  if (state.generalAssetImageAttachmentReducer.current !== undefined) {
    if (state.generalAssetImageAttachmentReducer.current.length > 0) {
      await submitGeneralAssetImagesPayload(
        generalAssetId,
        state.generalAssetImageAttachmentReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetImages(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Images

  //Start - Linked Assets
  //Process the saving of linked assets when it is being attached
  if (state.generalAssetLinkedAssetReducer.current !== undefined) {
    if (state.generalAssetLinkedAssetReducer.current.length > 0) {
      await submitGeneralAssetLinkedAssetsPayload(
        generalAssetId,
        state.generalAssetLinkedAssetReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetLinkedAssets(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Linked Assets

  //Start - Registration Details
  //Process the saving of registration details when it is being attached
  if (state.generalAssetRegistrationDetailReducer.current !== undefined) {
    if (state.generalAssetRegistrationDetailReducer.current.length > 0) {
      await submitGeneralAssetRegistrationDetailsPayload(
        generalAssetId,
        state.generalAssetRegistrationDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetRegistrationDetails(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Registration Details

  //Start - Warranty Details
  //Process the saving of warranty details when it is being attached
  if (state.generalAssetWarrantyDetailReducer.current !== undefined) {
    if (state.generalAssetWarrantyDetailReducer.current.length > 0) {
      await submitGeneralAssetWarrantyDetailsPayload(
        generalAssetId,
        state.generalAssetWarrantyDetailReducer.current,
      ).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    } else {
      await deleteGeneralAssetWarrantyDetails(generalAssetId).catch(error => {
        if (!error.response) return dispatch(setErrors(error));
        const response: AxiosResponse = error.response;
        dispatch(setErrors(response.data));
      });
    }
  }
  //End - Warranty Details
};

export const submitGeneralAssetCustomFieldsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetCustomField[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.generalAssetId >= 1);
  const requestToServer =
    indx === -1 ? generalAssetService.postCustomFields : generalAssetService.patchCustomFields;
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetDepreciationDetailsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetDepreciationDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? generalAssetService.postDepreciationDetails
      : generalAssetService.patchDepreciationDetails;
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetDocumentsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetDocumentAttachment[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1 ? generalAssetService.postDocuments : generalAssetService.patchDocuments;
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetImagesPayload = async (
  generalAssetId: number,
  payload: GeneralAssetImageAttachment[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1 ? generalAssetService.postImages : generalAssetService.patchImages;
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetItemGroupSearchCriteria = (
  criteria: GeneralAssetItemGroupSearchCriteria,
): ReduxThunk<Promise<AxiosResponse<GeneralAssetSecondaryDetail[]>>> => async (_, getState) => {
  return submitGeneralAssetItemGroupSearchCriteriaPayload(criteria);
};

export const submitGeneralAssetItemGroupSearchCriteriaPayload = async (
  payload: GeneralAssetItemGroupSearchCriteria,
): Promise<AxiosResponse<GeneralAssetSecondaryDetail[]>> => {
  return generalAssetService.postSecondaryDetails(payload);
};

export const submitGeneralAssetLinkedAssetsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetLinkedAsset[],
): Promise<AxiosResponse> => {
  const requestToServer = generalAssetService.patchLinkedAssets; //Currently it is always patch method to API since adding of the details for linked asset will be on Edit mode.
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetRegistrationDetailsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetRegistrationDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? generalAssetService.postRegistrationDetails
      : generalAssetService.patchRegistrationDetails;
  return requestToServer(generalAssetId, payload);
};

export const submitGeneralAssetWarrantyDetailsPayload = async (
  generalAssetId: number,
  payload: GeneralAssetWarrantyDetail[],
): Promise<AxiosResponse> => {
  const indx = payload.findIndex(x => x.id >= 1);
  const requestToServer =
    indx === -1
      ? generalAssetService.postWarrantyDetails
      : generalAssetService.patchWarrantyDetails;
  return requestToServer(generalAssetId, payload);
};
