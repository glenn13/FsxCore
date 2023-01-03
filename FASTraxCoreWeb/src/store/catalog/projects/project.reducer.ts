import {createReducer, createAction} from '@reduxjs/toolkit';
import {Project, ProjectFormData} from '../../../entities/catalog/Project';

export const initialProject: ProjectFormData = {
  id: 0,
  title: '',
  code: '',
  description: undefined,
  clientId: null,
  countryId: null,
  groupId: null,
  active: false,
  baseCurrencyId: 1,
  localCurrencyId: 1,
  statusId: 1,
};

export const addProject = createAction<Project>('ADD_PROJECT');

export const projectReducer = createReducer(initialProject, builder =>
  builder.addCase(addProject, state => {}),
);
