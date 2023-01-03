import {ReduxThunk} from './../../rootReducer';
import {User} from '@app/entities/catalog/User';
import {setUser, setUsers} from './reducers';
import {ILoginRequest, ILoginVerificationResponse, ILoginVerificationRequest} from './../../../helpers/api.endpoints';
import authService, {logout} from '../../../services/auth.service';
import {getByUserId, getUsers} from '../../../services/user.service';
import userService, {getProjectsByUser} from './../../../services/user.service';
import {updateCurrentProject} from '../projects/actions';
import {setProjects} from '../projects/reducers';
import {AxiosResponse} from 'axios';
import {Project, ProjectRole, ProjectSite} from '@app/entities/catalog';

export const initLoginUser = (): ReduxThunk => async dispatch => {
  const {id} = authService.currentUser.value as User;
  if (!id) return console.error("doesn't have id");

  const {data} = await getByUserId(id);
  return dispatch(setUser(data));
};

export const loadUserProjects = (id: number): ReduxThunk => async (dispatch, getState) => {
  const {data} = await getProjectsByUser(id);

  dispatch(setProjects(data));

  const currentUser = userService.Local.currentUser.get();
  if (currentUser && (currentUser.isSuperAdmin || currentUser.isAdmin)) return;

  // if found user projects is only one set it as current project
  if (data.length === 1)
    data[0] &&
      data[0].projectSites &&
      data[0].projectSites.length > 0 &&
      data[0].userProjectSitesRole &&
      data[0].userProjectSitesRole.length > 0 &&
      dispatch(updateCurrentProject(data[0].id));

  const user = getState().users.current;

  if (!user) return;

  userService.Local.currentUser.set(user);
};

export const checkLoggedUser = (): ReduxThunk => (dispatch, getState) => {
  const user = userService.Local.currentUser.get();

  if (!user) return;

  dispatch(setUser(user));

  user && dispatch(loadUserProjects(user.id));
};

export const authenticateUser = (
  credentials: ILoginRequest,
): ReduxThunk<Promise<boolean>> => async dispatch => {
  const user = await authService.login(credentials);

  userService.Local.currentUser.set(user);

  dispatch(setUser(user));

  if (user) return true;

  return false;
};

export const logoutUser = (): ReduxThunk => async () => {
  await logout();

  // either reset the store or refresh to clear State;
  window.location.replace('/');
};

export const loadUsers = (): ReduxThunk => async dispatch => {
  const response = await getUsers();

  dispatch(setUsers(response.data));
};


export const submitVerificationCode = (
  request: ILoginVerificationRequest,
): Promise<AxiosResponse<ILoginVerificationResponse>> => {

  return authService.verifyClientCode(request);;
};


