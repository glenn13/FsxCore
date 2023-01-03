import {useQuery} from 'react-query';
import httpService from '../../http.service';
import {FsxUri} from '@app/helpers/endpoints';
import {generateUUID} from '@app/helpers/randoms';
import {Component} from '@app/entities/asset/inventory/Component';
import {AttachmentBase64} from '@app/services/global/attachments.service';
import ComponentLinkedAsset from '@app/entities/asset/inventory/ComponentLinkedAsset';
import ComponentWarrantyDetail from '@app/entities/asset/inventory/ComponentWarrantyDetail';
import ComponentAttachmentImage from '@app/entities/asset/inventory/ComponentAttachmentImage';
import ComponentRegistrationDetail from '@app/entities/asset/inventory/ComponentRegistrationDetail';
import ComponentAttachmentDocument from '@app/entities/asset/inventory/ComponentAttachmentDocument';

const COMPONENTS_GRID_KEY = generateUUID();

export const getComponents = () => {
  return httpService.get<Component[]>(FsxUri.assets.components.base);
};

export const getComponentUnderMaintenances = () => {
  return httpService.get<Component[]>(FsxUri.assets.components.maintenance);
};

export const getComponentSearch = (query: string) => {
  return httpService.get<Component[]>(FsxUri.assets.components.search(query));
};

export const getComponentsFirstOrDefaultImage = (ids: number[]) => {
  return httpService.get<AttachmentBase64[]>(FsxUri.assets.components.defaultImages(ids));
};

export const getComponentsForGrid = () => {
  return httpService.get<Component[]>(FsxUri.assets.components.forGrid);
};

export const useComponentsGrid = () => useQuery(COMPONENTS_GRID_KEY, getComponentsForGrid);

export const getComponentRegistrationDetails = (id: UrlParam) => {
  return httpService.get<ComponentRegistrationDetail[]>(
    FsxUri.assets.components.registrationDetails(id),
  );
};

export const getComponentWarrantyDetails = (id: UrlParam) => {
  return httpService.get<ComponentWarrantyDetail[]>(FsxUri.assets.components.warrantyDetails(id));
};

export const getComponentAttachmentImages = (id: UrlParam) => {
  return httpService.get<ComponentAttachmentImage[]>(FsxUri.assets.components.images(id));
};

export const getComponentAttachmentDocuments = (id: UrlParam) => {
  return httpService.get<ComponentAttachmentDocument[]>(FsxUri.assets.components.documents(id));
};

export const getComponentLinkedAssets = (id: UrlParam) => {
  return httpService.get<ComponentLinkedAsset[]>(FsxUri.assets.components.linkedAssets(id));
};

export const getComponent = (id: UrlParam, withStandardEntries: boolean = false) => {
  return httpService.get<Component>(FsxUri.assets.components.findFullInfo(id, withStandardEntries));
};

export const postComponent = (payload: Component) => {
  return httpService.post<Component>(FsxUri.assets.components.base, payload);
};

export const patchComponent = (payload: Component) => {
  if (!payload.id) return Promise.reject('ID is missing!');

  return httpService.patch<Component>(FsxUri.assets.components.update(payload.id), payload);
};

export const deleteComponent = (id: UrlParam) => {
  return httpService.delete<Component>(FsxUri.assets.components.find(id));
};

export default {
  getComponentsForGrid,
  getComponents,
  getComponent,
  post: postComponent,
  patch: patchComponent,
};
