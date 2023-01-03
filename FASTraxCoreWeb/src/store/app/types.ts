import {createAction} from '@reduxjs/toolkit';

export type Theme = 'Light' | 'Dark';

export interface RadialItem {
  title: string;
  key?: string;
  icon: string;
  active?: boolean;
  onClick?: Function;
  disabled?: boolean;
  children?: RadialItem[];
}

export interface AppState {
  theme: Theme;
  radialMenu: RadialItem[];
}

const UPDATE_THEME = 'UPDATE_THEME';
const SET_RADIAL_ITEMS = 'SET_RADIAL_ITEMS';

export const setTheme = createAction<Theme>(UPDATE_THEME);
export const setRadialItems = createAction<RadialItem[]>(SET_RADIAL_ITEMS);
