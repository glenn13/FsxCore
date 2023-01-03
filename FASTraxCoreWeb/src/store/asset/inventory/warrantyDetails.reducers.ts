import {createReducer, createAction} from '@reduxjs/toolkit';
import {generateUUID} from '@app/helpers/randoms';
import {generateNegativeNumber} from '@app/helpers/randoms';
import WarrantyDetail from '@app/entities/asset/inventory/WarrantyDetail';
import EntityWarrantyDetail from '@app/entities/asset/inventory/EntityWarrantyDetail';

export const addWarrantyDetails = createAction<EntityWarrantyDetail>('ADD_IWARRANTY_DETAILS');
export const setWarrantyDetails = createAction<EntityWarrantyDetail[]>('SET_IWARRANTY_DETAILS');
export const updateWarrantyDetails = createAction<EntityWarrantyDetail>('UPDATE_IWARRANTY_DETAILS');
export const removeWarrantyDetails = createAction<number>('REMOVE_IWARRANTY_DETAILS');

const initialState: EntityWarrantyDetail[] = [];

export const emptyWarrantyDetail = (ids?: number[]): WarrantyDetail => ({
  id: generateNegativeNumber({flat: ids}),
  referenceNo: generateUUID(true),
  registeredTo: '',
  startDate: new Date(),
  expiryDate: new Date(),
  warrantyProvider: '',
});

export const emptyIWarrantyDetail = (ids?: number[]): EntityWarrantyDetail => {
  const warrantyDetail = emptyWarrantyDetail();

  return {
    referenceId: 0,
    warrantyDetail,
    warrantyDetailId: warrantyDetail.id,
    id: generateNegativeNumber({flat: ids}),
  };
};

export const iWarrantyDetails = createReducer(initialState, builder =>
  builder
    .addCase(setWarrantyDetails, (_, action) => action.payload)
    .addCase(addWarrantyDetails, (state, action) => [...state, action.payload])
    .addCase(updateWarrantyDetails, (state, action) => {
      const details = [...state];
      const index = details.findIndex(wd => wd.id === action.payload.id);

      details[index] = action.payload;

      return [...details];
    })
    .addCase(removeWarrantyDetails, (state, action) => [
      ...state.filter(iwd => iwd.id !== action.payload),
    ]),
);
