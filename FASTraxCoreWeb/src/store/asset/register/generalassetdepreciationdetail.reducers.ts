import { createReducer, createAction } from '@reduxjs/toolkit';

export const addGeneralAssetDepreciationDetail = createAction<GeneralAssetDepreciationDetail>('ADD_GENERAL_ASSET_DEPRECIATION_DETAIL');
export const removeGeneralAssetDepreciationDetail= createAction<GeneralAssetDepreciationDetail>('REMOVE_GENERAL_ASSET_DEPRECIATION_DETAIL');
export const setGeneralAssetDepreciationDetail = createAction<GeneralAssetDepreciationDetail[]>('SET_GENERAL_ASSET_DEPRECIATION_DETAIL');
export const updateGeneralAssetDepreciationDetail = createAction<GeneralAssetDepreciationDetail>('UPDATE_GENERAL_ASSET_DEPRECIATION_DETAIL');

export interface IGeneralAssetDepreciationDetail {
    current?: GeneralAssetDepreciationDetail[];
}

export const initGeneralAssetDepreciationDetail: IGeneralAssetDepreciationDetail = {
    current: []
}

export const generalAssetDepreciationDetailReducer = createReducer(initGeneralAssetDepreciationDetail, builder =>
    builder
        .addCase(addGeneralAssetDepreciationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeGeneralAssetDepreciationDetail, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setGeneralAssetDepreciationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateGeneralAssetDepreciationDetail, (state, action) => {
            if (state.current !== undefined) {
                var index: number = 0;
                if (action.payload.tempId !== undefined) {
                    index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
                } else {
                    index = state.current.findIndex(aai => aai.id === action.payload.id);
                }
                state.current[index] = action.payload;
            }
        })
);