import {createAction, createReducer} from '@reduxjs/toolkit';

import {ModulePermissionCustom} from '@app/entities/catalog';

export const setCustomPermission = createAction<ModulePermissionCustom[]>('SET_CUSTOM_PERMISSION');
export const setCustomPermissionTreeValue = createAction<ModulePermissionCustom[]>(
  'SET_CUSTOM_PERMISSION_TREE',
);

export interface CustomPermissionState {
  all?: ModulePermissionCustom[];
  perUser?: ModulePermissionCustom[];
}

// const initialState: ModulePermissionCustom[] = [];

export const initialState: CustomPermissionState = {
  all: [],
};

export const permissionCustomReducer = createReducer(initialState, builder =>
  builder
    .addCase(setCustomPermission, (state, action) => ({...state, all: action.payload}))
    .addCase(setCustomPermissionTreeValue, (state, action) => ({
      ...state,
      perUser: action.payload,
    })),
);
