import {createStore} from './createStore';

interface AccessData {
  actionIds: Array<number>;
  removedActionIds: Array<number>;
  moduleIds: Array<number>;
  removedModuleIds: Array<number>;
}
interface IAccessData {
  [Key: string]: AccessData;
}

type StateType = {
  selectedRoleId: number;
  accessByRole: IAccessData;
  tempAccessByRole: IAccessData;
};

type DispatchType = {
  setSelectedRoleId: (id: number) => void;
  setAccessByRoleFromTemp: () => any;
  revertTempAccessFromOld: () => any;
  setTempActionsIds: (ids: [], key: number | string) => any;
  removeIdFromTempActions: (id: number, key: number | string) => any;
  setTempModulesIds: (ids: [], key: number | string) => any;
  removeIdFromTempModules: (id: number, key: number | string) => any;
};

const initialState: StateType = {
  selectedRoleId: 0,
  accessByRole: {},
  tempAccessByRole: {},
};

type StoreProps = StateType & DispatchType;

export const useAccessStore = createStore<StoreProps>(`useAccessStore`, (set, get) => ({
  ...initialState,
  setSelectedRoleId: (id: number) =>
    set(state => {
      state.selectedRoleId = id;
    }),
  setAccessByRoleFromTemp: () => {
    set(state => {
      state.accessByRole = state.tempAccessByRole;
    });
  },
  revertTempAccessFromOld: () => {
    set(state => {
      state.tempAccessByRole = state.accessByRole;
    });
  },
  setTempActionsIds: (ids: [], key: number | string) => {
    set(state => {
      if (!state.tempAccessByRole[key]) {
        state.tempAccessByRole[key] = {
          actionIds: ids,
          moduleIds: [],
          removedActionIds: [],
          removedModuleIds: [],
        };
      } else {
        state.tempAccessByRole[key].actionIds.push(
          ...ids.filter(s => !state.tempAccessByRole[key].actionIds.includes(s)),
        );

        if (ids.length > 0) {
          // updates/filter item from removedActionIds not existing on checked actionIds
          state.tempAccessByRole[key].removedActionIds = state.tempAccessByRole[
            key
          ].removedActionIds.filter(d => !state.tempAccessByRole[key].actionIds.includes(d));
        }
      }
    });
  },
  removeIdFromTempActions: (id: number, key: number | string) => {
    set(state => {
      if (state.tempAccessByRole[key]) {
        state.tempAccessByRole[key].removedActionIds.push(id);

        state.tempAccessByRole[key].actionIds.splice(
          state.tempAccessByRole[key].actionIds.indexOf(id),
          1,
        );
      }
    });
  },
  setTempModulesIds: (ids: [], key: number | string) => {
    set(state => {
      if (!state.tempAccessByRole[key]) {
        state.tempAccessByRole[key] = {
          actionIds: [],
          moduleIds: ids,
          removedActionIds: [],
          removedModuleIds: [],
        };
      } else {
        state.tempAccessByRole[key].moduleIds.push(
          ...ids.filter(s => !state.tempAccessByRole[key].moduleIds.includes(s)),
        );

        if (ids.length > 0) {
          // updates/filter item from removedActionIds not existing on checked actionIds
          state.tempAccessByRole[key].removedModuleIds = state.tempAccessByRole[
            key
          ].removedModuleIds.filter(d => !state.tempAccessByRole[key].moduleIds.includes(d));
        }
      }
    });
  },
  removeIdFromTempModules: (id: number, key: number | string) => {
    set(state => {
      if (state.tempAccessByRole[key]) {
        state.tempAccessByRole[key].removedModuleIds.push(id);

        state.tempAccessByRole[key].moduleIds.splice(
          state.tempAccessByRole[key].moduleIds.indexOf(id),
          1,
        );
      }
    });
  },
}));
