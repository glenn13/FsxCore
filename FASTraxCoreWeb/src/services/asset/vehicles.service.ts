import {useQuery} from 'react-query';
import httpService from '../http.service';
import {FsxUri} from '../../helpers/endpoints';
import {generateUUID} from '../../helpers/randoms';
import {Vehicle} from '../../entities/asset/inventory/Vehicle';
import {AttachmentBase64} from '../global/attachments.service';
import VehicleArmourDetail from '../../entities/asset/inventory/VehicleArmourDetail';
import VehicleAttachmentDocument from '@app/entities/asset/inventory/VehicleAttachmentDocument';
import VehicleAttachmentImage from '@app/entities/asset/inventory/VehicleAttachmentImage';
import VehicleLinkedAsset from '../../entities/asset/inventory/VehicleLinkedAsset';
import VehicleRegistrationDetail from '@app/entities/asset/inventory/VehicleRegistrationDetail';
import VehicleWarrantyDetail from '@app/entities/asset/inventory/VehicleWarrantyDetail';

const VEHICLES_KEY = generateUUID();

export const getVehicle = (id: UrlParam, withStandardEntries: boolean = false) => {
  return httpService.get<Vehicle>(FsxUri.assets.vehicles.findFullInfo(id, withStandardEntries));
};

export const getVehicleUnderMaintenances = () => {
  return httpService.get<Vehicle[]>(FsxUri.assets.vehicles.maintenance);
};

export const getVehicleSearch = (query: string) => {
  return httpService.get<Vehicle[]>(FsxUri.assets.vehicles.search(query));
};

export const getVehiclesFirstOrDefaultImage = (ids: number[]) => {
  return httpService.get<AttachmentBase64[]>(FsxUri.assets.vehicles.defaultImages(ids));
};

export const getVehicleRegistrationDetails = (id: UrlParam) => {
  return httpService.get<VehicleRegistrationDetail[]>(
    FsxUri.assets.vehicles.registrationDetails(id),
  );
};

export const getVehicleWarrantyDetails = (id: UrlParam) => {
  return httpService.get<VehicleWarrantyDetail[]>(FsxUri.assets.vehicles.warrantyDetails(id));
};

export const getVehicleArmourDetails = (id: UrlParam) => {
  return httpService.get<VehicleArmourDetail[]>(FsxUri.assets.vehicles.armourDetails(id));
};

export const getVehicleAttachmentImages = (id: UrlParam) => {
  return httpService.get<VehicleAttachmentImage[]>(FsxUri.assets.vehicles.images(id));
};

export const getVehicleAttachmentDocuments = (id: UrlParam) => {
  return httpService.get<VehicleAttachmentDocument[]>(FsxUri.assets.vehicles.documents(id));
};

export const getVehicleLinkedAssets = (id: UrlParam) => {
  return httpService.get<VehicleLinkedAsset[]>(FsxUri.assets.vehicles.linkedAssets(id));
};

export const getVehicles = () => {
  return httpService.get<Vehicle[]>(FsxUri.assets.vehicles.base);
};

export const getVehiclesForGrid = () => {
  return httpService.get<Vehicle[]>(FsxUri.assets.vehicles.forGrid);
};

export const useVehiclesGrid = () => useQuery(VEHICLES_KEY, getVehiclesForGrid);

export const useVehicles = () => useQuery(VEHICLES_KEY, getVehicles);

export const useVehicle = (id: UrlParam, withStandardEntries?: boolean) =>
  useQuery(VEHICLES_KEY, () => getVehicle(id, withStandardEntries));

export const postVehicle = (payload: Vehicle) => {
  return httpService.post(FsxUri.assets.vehicles.base, payload);
};

export const patchVehicle = (payload: Vehicle) => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return httpService.patch(FsxUri.assets.vehicles.update(payload.id), payload);
};

export const deleteVehicle = (id: number) => {
  return httpService.delete<Vehicle>(FsxUri.assets.vehicles.find(id));
};

export default {
  getVehiclesForGrid,
  getVehicle,
  getVehicles,
  post: postVehicle,
  patch: patchVehicle,
};
