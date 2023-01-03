import {createStore} from './createStore';
import * as pagesService from '@app/services/catalog/pages.modules.service';
import {ModulePermissionCustom} from '@app/entities/catalog/Pages';

interface SiteRoleStore {
  [Key: number]: number;
}

type StateType = {
  selectedRoleId: number;
  userSiteRole: SiteRoleStore;
};

type DispatchType = {
  setSelectedRoleId: (id: number) => void;
  setUserSiteRoleId: (key: number, roleId: number) => any;
};

const initialState: StateType = {
  selectedRoleId: 0,
  userSiteRole: {},
};

type StoreProps = StateType & DispatchType;

export const useCustomStore = createStore<StoreProps>(`useCustomStore`, (set, get) => ({
  ...initialState,
  setSelectedRoleId: (id: number) =>
    set(state => {
      state.selectedRoleId = id;
    }),
  setUserSiteRoleId: (key: number, roleId: number) => {
    set(state => {
      state.userSiteRole[key] = roleId;
    });
  },
}));
