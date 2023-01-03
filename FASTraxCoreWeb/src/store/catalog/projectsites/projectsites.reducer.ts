import {createReducer, createAction} from '@reduxjs/toolkit';
import {ProjectSite} from '@app/entities/catalog/ProjectSite';

export const setProjectSite = createAction<ProjectSite[]>('SET_PROJECT_SITE');

export const setProjectSiteByUser = createAction<ProjectSite[]>('SET_PROJECT_SITE_BY_USER');

export const setSelectedProjectSite = createAction<ProjectSite>('SET_SELECTED_PROJECTSITE');

export const clearProjectSite = createAction('CLEAR_PROJECT_SITE');

// const initialState: ProjectSite[] = [];

export interface ProjectSites {
  all?: ProjectSite[];
  current?: ProjectSite[];
  selected?: ProjectSite;
}

const initialState: ProjectSites = {
  all: [],
  current: [],
};

export const projectSiteReducer = createReducer(initialState, builder =>
  builder
    .addCase(setProjectSite, (state, action) => {
      state.all = action.payload;
    })
    .addCase(setProjectSiteByUser, (state, action) => {
      state.current = action.payload;
    })
    .addCase(setSelectedProjectSite, (state, action) => {
      state.selected = action.payload;
    })
    .addCase(clearProjectSite, (state, action) => {
      state.all = initialState.all;
      state.selected = initialState.selected;
      state.current = initialState.current;
    }),
);
