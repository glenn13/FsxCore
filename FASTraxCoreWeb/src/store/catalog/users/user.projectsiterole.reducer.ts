import {createReducer, createAction} from '@reduxjs/toolkit';
import {UserProjectSiteRole} from '@app/entities/catalog/UserProjectSiteRole';

export const setUserProjectSiteRole = createAction<UserProjectSiteRole[]>(
  'SET_USERPROJECTSITEROLE',
);

export interface UserProjectSiteRoles {
  all?: UserProjectSiteRole[];
  current?: UserProjectSiteRole[];
}

const initialState: UserProjectSiteRoles = {
  all: [],
  current: [],
};

export const userProjectSiteRoleReducer = createReducer(initialState, builder =>
  builder.addCase(setUserProjectSiteRole, (state, action) => {
    state.all = action.payload;
  }),
);
