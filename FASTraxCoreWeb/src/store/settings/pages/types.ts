import {createAction} from '@reduxjs/toolkit';
import {NumberKeyValuePair} from './../../../helpers/types';

export interface Page {
  id: number;
  parentId?: number;
  name: string;
  isEnable: boolean;
  hideOnSidebar: boolean;
}

export interface PageActions {
  id: number;
  name: string;
  isEnable: boolean;
}

export interface PagesState {
  all?: Page[];
  current?: Page[];
  selected?: number;
  mappedPages?: NumberKeyValuePair<Page>;
}

export interface InitializePagesPayload {
  all: Page[];
  current: Page[];
  selected?: number;
}

export interface NavigatePayload {
  current: Page[];
  selected: number;
}

const INIT_PAGES = 'INIT_PAGES';
const SET_PAGES_CURRENT = 'SET_PAGES_CURRENT';
const SET_PAGES_SELECTED = 'SET_PAGES_SELECTED';

export const initPagesState = createAction<InitializePagesPayload>(INIT_PAGES);
export const setPagesCurrent = createAction<Page[]>(SET_PAGES_CURRENT);
export const setPagesSelected = createAction<NavigatePayload>(SET_PAGES_SELECTED);
