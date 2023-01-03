import {AxiosResponse} from 'axios';
import {ReduxThunk} from '../../rootReducer';
import {RootState} from './../../rootReducer';
import {setImages} from './attachmentImages.reducer';
import {setLinkedAssets} from './linkedAssets.reducers';
import {setDocuments} from './attachmentDocuments.reducer';
import modulesService from '@app/services/global/modules.service';
import {setRegistrationDetail} from './registrationDetails.reducers';
import {Component} from './../../../entities/asset/inventory/Component';
import {setCustomFields} from './../../common/entityCustomField.reducers';
import {generateCustomFields} from '@app/store/common/entityCustomField.reducers';
import ComponentLinkedAsset from '@app/entities/asset/inventory/ComponentLinkedAsset';
import {setWarrantyDetails} from '@app/store/asset/inventory/warrantyDetails.reducers';
import ComponentWarrantyDetail from '@app/entities/asset/inventory/ComponentWarrantyDetail';
import ComponentAttachmentImage from '@app/entities/asset/inventory/ComponentAttachmentImage';
import ComponentAttachmentDocument from '@app/entities/asset/inventory/ComponentAttachmentDocument';
import ComponentRegistrationDetail from '@app/entities/asset/inventory/ComponentRegistrationDetail';
import {
  patchComponent,
  postComponent,
  getComponent,
  getComponentRegistrationDetails,
  getComponentAttachmentImages,
  getComponentAttachmentDocuments,
  getComponentWarrantyDetails,
  getComponentLinkedAssets,
} from '../../../services/asset/inventory/components.service';

export const loadComponentFullInfo = (id: number | string): ReduxThunk => async dispatch => {
  dispatch(loadComponentWarrantyDetails(id));
  dispatch(loadComponentRegistrationDetails(id));
  dispatch(loadComponentAttachmentImages(id));
  dispatch(loadComponentAttachmentDocuments(id));
  dispatch(loadComponentLinkedAssets(id));
};

export const loadComponentCustomFields = (): ReduxThunk => async dispatch => {
  const response = await modulesService.get.forms.asset.components();

  if (!response.data.customFields) return console.error('Custom Fields property cannot be null!');

  return dispatch(generateCustomFields(response.data.customFields));
};

export const loadComponentRegistrationDetails = (
  id: number | string,
): ReduxThunk => async dispatch => {
  const response = await getComponentRegistrationDetails(id);

  dispatch(setRegistrationDetail(response.data));
};

export const loadComponentAttachmentImages = (
  id: number | string,
): ReduxThunk => async dispatch => {
  const response = await getComponentAttachmentImages(id);

  dispatch(setImages(response.data));
};

export const loadComponentAttachmentDocuments = (
  id: number | string,
): ReduxThunk => async dispatch => {
  const response = await getComponentAttachmentDocuments(id);

  dispatch(setDocuments(response.data));
};

export const loadComponentWarrantyDetails = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getComponentWarrantyDetails(id);

  dispatch(setWarrantyDetails(response.data));
};

export const loadComponentLinkedAssets = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getComponentLinkedAssets(id);

  dispatch(setLinkedAssets(response.data));
};

export const loadComponent = (
  id: number | string,
): ReduxThunk<Promise<Component>> => async dispatch => {
  const {data: comp} = await getComponent(id);

  // this should be moved on the Tab Component when it has mounted
  dispatch(loadComponentFullInfo(id));

  if (comp.assetCustomFields) dispatch(setCustomFields(comp.assetCustomFields));

  return comp;
};

export const addOrUpdateComponent = (
  component: Component,
): ReduxThunk<Promise<AxiosResponse<Component>>> => async (_, getState) => {
  const state = getState();
  const consolidatedComponent = consolidateComponent(component, state);

  if (component.id) return patchComponent(consolidatedComponent);

  return postComponent(consolidatedComponent);
};

export const consolidateComponent = (Component: Component, state: RootState) => {
  const {
    entityCustomFields,
    attachmentDocuments,
    attachmentImages,
    iWarrantyDetails,
    iRegistrationDetails,
    linkedAssets,
  } = state;

  const consolidated: Component = {...Component};

  consolidated.assetCustomFields = entityCustomFields;
  consolidated.componentLinkedAssets = linkedAssets as ComponentLinkedAsset[];
  consolidated.componentWarrantyDetails = iWarrantyDetails as ComponentWarrantyDetail[];
  consolidated.componentAttachmentImages = attachmentImages as ComponentAttachmentImage[];
  consolidated.componentAttachmentDocuments = attachmentDocuments as ComponentAttachmentDocument[];
  consolidated.componentRegistrationDetails = iRegistrationDetails as ComponentRegistrationDetail[];

  return consolidated;
};
