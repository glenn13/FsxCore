import {createReducer} from '@reduxjs/toolkit';
import {AppState, setRadialItems, setTheme} from './types';

export const initialAppState: AppState = {
  theme: 'Light',
  radialMenu: [],
};

export const app = createReducer(initialAppState, builder =>
  builder
    .addCase(setTheme, (state, action) => ({...state, theme: action.payload}))
    .addCase(setRadialItems, (state, action) => ({...state, radialMenu: [...action.payload]})),
);
