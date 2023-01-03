import {createAction, createReducer} from '@reduxjs/toolkit';

const SET_STATUS = 'SET_ERROR';

export const setStatus = createAction<string>(SET_STATUS);

const initialState = '';

export const status = createReducer<string>(initialState, builder =>
  builder.addCase(setStatus, (state, action) => (state = action.payload)),
);
