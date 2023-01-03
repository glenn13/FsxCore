import * as projectSiteService from '@app/services/catalog/project.site.service';
import * as userService from '@app/services/catalog/user.service';

import {ChangePassword, IUserFormData, ProjectRole, ProjectSite, User} from '@app/entities/catalog';

import {AxiosResponse} from 'axios';
import {ReduxThunk} from '@app/store/rootReducer';
import {UUIDToArray} from '@app/utils/uuid.util';
import _ from 'lodash';
import {
  loadAllProjectSites,
  loadAllProjectSitesByCustomer,
} from '@app/store/catalog/projects/project.actions';
import {setProjectSiteByUser} from '@app/store/catalog/projectsites/projectsites.reducer';
import {setUserProjectRoles} from '@app/store/catalog/projectroles/projectroles.reducer';
import {setUserProjectSiteRole} from '@app/store/catalog/users/user.projectsiterole.reducer';

export const loadUser = (id: number | string): ReduxThunk<Promise<User>> => async (
  dispatch,
  getState,
) => {
  const {data: user} = await userService.getUserById(id);

  const isSuperAdmin = user && (user.userAdmin?.superAdmin || false);

  if (!isSuperAdmin) dispatch(loadAllProjectSitesByCustomer(user?.customerId));
  else dispatch(loadAllProjectSites());

  if (user.userProjects) {
    var allProjectSites = _.flatten(user.userProjectSites).map(item => {
      if (item && item.projectSite) {
        return {
          ...item.projectSite,
          visible: item.visible,
          userProjectSitesRole:
            user.userProjectSitesRole &&
            user.userProjectSitesRole.filter(d => d.projectSiteId === item.projectSiteId),
        };
      } else return {} as ProjectSite;
    });

    dispatch(setProjectSiteByUser(allProjectSites));

    var allProjectRoles = _.flatten(user.userProjectSitesRole).map(item => {
      if (item && item.projectRole) {
        return {...item.projectRole};
      } else return {} as ProjectRole;
    });

    dispatch(setUserProjectRoles(allProjectRoles));
  }

  return user;
};

export const loadAllUserProjectSites = (): ReduxThunk => async (dispatch, get) => {
  const {data: projectSites} = await projectSiteService.getAllProjectSites();
  //   const {data: userProjectsSites} = await userService.getAllProjectSites();

  dispatch(setUserProjectSiteRole(UUIDToArray<ProjectSite>(projectSites)));
};

export const addOrUpdateUser = (
  user: IUserFormData,
): ReduxThunk<Promise<AxiosResponse<User>>> => async (_, getState) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const state = getState();

  if (user.id) return userService.patchUser(user);

  return userService.postUser(user);
};

export const ChangeUserPassword = (
  userPass: ChangePassword,
): ReduxThunk<Promise<AxiosResponse<User>>> => async (_, getState) => {
  return userService.postChangePassword(userPass);
};
