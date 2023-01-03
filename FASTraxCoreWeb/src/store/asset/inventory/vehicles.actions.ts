import {AxiosResponse} from 'axios';
import {ReduxThunk} from '../../rootReducer';
import {RootState} from '@app/store/rootReducer';
import {setImages} from './attachmentImages.reducer';
import {setLinkedAssets} from './linkedAssets.reducers';
import {setDocuments} from './attachmentDocuments.reducer';
import modulesService from '@app/services/global/modules.service';
import {Vehicle} from './../../../entities/asset/inventory/Vehicle';
import {setRegistrationDetail} from './registrationDetails.reducers';
import {setVehicleArmourDetail} from './vehicleArmourDetails.reducers';
import {setCustomFields} from './../../common/entityCustomField.reducers';
import {generateCustomFields} from '@app/store/common/entityCustomField.reducers';
import VehicleLinkedAsset from '@app/entities/asset/inventory/VehicleLinkedAsset';
import VehicleArmourDetail from '@app/entities/asset/inventory/VehicleArmourDetail';
import {setWarrantyDetails} from '@app/store/asset/inventory/warrantyDetails.reducers';
import VehicleWarrantyDetail from '@app/entities/asset/inventory/VehicleWarrantyDetail';
import VehicleAttachmentImage from '@app/entities/asset/inventory/VehicleAttachmentImage';
import VehicleAttachmentDocument from '@app/entities/asset/inventory/VehicleAttachmentDocument';
import VehicleRegistrationDetail from '@app/entities/asset/inventory/VehicleRegistrationDetail';
import {
  postVehicle,
  patchVehicle,
  getVehicle,
  getVehicleWarrantyDetails,
  getVehicleArmourDetails,
  getVehicleRegistrationDetails,
  getVehicleAttachmentImages,
  getVehicleAttachmentDocuments,
  getVehicleLinkedAssets,
} from '../../../services/asset/vehicles.service';

export const loadVehicleFullInfo = (id: string | number): ReduxThunk => async dispatch => {
  dispatch(loadVehicleWarrantyDetails(id));
  dispatch(loadVehicleArmourDetails(id));
  dispatch(loadVehicleRegistrationDetails(id));
  dispatch(loadVehicleAttachmentImages(id));
  dispatch(loadVehicleAttachmentDocuments(id));
  dispatch(loadVehicleLinkedAssets(id));
};

export const loadVehicle = (
  id: string | number,
): ReduxThunk<Promise<Vehicle>> => async dispatch => {
  const {data: vehicle} = await getVehicle(id);

  // this should be moved on the Tab Component when it has mounted
  dispatch(loadVehicleFullInfo(id));

  if (vehicle.assetCustomFields) dispatch(setCustomFields(vehicle.assetCustomFields));

  return vehicle;
};

export const loadVehicleCustomFields = (): ReduxThunk => async dispatch => {
  const response = await modulesService.get.forms.asset.vehicles();

  if (!response.data.customFields) return console.error('Custom Fields property cannot be null!');

  return dispatch(generateCustomFields(response.data.customFields));
};

export const loadVehicleRegistrationDetails = (
  id: number | string,
): ReduxThunk => async dispatch => {
  const response = await getVehicleRegistrationDetails(id);

  dispatch(setRegistrationDetail(response.data));
};

export const loadVehicleAttachmentImages = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getVehicleAttachmentImages(id);

  dispatch(setImages(response.data));
};

export const loadVehicleAttachmentDocuments = (
  id: number | string,
): ReduxThunk => async dispatch => {
  const response = await getVehicleAttachmentDocuments(id);

  dispatch(setDocuments(response.data));
};

export const loadVehicleWarrantyDetails = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getVehicleWarrantyDetails(id);

  dispatch(setWarrantyDetails(response.data));
};

export const loadVehicleArmourDetails = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getVehicleArmourDetails(id);

  dispatch(setVehicleArmourDetail(response.data));
};

export const loadVehicleLinkedAssets = (id: number | string): ReduxThunk => async dispatch => {
  const response = await getVehicleLinkedAssets(id);

  dispatch(setLinkedAssets(response.data));
};

export const addOrUpdateVehicle = (
  vehicle: Vehicle,
): ReduxThunk<Promise<AxiosResponse<Vehicle>>> => async (_, getState) => {
  const state = getState();
  const consolidatedVehicle = consolidateVehicle(vehicle, state);

  if (vehicle.id) return patchVehicle(consolidatedVehicle);

  return postVehicle(consolidatedVehicle);
};

export const consolidateVehicle = (vehicle: Vehicle, state: RootState) => {
  const {
    entityCustomFields,
    attachmentDocuments,
    attachmentImages,
    iWarrantyDetails,
    iRegistrationDetails,
    vehicleArmourDetails,
    linkedAssets,
  } = state;

  const consolidated: Vehicle = {...vehicle};

  consolidated.assetCustomFields = entityCustomFields;
  consolidated.vehicleLinkedAssets = linkedAssets as VehicleLinkedAsset[];
  consolidated.vehicleArmourDetails = vehicleArmourDetails as VehicleArmourDetail[];
  consolidated.vehicleWarrantyDetails = iWarrantyDetails as VehicleWarrantyDetail[];
  consolidated.vehicleAttachmentImages = attachmentImages as VehicleAttachmentImage[];
  consolidated.vehicleAttachmentDocuments = attachmentDocuments as VehicleAttachmentDocument[];
  consolidated.vehicleRegistrationDetails = iRegistrationDetails as VehicleRegistrationDetail[];

  return consolidated;
};
