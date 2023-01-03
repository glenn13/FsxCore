import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID, generateNegativeNumber} from '../../../helpers/randoms';
import RegistrationDetail from '../../../entities/asset/inventory/RegistrationDetail';
import EntityRegistrationDetail from '../../../entities/asset/inventory/EntityRegistrationDetail';

export const addRegistrationDetail = createAction<EntityRegistrationDetail>(
  'ADD_REGISTRATION_DETAILS',
);

export const setRegistrationDetail = createAction<EntityRegistrationDetail[]>(
  'SET_REGISTRATION_DETAILS',
);

export const updateRegistrationDetail = createAction<EntityRegistrationDetail>(
  'UPDATE_REGISTRATION_DETAILS',
);

export const removeRegistrationDetail = createAction<number>('REMOVE_IREGISTRATION_DETAILS');

const initialState: EntityRegistrationDetail[] = [];

export const emptyRegistrationDetail = (ids?: number[]): RegistrationDetail => ({
  id: generateNegativeNumber({flat: ids}),
  referenceNo: generateUUID(true),
  registeredTo: '',
  licensePlateNo: '',
  placeOfRegistration: '',
  registrationDate: new Date(),
  expiryDate: new Date(),
});

export const emptyIRegistrationDetail = (ids?: number[]): EntityRegistrationDetail => {
  const registrationDetail = emptyRegistrationDetail();

  return {
    id: generateNegativeNumber({flat: ids}),
    referenceId: 0,
    registrationDetail,
    registrationDetailId: registrationDetail.id,
  };
};

export const iRegistrationDetails = createReducer(initialState, builder =>
  builder
    .addCase(addRegistrationDetail, (state, action) => [...state, action.payload])
    .addCase(setRegistrationDetail, (_, action) => [...action.payload])
    .addCase(updateRegistrationDetail, (state, action) => {
      const iRegistrationDetails = [...state];
      const index = iRegistrationDetails.findIndex(ird => ird.id === action.payload.id);

      iRegistrationDetails[index] = {...iRegistrationDetails[index], ...action.payload};

      return iRegistrationDetails;
    })
    .addCase(removeRegistrationDetail, (state, action) => [
      ...state.filter(ird => ird.id !== action.payload),
    ]),
);
