import {AxiosResponse} from 'axios';
//import {setLinkedAssets} from './linkedAssets.reducers';
import {ReduxThunk, RootState} from '../../rootReducer';
import modulesService from '@app/services/global/modules.service';
import {getGeneralAsset} from '../../../services/asset/assets.service';
import {GeneralAsset} from '../../../entities/asset/inventory/GeneralAsset';
//import {setImages} from '@app/store/asset/inventory/attachmentImages.reducer';
//import {setDocuments} from '@app/store/asset/inventory/attachmentDocuments.reducer';
//import {setWarrantyDetails} from '@app/store/asset/inventory/warrantyDetails.reducers';
//import GeneralWarrantyDetail from '@app/entities/asset/inventory/GeneralWarrantyDetail';
//import GeneralAttachmentImage from '@app/entities/asset/inventory/GeneralAttachmentImage';
import {patchGeneralAsset, postGeneralAsset} from './../../../services/asset/assets.service';
//import {setRegistrationDetail} from '@app/store/asset/inventory/registrationDetails.reducers';
//import GeneralAttachmentDocument from '@app/entities/asset/inventory/GeneralAttachmentDocument';
//import GeneralRegistrationDetail from '@app/entities/asset/inventory/GeneralRegistrationDetail';
import {setCustomFields, generateCustomFields} from '@app/store/common/entityCustomField.reducers';

export const loadGeneralCustomFields = (): ReduxThunk => async dispatch => {
  const response = await modulesService.get.forms.asset.generals();

  if (!response.data.customFields) return console.error('Custom Fields property cannot be null!');

  dispatch(generateCustomFields(response.data.customFields));
};

export const loadGeneralAssetFullInfo = (id: number | string): ReduxThunk => async dispatch => {
  dispatch(loadGeneralWarrantyDetails(id));
  dispatch(loadGeneralRegistrationDetails(id));
  dispatch(loadGeneralAttachmentImages(id));
  dispatch(loadGeneralAttachmentDocuments(id));
  dispatch(loadGeneralLinkedAssets(id));
};

export const loadGeneralAsset = (
  id: number | string,
): ReduxThunk<Promise<GeneralAsset>> => async dispatch => {
  const {data: asset} = await getGeneralAsset(id);

  // this should be moved on the Tab Component when it has mounted
  dispatch(loadGeneralAssetFullInfo(id));

  if (asset.assetCustomFields) dispatch(setCustomFields(asset.assetCustomFields));

  return asset;
};

export const loadGeneralRegistrationDetails = (
  id: number | string,
): ReduxThunk => async dispatch => {
  //const response = await generalService.getGeneralRegistrationDetails(id);

  //dispatch(setRegistrationDetail(response.data));
};

export const loadGeneralAttachmentImages = (id: number | string): ReduxThunk => async dispatch => {
  //const response = await generalService.getGeneralAttachmentImages(id);

  //dispatch(setImages(response.data));
};

export const loadGeneralAttachmentDocuments = (
  id: number | string,
): ReduxThunk => async dispatch => {
  //const response = await generalService.getGeneralAttachmentDocuments(id);

  //dispatch(setDocuments(response.data));
};

export const loadGeneralWarrantyDetails = (id: number | string): ReduxThunk => async dispatch => {
  //const response = await generalService.getGeneralWarrantyDetails(id);

  //dispatch(setWarrantyDetails(response.data));
};

export const loadGeneralLinkedAssets = (id: number | string): ReduxThunk => async dispatch => {
  //const response = await generalService.getGeneralLinkedAssets(id);

  //dispatch(setLinkedAssets(response.data));
};

export const addOrUpdateGeneralAsset = (
  generalAsset: GeneralAsset,
): ReduxThunk<Promise<AxiosResponse<GeneralAsset>>> => async (_, getState) => {
  const state = getState();
  const consolidatedGeneralAsset = consolidateGeneralAsset(generalAsset, state);

  if (generalAsset.id) return patchGeneralAsset(consolidatedGeneralAsset);

  return postGeneralAsset(consolidatedGeneralAsset);
};

export const consolidateGeneralAsset = (generalAsset: GeneralAsset, state: RootState) => {
  const {
    entityCustomFields,
    // attachmentDocuments,
    // attachmentImages,
    // iWarrantyDetails,
    // iRegistrationDetails,
    // linkedAssets,
  } = state;

  const consolidated: GeneralAsset = {...generalAsset};

  consolidated.assetCustomFields = entityCustomFields;
  //consolidated.generalLinkedAssets = linkedAssets as GeneralLinkedAsset[];
  //consolidated.generalWarrantyDetails = iWarrantyDetails as GeneralWarrantyDetail[];
  //consolidated.generalAttachmentImages = attachmentImages as GeneralAttachmentImage[];
  //consolidated.generalAttachmentDocuments = attachmentDocuments as GeneralAttachmentDocument[];
  //consolidated.generalRegistrationDetails = iRegistrationDetails as GeneralRegistrationDetail[];

  return consolidated;
};
