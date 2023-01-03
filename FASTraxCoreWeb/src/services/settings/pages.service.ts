import {Page, PageActions} from '../../store/settings/pages/types';
import {Routes as routePages} from '../../routes';
import * as pageModuleService from '@app/services/catalog/pages.modules.service';

const findByKeyName = (name: string) => {
  const routeFiltered = routePages.filter(e => e.name.toLowerCase() === name.toLowerCase());
  return routeFiltered && routeFiltered[0];
};

export const pullPages = async (
  roleId: number,
  userId: number,
  projectSiteId: number,
): Promise<Array<Page>> => {
  const pagesResult = await pageModuleService.getUserModulePermissions(
    roleId,
    userId,
    projectSiteId,
  );

  return pagesResult.data;
};

export const pullActions = async (
  roleId: number,
  userId: number,
  projectSiteId: number,
): Promise<Array<PageActions>> => {
  const pagesActionResult = await pageModuleService.getUserActionPermissions(
    roleId,
    userId,
    projectSiteId,
  );

  return pagesActionResult.data;
};

export default {
  pullPages,
  findByKeyName,
};
