import {createReducer, createAction} from '@reduxjs/toolkit';
import {PageActions} from '../pages/types';

export const setPagePermissionActions = createAction<PageActions[]>('SET_ACTION_PERMISSIONS');

export interface PageActionsPayload {
  all?: PageActions[];
  current?: PageActions[];
}

const initialState: PageActionsPayload = {
  all: [],
  current: [],
};

export const pagePermissionActionReducer = createReducer(initialState, builder =>
  builder.addCase(setPagePermissionActions, (state, action) => {
    state.all = action.payload;
  }),
);
