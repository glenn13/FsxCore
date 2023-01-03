import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionGeneralAssetDamagedArea from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetDamagedArea';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionGeneralAssetDamagedArea = createAction<DispositionGeneralAssetDamagedArea>('ADD_DISPOSITION_GENERAL_ASSET_DAMAGED_AREA');
export const removeDispositionGeneralAssetDamagedArea = createAction<DispositionGeneralAssetDamagedArea>('REMOVE_DISPOSITION_GENERAL_ASSET_DAMAGED_AREA');
export const setDispositionGeneralAssetDamagedAreas = createAction<DispositionGeneralAssetDamagedArea[]>('SET_DISPOSITION_GENERAL_ASSET_DAMAGED_AREA');
export const updateDispositionGeneralAssetDamagedArea = createAction<DispositionGeneralAssetDamagedArea>('UPDATE_DISPOSITION_GENERAL_ASSET_DAMAGED_AREA');

export const initDispositionGeneralAssetDamagedAreas: DispositionGeneralAssetDamagedArea[] = [];

export const emptyDispositionGeneralAssetDamagedArea = (ids?: number[]): DispositionGeneralAssetDamagedArea => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionGeneralAssetId: 0,
        isDamagedArea: true,
        dispositionDamagedAreaId: 0,
    };
};

export const dispositionGeneralAssetDamagedAreaReducer = createReducer(initDispositionGeneralAssetDamagedAreas, builder =>
    builder
        .addCase(setDispositionGeneralAssetDamagedAreas, (_, action) => action.payload)
        .addCase(addDispositionGeneralAssetDamagedArea, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionGeneralAssetDamagedArea, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionGeneralAssetDamagedArea, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);