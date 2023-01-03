import {createReducer, createAction} from '@reduxjs/toolkit';
import {Project} from '../../../entities/catalog/Project';

export interface ProjectState {
  all: Project[];
  current?: Project;
}

export const initialProjectsState: ProjectState = {
  all: [],
};

export const addProject = createAction<Project>('ADD_PROJECT');
export const updateProject = createAction<Project>('UPDATE_PROJECT');
export const setProjects = createAction<Project[]>('SET_PROJECTS');
export const setProject = createAction<Project>('SET_CURRENT_PROJECT');

export const projects = createReducer(initialProjectsState, builder =>
  builder
    .addCase(addProject, (state, action) => ({...state, all: [...state.all, action.payload]}))
    .addCase(updateProject, (state, action) => {
      const index = state.all.findIndex(c => c.id === action.payload.id);

      state.all[index] = {...action.payload};
    })
    .addCase(setProject, (state, action) => ({...state, current: action.payload}))
    .addCase(setProjects, (state, action) => ({...state, all: [...action.payload]})),
);
