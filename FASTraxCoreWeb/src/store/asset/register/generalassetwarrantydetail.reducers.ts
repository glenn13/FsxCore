import {createAction, createReducer} from '@reduxjs/toolkit';

export const addGeneralAssetWarrantyDetail = createAction<GeneralAssetWarrantyDetail>(
  'ADD_GENERAL_ASSET_WARRANTY_DETAIL',
);
export const removeGeneralAssetWarrantyDetail = createAction<GeneralAssetWarrantyDetail>(
  'REMOVE_GENERAL_ASSET_WARRANTY_DETAIL',
);
export const setGeneralAssetWarrantyDetail = createAction<GeneralAssetWarrantyDetail[]>(
  'SET_GENERAL_ASSET_WARRANTY_DETAIL',
);
export const updateGeneralAssetWarrantyDetail = createAction<GeneralAssetWarrantyDetail>(
  'UPDATE_GENERAL_ASSET_WARRANTY_DETAIL',
);

export interface IGeneralAssetWarrantyDetail {
  current?: GeneralAssetWarrantyDetail[];
}

export const initGeneralAssetWarrantyDetail: IGeneralAssetWarrantyDetail = {
  current: [],
};

export const generalAssetWarrantyDetailReducer = createReducer(
  initGeneralAssetWarrantyDetail,
  builder =>
    builder
      .addCase(addGeneralAssetWarrantyDetail, (state, action) => {
        state.current?.push({...action.payload});
      })
      .addCase(removeGeneralAssetWarrantyDetail, (state, action) => {
        if (action.payload.tempId !== undefined) {
          state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
        } else {
          state.current = state.current?.filter(x => x.id !== action.payload.id);
        }
      })
      .addCase(setGeneralAssetWarrantyDetail, (state, action) => {
        state.current = action.payload;
      })
      .addCase(updateGeneralAssetWarrantyDetail, (state, action) => {
        if (state.current !== undefined) {
          var index: number = 0;
          if (action.payload.tempId !== undefined) {
            index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
          } else {
            index = state.current.findIndex(aai => aai.id === action.payload.id);
          }
          state.current[index] = action.payload;
        }
      }),
);
