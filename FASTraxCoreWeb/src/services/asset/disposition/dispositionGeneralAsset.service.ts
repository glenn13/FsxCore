import uri from '@app/helpers/endpoints';
import httpService from '@app/services/http.service';
import { FsxUri } from '@app/helpers/endpoints';
import http from '@app/services/http.service';
import { AxiosResponse } from 'axios';
import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import DispositionGeneralAssetDamagedArea from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDamagedArea';
import DispositionGeneralAssetRequiredRepair from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetRequiredRepair';
import DispositionGeneralAssetImage from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetImage';
import DispositionGeneralAssetDocument from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDocument';
import DispositionGeneralAssetApproval from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetApproval';
import { useQuery } from 'react-query';

const SUMMARY_KEY = 'DISPOSITION_GENERAL_ASSET';

export const useDispositionGeneralAssetForGrid = () =>
    useQuery(SUMMARY_KEY,getDispositionGeneralAssets);

export const getDispositionGeneralAssets = async (): Promise<AxiosResponse<DispositionGeneralAsset[]>> => {
  return await http.get(FsxUri.assets.dispositions.generals.all);
};
  
export const getDispositionGeneralAsset = (id: UrlParam) => {
  return httpService.get<DispositionGeneralAsset>(uri.assets.dispositions.generals.find(id));
};

export const postDispositionGeneralAsset = (payload: DispositionGeneralAsset): Promise<AxiosResponse> => {
  return httpService.post<DispositionGeneralAsset>(FsxUri.assets.dispositions.generals.base, payload);
};

export const patchDispositionGeneralAsset = (payload: DispositionGeneralAsset) => {
  if (!payload.id) return Promise.reject('ID is missing!');
  return httpService.patch<DispositionGeneralAsset>(FsxUri.assets.dispositions.generals.update(payload.id), payload);
};

export const deleteDispositionGeneralAsset = (id: number): Promise<AxiosResponse> => {
  if (id <= 0) return Promise.reject('ID is missing');
  return http.delete(uri.assets.dispositions.generals.delete(id));
};

export const getDispositionGeneralAssetDamagedAreas = (id: UrlParam) => {
  return http.get<DispositionGeneralAssetDamagedArea[]>(FsxUri.assets.dispositions.generals.damagedAreas(id));
};

export const postDispositionGeneralAssetDamagedArea = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetDamagedArea[]): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.post(uri.assets.dispositions.generals.postDamagedAreas(dispositionGeneralAssetId), payload);
};

export const patchDispositionGeneralAssetDamagedArea = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetDamagedArea[]): Promise<AxiosResponse> => {
  if (!dispositionGeneralAssetId) return Promise.reject('Disposition General Asset ID is missing');
  return http.patch(uri.assets.dispositions.generals.patchDamagedAreas(dispositionGeneralAssetId), payload);
}

export const deleteDispositionGeneralAssetDamagedArea = (dispositionGeneralAssetId: number): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.delete(uri.assets.dispositions.generals.deleteDamagedAreas(dispositionGeneralAssetId));
};

export const getDispositionGeneralAssetRequiredRepairs = (id: UrlParam) => {
  return http.get<DispositionGeneralAssetRequiredRepair[]>(FsxUri.assets.dispositions.generals.requiredRepairs(id));
};

export const postDispositionGeneralAssetRequiredRepair = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetRequiredRepair[]): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.post(uri.assets.dispositions.generals.postRequiredRepairs(dispositionGeneralAssetId), payload);
};

export const patchDispositionGeneralAssetRequiredRepair = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetRequiredRepair[]): Promise<AxiosResponse> => {
  if (!dispositionGeneralAssetId) return Promise.reject('Disposition General Asset ID is missing');
  return http.patch(uri.assets.dispositions.generals.patchRequiredRepairs(dispositionGeneralAssetId), payload);
}

export const deleteDispositionGeneralAssetRequiredRepair = (dispositionGeneralAssetId: number): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.delete(uri.assets.dispositions.generals.deleteRequiredRepairs(dispositionGeneralAssetId));
};

export const getDispositionGeneralAssetImages = (id: UrlParam) => {
  return http.get<DispositionGeneralAssetImage[]>(uri.assets.dispositions.generals.images(id));
};

export const postDispositionGeneralAssetImage = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetImage[]): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.post(uri.assets.dispositions.generals.postImages(dispositionGeneralAssetId), payload);
};

export const patchDispositionGeneralAssetImage = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetImage[]): Promise<AxiosResponse> => {
  if (!dispositionGeneralAssetId) return Promise.reject('Disposition General Asset ID is missing');
  return http.patch(uri.assets.dispositions.generals.patchImages(dispositionGeneralAssetId), payload);
}

export const deleteDispositionGeneralAssetImage = (dispositionGeneralAssetId: number): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition General Asset ID is missing');
  return http.delete(uri.assets.dispositions.generals.deleteImages(dispositionGeneralAssetId));
};

export const getDispositionGeneralAssetDocuments = (id: UrlParam) => {
  return http.get<DispositionGeneralAssetDocument[]>(uri.assets.dispositions.generals.documents(id));
};

export const postDispositionGeneralAssetDocument = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetDocument[]): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.post(uri.assets.dispositions.generals.postDocuments(dispositionGeneralAssetId), payload);
};

export const patchDispositionGeneralAssetDocument = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetDocument[]): Promise<AxiosResponse> => {
  if (!dispositionGeneralAssetId) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.patch(uri.assets.dispositions.generals.patchDocuments(dispositionGeneralAssetId), payload);
}

export const deleteDispositionGeneralAssetDocument = (dispositionGeneralAssetId: number): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.delete(uri.assets.dispositions.generals.deleteDocuments(dispositionGeneralAssetId));
};

export const getDispositionGeneralAssetApprovals = (id: UrlParam) => {
  return http.get<DispositionGeneralAssetApproval[]>(uri.assets.dispositions.generals.approvals(id));
};

export const postDispositionGeneralAssetApproval = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetApproval[]): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.post(uri.assets.dispositions.generals.postApprovals(dispositionGeneralAssetId), payload);
};

export const patchDispositionGeneralAssetApproval = (dispositionGeneralAssetId: number, payload: DispositionGeneralAssetApproval[]): Promise<AxiosResponse> => {
  if (!dispositionGeneralAssetId) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.patch(uri.assets.dispositions.generals.patchApprovals(dispositionGeneralAssetId), payload);
}

export const deleteDispositionGeneralAssetApproval = (dispositionGeneralAssetId: number): Promise<AxiosResponse> => {
  if (dispositionGeneralAssetId <= 0) return Promise.reject('Disposition GeneralAsset ID is missing');
  return http.delete(uri.assets.dispositions.generals.deleteApprovals(dispositionGeneralAssetId));
};