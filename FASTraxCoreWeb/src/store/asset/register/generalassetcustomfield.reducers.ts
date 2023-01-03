import {createAction, createReducer} from '@reduxjs/toolkit';

export const addGeneralAssetCustomField = createAction<GeneralAssetCustomField>(
  'ADD_GENERAL_ASSET_CUSTOM_FIELD',
);
export const removeGeneralAssetCustomField = createAction<GeneralAssetCustomField>(
  'REMOVE_GENERAL_ASSET_CUSTOM_FIELD',
);
export const setGeneralAssetCustomField = createAction<GeneralAssetCustomField[]>(
  'SET_GENERAL_ASSET_CUSTOM_FIELD',
);
export const updateGeneralAssetCustomField = createAction<GeneralAssetCustomField>(
  'UPDATE_GENERAL_ASSET_CUSTOM_FIELD',
);

export interface IGeneralAssetCustomField {
  current?: GeneralAssetCustomField[];
}

export const initGeneralAssetCustomField: IGeneralAssetCustomField = {
  current: [],
};

export const generalAssetCustomFieldReducer = createReducer(initGeneralAssetCustomField, builder =>
  builder
    .addCase(addGeneralAssetCustomField, (state, action) => {
      state.current?.push({...action.payload});
    })
    .addCase(removeGeneralAssetCustomField, (state, action) => {
      state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
    })
    .addCase(setGeneralAssetCustomField, (state, action) => {
      state.current = action.payload;
    })
    .addCase(updateGeneralAssetCustomField, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current.findIndex(x => x.tempId === action.payload.tempId);
        state.current[index] = action.payload;
      }
    }),
);
