import http from '../http.service';
import uri from '@app/helpers/endpoints';
import {PageModuleAccess, ModulePermissionCustom} from '@app/entities/catalog';
import {AxiosResponse} from 'axios';
import {Page, PageActions} from '@app/store/settings/pages/types';
import {ModulePermissionDefault} from '@app/entities/catalog';
import {useQuery} from 'react-query';
import {generateUUID} from '@app/helpers/randoms';

const KEY = generateUUID();

export const getModulesPermission = async (id: UrlParam) => {
  return http.get<ModulePermissionDefault[]>(uri.catalog.pages.permissions.findByRole(id));
};

export const getModulesPermissionByUser = async (
  roleId: number,
  userId: number,
  projectSiteId: number,
) => {
  return http.get<ModulePermissionCustom[]>(
    uri.catalog.pages.permissions.findByUserRoleProjectSite(roleId, userId, projectSiteId),
  );
};

export const getUserModulePermissions = async (
  roleId: number,
  userId: number,
  projectSiteId: number,
) => {
  return http.get<Page[]>(
    uri.catalog.pages.modules.permissions.find(roleId, userId, projectSiteId),
  );
};

export const getUserActionPermissions = async (
  roleId: number,
  userId: number,
  projectSiteId: number,
) => {
  return http.get<PageActions[]>(
    uri.catalog.pages.actions.permissions.find(roleId, userId, projectSiteId),
  );
};
