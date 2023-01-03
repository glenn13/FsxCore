import DispositionGeneralAsset from '@app/entities/asset/disposition/generalasset/DispositionGeneralAsset';
import { createReducer, createAction } from '@reduxjs/toolkit';

export const addDispositionGeneralAsset = createAction<DispositionGeneralAsset>('ADD_DISPOSITION_GENERAL_ASSET');
export const removeDispositionGeneralAsset= createAction<DispositionGeneralAsset>('REMOVE_DISPOSITION_GENERAL_ASSET');
export const setDispositionGeneralAsset = createAction<DispositionGeneralAsset>('SET_DISPOSITION_GENERAL_ASSET');
export const updateDispositionGeneralAsset = createAction<DispositionGeneralAsset>('UPDATE_DISPOSITION_GENERAL_ASSET');

export interface IDispositionGeneralAsset {
    current?: DispositionGeneralAsset[];
}

export const initDispositionGeneralAsset: IDispositionGeneralAsset = {
    current: []
}

export const dispositionGeneralAssetReducer = createReducer(initDispositionGeneralAsset, builder =>
    builder
        .addCase(addDispositionGeneralAsset, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeDispositionGeneralAsset, (state, action) => {
            if(state.current !== undefined) {
                state.current = state.current.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setDispositionGeneralAsset, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
        .addCase(updateDispositionGeneralAsset, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
);