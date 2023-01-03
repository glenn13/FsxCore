import {createReducer, createAction} from '@reduxjs/toolkit';
import {User, IUserFormData} from '../../../entities/catalog/User';

export const initialUser: IUserFormData = {
  id: 0,
  displayName: '',
  firstName: '',
  username: '',
  lastName: '',
  email: '',
  address: '',
  contactNo: '',
  departmentId: 0,
  designationId: 0,
  countryId: 0,
  stateZipCode: '',
  statusId: 1,
  customerId: 0,
  active: true,
};

export const addUser = createAction<User>('ADD_USER');

export const userReducer = createReducer(initialUser, builder =>
  builder.addCase(addUser, state => {}),
);
