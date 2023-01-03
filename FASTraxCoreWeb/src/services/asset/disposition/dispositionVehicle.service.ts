import uri from '@app/helpers/endpoints';
import httpService from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import { AxiosResponse } from 'axios';
import  DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import DispositionVehicleDamagedArea from '@app/entities/asset/disposition/vehicle/DispositionVehicleDamagedArea';
import DispositionVehicleRequiredRepair from '@app/entities/asset/disposition/vehicle/DispositionVehicleRequiredRepair';
import DispositionVehicleImage from '@app/entities/asset/disposition/vehicle/DispositionVehicleImage';
import DispositionVehicleDocument from '@app/entities/asset/disposition/vehicle/DispositionVehicleDocument';
import DispositionVehicleApproval from '@app/entities/asset/disposition/vehicle/DispositionVehicleApproval';

export const getDispositionVehicles = async (): Promise<AxiosResponse<DispositionVehicle[]>> => {
  return await http.get(FsxUri.assets.dispositions.vehicles.all);
};

export const getDispositionVehicle = (id: UrlParam) => {
  return httpService.get<DispositionVehicle>(FsxUri.assets.dispositions.vehicles.find(id));
};

export const postDispositionVehicle = (payload: DispositionVehicle): Promise<AxiosResponse> => {
  return httpService.post<DispositionVehicle>(FsxUri.assets.dispositions.vehicles.base, payload);
};

export const patchDispositionVehicle = (payload: DispositionVehicle) => {
  if (!payload.id) return Promise.reject('ID is missing!');
  return httpService.patch<DispositionVehicle>(FsxUri.assets.dispositions.vehicles.update(payload.id), payload);
};

export const deleteDispositionVehicle = (id: number): Promise<AxiosResponse> => {
  if (id <= 0) return Promise.reject('ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.delete(id));
};

export const getDispositionVehicleDamagedAreas = (id: UrlParam) => {
  return http.get<DispositionVehicleDamagedArea[]>(FsxUri.assets.dispositions.vehicles.damagedAreas(id));
};

export const postDispositionVehicleDamagedArea = (dispositionVehicleId: number, payload: DispositionVehicleDamagedArea[]): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.post(uri.assets.dispositions.vehicles.postDamagedAreas(dispositionVehicleId), payload);
};

export const patchDispositionVehicleDamagedArea = (dispositionVehicleId: number, payload: DispositionVehicleDamagedArea[]): Promise<AxiosResponse> => {
  if (!dispositionVehicleId) return Promise.reject('Disposition Vehicle ID is missing');
  return http.patch(uri.assets.dispositions.vehicles.patchDamagedAreas(dispositionVehicleId), payload);
}

export const deleteDispositionVehicleDamagedArea = (dispositionVehicleId: number): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.deleteDamagedAreas(dispositionVehicleId));
};

export const getDispositionVehicleRequiredRepairs = (id: UrlParam) => {
  return http.get<DispositionVehicleRequiredRepair[]>(FsxUri.assets.dispositions.vehicles.requiredRepairs(id));
};

export const postDispositionVehicleRequiredRepair = (dispositionVehicleId: number, payload: DispositionVehicleRequiredRepair[]): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.post(uri.assets.dispositions.vehicles.postRequiredRepairs(dispositionVehicleId), payload);
};

export const patchDispositionVehicleRequiredRepair = (dispositionVehicleId: number, payload: DispositionVehicleRequiredRepair[]): Promise<AxiosResponse> => {
  if (!dispositionVehicleId) return Promise.reject('Disposition Vehicle ID is missing');
  return http.patch(uri.assets.dispositions.vehicles.patchRequiredRepairs(dispositionVehicleId), payload);
}

export const deleteDispositionVehicleRequiredRepair = (dispositionVehicleId: number): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.deleteRequiredRepairs(dispositionVehicleId));
};

export const getDispositionVehicleImages = (id: UrlParam) => {
  return http.get<DispositionVehicleImage[]>(uri.assets.dispositions.vehicles.images(id));
};

export const postDispositionVehicleImage = (dispositionVehicleId: number, payload: DispositionVehicleImage[]): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.post(uri.assets.dispositions.vehicles.postImages(dispositionVehicleId), payload);
};

export const patchDispositionVehicleImage = (dispositionVehicleId: number, payload: DispositionVehicleImage[]): Promise<AxiosResponse> => {
  if (!dispositionVehicleId) return Promise.reject('Disposition Vehicle ID is missing');
  return http.patch(uri.assets.dispositions.vehicles.patchImages(dispositionVehicleId), payload);
}

export const deleteDispositionVehicleImage = (dispositionVehicleId: number): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.deleteImages(dispositionVehicleId));
};

export const getDispositionVehicleDocuments = (id: UrlParam) => {
  return http.get<DispositionVehicleDocument[]>(uri.assets.dispositions.vehicles.documents(id));
};

export const postDispositionVehicleDocument = (dispositionVehicleId: number, payload: DispositionVehicleDocument[]): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.post(uri.assets.dispositions.vehicles.postDocuments(dispositionVehicleId), payload);
};

export const patchDispositionVehicleDocument = (dispositionVehicleId: number, payload: DispositionVehicleDocument[]): Promise<AxiosResponse> => {
  if (!dispositionVehicleId) return Promise.reject('Disposition Vehicle ID is missing');
  return http.patch(uri.assets.dispositions.vehicles.patchDocuments(dispositionVehicleId), payload);
}

export const deleteDispositionVehicleDocument = (dispositionVehicleId: number): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.deleteDocuments(dispositionVehicleId));
};

export const getDispositionVehicleApprovals = (id: UrlParam) => {
  return http.get<DispositionVehicleApproval[]>(uri.assets.dispositions.vehicles.approvals(id));
};

export const postDispositionVehicleApproval = (dispositionVehicleId: number, payload: DispositionVehicleApproval[]): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.post(uri.assets.dispositions.vehicles.postApprovals(dispositionVehicleId), payload);
};

export const patchDispositionVehicleApproval = (dispositionVehicleId: number, payload: DispositionVehicleApproval[]): Promise<AxiosResponse> => {
  if (!dispositionVehicleId) return Promise.reject('Disposition Vehicle ID is missing');
  return http.patch(uri.assets.dispositions.vehicles.patchApprovals(dispositionVehicleId), payload);
}

export const deleteDispositionVehicleApproval = (dispositionVehicleId: number): Promise<AxiosResponse> => {
  if (dispositionVehicleId <= 0) return Promise.reject('Disposition Vehicle ID is missing');
  return http.delete(uri.assets.dispositions.vehicles.deleteApprovals(dispositionVehicleId));
};