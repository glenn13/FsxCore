import {createReducer, createAction} from '@reduxjs/toolkit';
import {ProjectRole} from '@app/entities/catalog/ProjectRole';

export const addProjectRole = createAction<ProjectRole>('ADD_PROJECT_ROLE');

export const setProjectRole = createAction<ProjectRole[]>('SET_PROJECT_ROLE');

export const setUserProjectRoles = createAction<ProjectRole[]>('SET_USER_PROJECTROLES');

// const initialState: ProjectRole[] = [];

export interface ProjectRoles {
  all?: ProjectRole[];
  current?: ProjectRole[];
}

const initialState: ProjectRoles = {
  all: [],
  current: [],
};

export const projectRoleReducer = createReducer(
  initialState,
  builder =>
    builder
      .addCase(setProjectRole, (state, action) => {
        state.current = action.payload;
      })
      .addCase(setUserProjectRoles, (state, action) => {
        state.all = action.payload;
      }),
  // .addCase(addProjectRole, (state, action) => [...state, action.payload])
  // .addCase(setProjectRole, (_, action) => [...action.payload]),
);
