import uri from '@app/helpers/endpoints';
import httpService from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import { AxiosResponse } from 'axios';
import  DispositionComponent from '@app/entities/asset/disposition/component/DispositionComponent';
import DispositionComponentDamagedArea from '@app/entities/asset/disposition/component/DispositionComponentDamagedArea';
import DispositionComponentRequiredRepair from '@app/entities/asset/disposition/component/DispositionComponentRequiredRepair';
import DispositionComponentImage from '@app/entities/asset/disposition/component/DispositionComponentImage';
import DispositionComponentDocument from '@app/entities/asset/disposition/component/DispositionComponentDocument';
import DispositionComponentApproval from '@app/entities/asset/disposition/component/DispositionComponentApproval';

export const getDispositionComponents = async (): Promise<AxiosResponse<DispositionComponent[]>> => {
  return await http.get(FsxUri.assets.dispositions.components.all);
};

export const getDispositionComponent = (id: UrlParam) => {
  return httpService.get<DispositionComponent>(FsxUri.assets.dispositions.components.find(id));
};

export const postDispositionComponent = (payload: DispositionComponent): Promise<AxiosResponse> => {
  return httpService.post<DispositionComponent>(FsxUri.assets.dispositions.components.base, payload);
};

export const patchDispositionComponent = (payload: DispositionComponent) => {
  if (!payload.id) return Promise.reject('ID is missing!');
  return httpService.patch<DispositionComponent>(FsxUri.assets.dispositions.components.update(payload.id), payload);
};

export const deleteDispositionComponent = (id: number): Promise<AxiosResponse> => {
  if (id <= 0) return Promise.reject('ID is missing');
  return http.delete(uri.assets.dispositions.components.delete(id));
};

export const getDispositionComponentDamagedAreas = (id: UrlParam) => {
  return http.get<DispositionComponentDamagedArea[]>(FsxUri.assets.dispositions.components.damagedAreas(id));
};

export const postDispositionComponentDamagedArea = (dispositionComponentId: number, payload: DispositionComponentDamagedArea[]): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.post(uri.assets.dispositions.components.postDamagedAreas(dispositionComponentId), payload);
};

export const patchDispositionComponentDamagedArea = (dispositionComponentId: number, payload: DispositionComponentDamagedArea[]): Promise<AxiosResponse> => {
  if (!dispositionComponentId) return Promise.reject('Disposition Component ID is missing');
  return http.patch(uri.assets.dispositions.components.patchDamagedAreas(dispositionComponentId), payload);
}

export const deleteDispositionComponentDamagedArea = (dispositionComponentId: number): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.delete(uri.assets.dispositions.components.deleteDamagedAreas(dispositionComponentId));
};

export const getDispositionComponentRequiredRepairs = (id: UrlParam) => {
  return http.get<DispositionComponentRequiredRepair[]>(FsxUri.assets.dispositions.components.requiredRepairs(id));
};

export const postDispositionComponentRequiredRepair = (dispositionComponentId: number, payload: DispositionComponentRequiredRepair[]): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.post(uri.assets.dispositions.components.postRequiredRepairs(dispositionComponentId), payload);
};

export const patchDispositionComponentRequiredRepair = (dispositionComponentId: number, payload: DispositionComponentRequiredRepair[]): Promise<AxiosResponse> => {
  if (!dispositionComponentId) return Promise.reject('Disposition Component ID is missing');
  return http.patch(uri.assets.dispositions.components.patchRequiredRepairs(dispositionComponentId), payload);
}

export const deleteDispositionComponentRequiredRepair = (dispositionComponentId: number): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.delete(uri.assets.dispositions.components.deleteRequiredRepairs(dispositionComponentId));
};

export const getDispositionComponentImages = (id: UrlParam) => {
  return http.get<DispositionComponentImage[]>(uri.assets.dispositions.components.images(id));
};

export const postDispositionComponentImage = (dispositionComponentId: number, payload: DispositionComponentImage[]): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.post(uri.assets.dispositions.components.postImages(dispositionComponentId), payload);
};

export const patchDispositionComponentImage = (dispositionComponentId: number, payload: DispositionComponentImage[]): Promise<AxiosResponse> => {
  if (!dispositionComponentId) return Promise.reject('Disposition Component ID is missing');
  return http.patch(uri.assets.dispositions.components.patchImages(dispositionComponentId), payload);
}

export const deleteDispositionComponentImage = (dispositionComponentId: number): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.delete(uri.assets.dispositions.components.deleteImages(dispositionComponentId));
};

export const getDispositionComponentDocuments = (id: UrlParam) => {
  return http.get<DispositionComponentDocument[]>(uri.assets.dispositions.components.documents(id));
};

export const postDispositionComponentDocument = (dispositionComponentId: number, payload: DispositionComponentDocument[]): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.post(uri.assets.dispositions.components.postDocuments(dispositionComponentId), payload);
};

export const patchDispositionComponentDocument = (dispositionComponentId: number, payload: DispositionComponentDocument[]): Promise<AxiosResponse> => {
  if (!dispositionComponentId) return Promise.reject('Disposition Component ID is missing');
  return http.patch(uri.assets.dispositions.components.patchDocuments(dispositionComponentId), payload);
}

export const deleteDispositionComponentDocument = (dispositionComponentId: number): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.delete(uri.assets.dispositions.components.deleteDocuments(dispositionComponentId));
};

export const getDispositionComponentApprovals = (id: UrlParam) => {
  return http.get<DispositionComponentApproval[]>(uri.assets.dispositions.components.approvals(id));
};

export const postDispositionComponentApproval = (dispositionComponentId: number, payload: DispositionComponentApproval[]): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.post(uri.assets.dispositions.components.postApprovals(dispositionComponentId), payload);
};

export const patchDispositionComponentApproval = (dispositionComponentId: number, payload: DispositionComponentApproval[]): Promise<AxiosResponse> => {
  if (!dispositionComponentId) return Promise.reject('Disposition Component ID is missing');
  return http.patch(uri.assets.dispositions.components.patchApprovals(dispositionComponentId), payload);
}

export const deleteDispositionComponentApproval = (dispositionComponentId: number): Promise<AxiosResponse> => {
  if (dispositionComponentId <= 0) return Promise.reject('Disposition Component ID is missing');
  return http.delete(uri.assets.dispositions.components.deleteApprovals(dispositionComponentId));
};