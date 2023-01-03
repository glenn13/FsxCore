import {createReducer, createAction} from '@reduxjs/toolkit';
import {StringKeyValuePair} from '../../helpers/types';

const SET_ERRORS = 'SET_ERRORS';
const UPDATE_ERRORS = 'UPDATE_ERRORS';

export const setErrors = createAction<StringKeyValuePair<string[]>>(SET_ERRORS);
export const updateErrors = createAction<StringKeyValuePair<string[]>>(UPDATE_ERRORS);

export const errors = createReducer<StringKeyValuePair<string[]>>({}, builder =>
  builder
    .addCase(setErrors, (_, action) => ({...action.payload}))
    .addCase(updateErrors, (state, action) => ({...state, ...action.payload})),
);
