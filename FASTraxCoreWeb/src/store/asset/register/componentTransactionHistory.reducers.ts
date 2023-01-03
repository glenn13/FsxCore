import {createAction, createReducer} from '@reduxjs/toolkit';

export const setComponentTransactionHistory = createAction<RegisterTransactionHistory[]>(
  'SET_COMPONENT_TRANSACTION_DETAIL',
);

export interface IComponentTransactionHistory {
  current?: RegisterTransactionHistory[];
}

export const initComponentTransactionHistory: IComponentTransactionHistory = {
  current: [],
};

export const componentTransactionHistoryReducer = createReducer(
  initComponentTransactionHistory,
  builder =>
    builder
      .addCase(setComponentTransactionHistory, (state, action) => {
        state.current = action.payload;
      })
);
