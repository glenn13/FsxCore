import {createAction, createReducer} from '@reduxjs/toolkit';

export const setGeneralAssetTransactionHistory = createAction<RegisterTransactionHistory[]>(
  'SET_GENERAL_ASSET_TRANSACTION_DETAIL',
);

export interface IGeneralAssetTransactionHistory {
  current?: RegisterTransactionHistory[];
}

export const initGeneralAssetTransactionHistory: IGeneralAssetTransactionHistory = {
  current: [],
};

export const generalAssetTransactionHistoryReducer = createReducer(
  initGeneralAssetTransactionHistory,
  builder =>
    builder
      .addCase(setGeneralAssetTransactionHistory, (state, action) => {
        state.current = action.payload;
      })
);
