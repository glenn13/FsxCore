import {BehaviorSubject} from 'rxjs';
import userService from './user.service';
import {Project} from '../entities/catalog/Project';
import projectsService from './catalog/projects.service';
import {Auth, ILoginRequest, ISignOutRequest, ILoginVerificationRequest} from '../helpers/api.endpoints';
import {clearProjectOrProjectSiteHeaders} from './http.service';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('CURRENT_USER') || '{}'),
);

const currentProjectSubject = new BehaviorSubject(
  JSON.parse(sessionStorage.getItem('CURRENT_PROJECT') || '{}'),
);

const currentProject = {
  get value(): Project {
    return currentProjectSubject.value;
  },
  observe: () => currentProjectSubject.asObservable(),
  refetch: () => {
    currentProjectSubject.next(JSON.parse(sessionStorage.getItem('CURRENT_PROJECT') || '{}'));
  },
};

const currentUser = {
  get value() {
    return currentUserSubject.value;
  },
  observe: () => currentUserSubject.asObservable(),
  refetch: () => {
    currentUserSubject.next(JSON.parse(localStorage.getItem('CURRENT_USER') || '{}'));
  },
};

export const login = async (request: ILoginRequest) => {
  const {data: user} = await Auth.authenticate(request);

  return user;
};

export const logout = async () => {
  const currentUser = userService.Local.currentUser.get();

  if (!currentUser) return;

  const request: ISignOutRequest = {
    username: currentUser.username,
    token: currentUser.jwtToken,
  };

  await Auth.logoutUser(request);

  userService.Local.currentUser.remove();
  projectsService.Session.currentProject.remove();
};

export const removeSelectedProject = () => {
  projectsService.Session.currentProject.remove();
  clearProjectOrProjectSiteHeaders();
};


export const verifyClientCode = async (request: ILoginVerificationRequest) =>  await Auth.verifyClientCode(request);

export default {
  login,
  verifyClientCode,
  currentUser,
  currentProject,
};
