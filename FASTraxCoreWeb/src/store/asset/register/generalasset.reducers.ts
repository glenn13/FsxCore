import {createAction, createReducer} from '@reduxjs/toolkit';

export const addGeneralAsset = createAction<GeneralAsset>('ADD_GENERAL_ASSET');
export const removeGeneralAsset = createAction<GeneralAsset>('REMOVE_GENERAL_ASSET');
export const setGeneralAsset = createAction<GeneralAsset>('SET_GENERAL_ASSET');
export const updateGeneralAsset = createAction<GeneralAsset>('UPDATE_GENERAL_ASSET');

export interface IGeneralAsset {
  current?: GeneralAsset[];
}

export const initGeneralAsset: IGeneralAsset = {
  current: [],
};

export const generalAssetReducer = createReducer(initGeneralAsset, builder =>
  builder
    .addCase(addGeneralAsset, (state, action) => {
      state.current?.push({...action.payload});
    })
    .addCase(removeGeneralAsset, (state, action) => {
      state.current = state.current?.filter(x => x.id !== action.payload.id);
    })
    .addCase(setGeneralAsset, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    })
    .addCase(updateGeneralAsset, (state, action) => {
      if (state.current !== undefined) {
        var index: number = 0;
        index = state.current?.findIndex(aai => aai.id === action.payload.id);
        state.current[index] = action.payload;
      }
    }),
);
