import {ReduxThunk} from './../../rootReducer';
import {setProjects, setProject} from './reducers';
import {Project} from '../../../entities/catalog/Project';
import {getProjects} from '../../../services/catalog/projects.service';
import projectService from './../../../services/catalog/projects.service';
import {setProjectHeaderAuth, setProjectSiteHeaderAuth} from '../../../services/http.service';
import {setPagesCurrent} from '@app/store/settings/pages/types';
import {pullPages} from '@app/services/settings/pages.service';
import {setSelectedProjectSite} from '@app/store/catalog/projectsites/projectsites.reducer';

export const loadProjects = (): ReduxThunk => async dispatch => {
  const data = await getProjects();

  dispatch(setProjects(data));
};

export const updateCurrentProject = (projectId: number): ReduxThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const project = state.projects.all.find(p => p.id === projectId);

  if (!state.users.current) return;
  if (!project) return;

  const projectSites = project.projectSites;

  const selected = projectSites
    ? projectSites?.find(ps => ps.default) || projectSites[0]
    : undefined;

  const updatedProject: Project = {...project, selectedProjectSite: selected};

  projectService.Session.currentProject.set({
    ...updatedProject,
    projectImage: undefined,
    selectedProjectSite: undefined,
    userProjects: undefined,
  });

  if (!selected) return;
  if (!project.userProjectSitesRole) return;

  
  const roles = project.userProjectSitesRole.filter(site => site.projectSiteId === selected.id);
  const role = roles && roles[0];
  
  const pages = await pullPages(role.id, state.users.current.id, selected.id);
  dispatch(setPagesCurrent(pages));

  setProjectHeaderAuth(updatedProject.id);

  if (selected) setProjectSiteHeaderAuth(selected.id);

  dispatch(setProject(updatedProject));
};

export const checkCurrentProject = (): ReduxThunk => dispatch => {
  const project = projectService.Session.currentProject.get();

  if (!project) return null;

  setProjectHeaderAuth(project.id);

  if (project.selectedProjectSite) setProjectSiteHeaderAuth(project.selectedProjectSite.id);

  if (!project.selectedProjectSite && project.projectSites && project.projectSites.length > 0) {
    project.selectedProjectSite = project.projectSites[0];
    projectService.Session.currentProject.set(project);
  }

  dispatch(setProject(project));
};

export const changeProjectSite = (id: number): ReduxThunk => (dispatch, getState) => {
  const projects = getState().projects;

  if (!projects.current || !projects.current.projectSites) return;

  const selectedProjectSite = projects.current.projectSites.find(ps => ps.id === id);

  if (!selectedProjectSite) return;

  const updatedProject: Project = {...projects.current, selectedProjectSite};

  projectService.Session.currentProject.set(updatedProject);

  dispatch(setSelectedProjectSite(selectedProjectSite));
};
