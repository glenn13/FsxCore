import * as pagesService from '@app/services/catalog/pages.modules.service';

import {
  ModulePermissionDefault,
  ModulePermissionCustom,
  PageModuleAccess,
} from '@app/entities/catalog/Pages';

import {ReduxThunk} from '@app/store/rootReducer';
import _ from 'lodash';
import {setDefaultPermission} from '@app/store/settings/permissions/permission.default.reducer';
import {setCustomPermissionTreeValue} from '@app/store/settings/permissions/permission.custom.reducer';

const mergeList = (item1: PageModuleAccess[], item2: PageModuleAccess[]): PageModuleAccess[] =>
  item1.map(item => {
    const findModule = item2.filter(
      c =>
        c.accessModuleId === item.accessModuleId &&
        c.parentAccessModuleId === item.parentAccessModuleId,
    );

    return {
      ...item,
      ...findModule[0],
    };
  });

export const updatePermissions = (
  modules: ModulePermissionDefault[] = [],
  id: number,
): ReduxThunk => async dispatch => {
  const {data} = await pagesService.getModulesPermission(id);

  if (modules.length > 0) {
    _.each(data, (value: any, indx: number) => {
      var hasFoundValue = modules.some(r => r.roleId === id && r.name === value.name);

      if (!hasFoundValue) {
        value.visible = false;
        modules = [...modules, value];
      }
    });

    dispatch(setDefaultPermission(_.orderBy(modules, 'accessModuleId')));
  } else dispatch(setDefaultPermission(data));
};

export const updatePermissionsByUser = (
  modules: ModulePermissionCustom[] = [],
  roleId: number,
  userId: number,
  projectSiteId: number,
): ReduxThunk => async dispatch => {
  const {data} = await pagesService.getModulesPermissionByUser(roleId, userId, projectSiteId);

  if (modules.length > 0) {
    _.each(data, (value: any, indx: number) => {
      var hasFoundValue = modules.some(
        r =>
          r.roleId === roleId &&
          r.userId === userId &&
          r.projectSiteId === projectSiteId &&
          r.name === value.name,
      );

      if (!hasFoundValue) {
        value.visible = false;
        modules = [...modules, value];
      }
    });

    dispatch(setCustomPermissionTreeValue(_.orderBy(modules, 'accessModuleId')));
  } else dispatch(setCustomPermissionTreeValue(data));
};
