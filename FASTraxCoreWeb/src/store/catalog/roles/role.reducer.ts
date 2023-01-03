import {createReducer, createAction} from '@reduxjs/toolkit';
import {Role} from '../../../entities/catalog/Role';

export const initialRole: Role = {
  id: 0,
  title: '',
  code: '',
};

export const addRole = createAction<Role>('ADD_ROLE');

export const roleReducer = createReducer(initialRole, builder =>
  builder.addCase(addRole, state => {}),
);
