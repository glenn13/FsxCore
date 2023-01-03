import {createAction, createReducer} from '@reduxjs/toolkit';

import {ModulePermissionDefault} from '@app/entities/catalog';

export const setDefaultPermission = createAction<ModulePermissionDefault[]>(
  'SET_DEFAULT_PERMISSION',
);

const initialState: ModulePermissionDefault[] = [];

export const permissionReducer = createReducer(initialState, builder =>
  builder.addCase(setDefaultPermission, (_, action) => [...action.payload]),
);
