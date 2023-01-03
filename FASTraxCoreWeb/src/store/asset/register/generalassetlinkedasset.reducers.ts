import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addGeneralAssetLinkedAsset = createAction<GeneralAssetLinkedAsset>('ADD_GENERAL_ASSET_LINKED_ASSET');
export const removeGeneralAssetLinkedAsset= createAction<GeneralAssetLinkedAsset>('REMOVE_GENERAL_ASSET_LINKED_ASSET');
export const setGeneralAssetLinkedAsset = createAction<GeneralAssetLinkedAsset[]>('SET_GENERAL_ASSET_LINKED_ASSET');
export const updateGeneralAssetLinkedAsset = createAction<GeneralAssetLinkedAsset>('UPDATE_GENERAL_ASSET_LINKED_ASSET');

export interface IGeneralAssetLinkedAsset {
    current?: GeneralAssetLinkedAsset[];
}

export const initGeneralAssetLinkedAsset: IGeneralAssetLinkedAsset = {
    current: []
}

export const generalAssetLinkedAssetReducer = createReducer(initGeneralAssetLinkedAsset, builder =>
    builder
        .addCase(addGeneralAssetLinkedAsset, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeGeneralAssetLinkedAsset, (state, action) => {
            if (action.payload.tempId !== undefined) {
                state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
            } else {
                state.current = state.current?.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setGeneralAssetLinkedAsset, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateGeneralAssetLinkedAsset, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
                state.current[index] = action.payload;
            }

        })  
);
