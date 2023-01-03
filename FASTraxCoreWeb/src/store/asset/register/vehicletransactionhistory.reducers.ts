import {createAction, createReducer} from '@reduxjs/toolkit';

export const setVehicleTransactionHistory = createAction<RegisterTransactionHistory[]>(
  'SET_VEHICLE_TRANSACTION_DETAIL',
);

export interface IVehicleTransactionHistory {
  current?: RegisterTransactionHistory[];
}

export const initVehicleTransactionHistory: IVehicleTransactionHistory = {
  current: [],
};

export const vehicleTransactionHistoryReducer = createReducer(
  initVehicleTransactionHistory,
  builder =>
    builder
      .addCase(setVehicleTransactionHistory, (state, action) => {
        state.current = action.payload;
      })
);
