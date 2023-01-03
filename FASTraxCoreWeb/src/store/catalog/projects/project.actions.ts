import * as projectRoleService from '@app/services/catalog/project.role.service';
import * as projectSiteService from '@app/services/catalog/project.site.service';

import {Project, ProjectRole, ProjectSite} from '@app/entities/catalog';
import {getProjectById, patchProject, postProject} from '@app/services/catalog/project.service';

import {AxiosResponse} from 'axios';
import {ReduxThunk} from '@app/store/rootReducer';
import {UUIDToArray} from '@app/utils/uuid.util';
import {setProjectRole} from '@app/store/catalog/projectroles/projectroles.reducer';
import {setProjectSite} from '@app/store/catalog/projectsites/projectsites.reducer';

export const loadProject = (
  id: number | string,
): ReduxThunk<Promise<Project>> => async dispatch => {
  const {data: project} = await getProjectById(id);

  dispatch(loadProjectRoles(id));
  //   dispatch(loadProjectSites(id));

  return project;
};

export const loadStaticRolesRoles = (): ReduxThunk => async dispatch => {
  const {data: staticRoles} = await projectRoleService.getStaticProjectRoles();

  dispatch(setProjectRole(UUIDToArray<ProjectRole>(staticRoles)));
};

export const loadProjectRoles = (id: number | string): ReduxThunk => async dispatch => {
  const {data: staticRoles} = await projectRoleService.getStaticProjectRoles();
  const {data: projectRoles} = await projectRoleService.getProjectRolesByProjectId(id);

  const exist = staticRoles.some(r => projectRoles.findIndex(pr => pr.title === r.title));
  const pRoles = exist ? projectRoles : staticRoles;

  dispatch(setProjectRole(UUIDToArray<ProjectRole>(pRoles)));
};

export const loadProjectSites = (id: number | string): ReduxThunk => async dispatch => {
  const {data: projectSites} = await projectSiteService.getProjectSitesByProjectId(id);

  dispatch(setProjectSite(UUIDToArray<ProjectSite>(projectSites)));
};

export const loadAllProjectSites = (): ReduxThunk => async dispatch => {
  const {data: projectSites} = await projectSiteService.getAllProjectSites();

  dispatch(setProjectSite(UUIDToArray<ProjectSite>(projectSites)));
};

export const loadAllProjectSitesByCustomer = (
  customerId: number | null,
): ReduxThunk => async dispatch => {
  const {data: projectSites} = await projectSiteService.getAllProjectSitesByCustomer(customerId);

  dispatch(setProjectSite(UUIDToArray<ProjectSite>(projectSites)));
};

export const addOrUpdateProject = (
  project: Project,
): ReduxThunk<Promise<AxiosResponse<Project>>> => async (_, getState) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const state = getState();

  if (project.id) return patchProject(project);

  return postProject(project);
};
