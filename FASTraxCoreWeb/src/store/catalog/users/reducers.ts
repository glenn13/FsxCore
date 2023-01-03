import {User} from '@app/entities/catalog/User';
import {UserProject} from '@app/entities/catalog/UserProject';
import {createReducer, createAction} from '@reduxjs/toolkit';

export interface UserState {
  all: User[];
  current?: User;
}

export const addUser = createAction<User>('ADD_USER');
export const updateUser = createAction<User>('UPDATE_USER');
export const setUsers = createAction<User[]>('SET_USERS');
export const setUser = createAction<User>('SET_CURRENT_USER');
export const setUserProjects = createAction<UserProject[]>('SET_CURRENT_USER_PROJECTS');

export const initialUsersState: UserState = {
  all: [],
};

export const users = createReducer(initialUsersState, builder =>
  builder
    .addCase(addUser, (state, action) => ({...state, all: [...state.all, action.payload]}))
    .addCase(updateUser, (state, action) => {
      const all = state.all;
      const index = all.findIndex(c => c.id === action.payload.id);
      all[index] = {...action.payload};

      return {...state, all};
    })
    .addCase(setUser, (state, action) => {
      state.current = action.payload;
    })
    .addCase(setUsers, (state, action) => ({...state, all: [...action.payload]}))
    .addCase(setUserProjects, (state, action) => {
      if (state.current)
        return {...state, current: {...state.current, userProjects: action.payload}};

      console.error("There's no `current` User in your state");

      return state;
    }),
);
