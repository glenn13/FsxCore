import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionGeneralAssetRequiredRepair from '@app/entities/asset/disposition/generalasset/DispositionGeneralAssetRequiredRepair';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionGeneralAssetRequiredRepair = createAction<DispositionGeneralAssetRequiredRepair>('ADD_DISPOSITION_GENERAL_ASSET_REQUIRED_REPAIR');
export const removeDispositionGeneralAssetRequiredRepair = createAction<DispositionGeneralAssetRequiredRepair>('REMOVE_DISPOSITION_GENERAL_ASSET_REQUIRED_REPAIR');
export const setDispositionGeneralAssetRequiredRepairs = createAction<DispositionGeneralAssetRequiredRepair[]>('SET_DISPOSITION_GENERAL_ASSET_REQUIRED_REPAIR');
export const updateDispositionGeneralAssetRequiredRepair = createAction<DispositionGeneralAssetRequiredRepair>('UPDATE_DISPOSITION_GENERAL_ASSET_REQUIRED_REPAIR');

export const initDispositionGeneralAssetRequiredRepairs: DispositionGeneralAssetRequiredRepair[] = [];

export const emptyDispositionGeneralAssetRequiredRepair = (ids?: number[]): DispositionGeneralAssetRequiredRepair => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionGeneralAssetId: 0,
        isRequiredRepair: true,
        dispositionRequiredRepairId: 0,
    };
};

export const dispositionGeneralAssetRequiredRepairReducer = createReducer(initDispositionGeneralAssetRequiredRepairs, builder =>
    builder
        .addCase(addDispositionGeneralAssetRequiredRepair, (state, action) => ([...state, action.payload]))
        .addCase(setDispositionGeneralAssetRequiredRepairs, (_, action) => action.payload)
        .addCase(updateDispositionGeneralAssetRequiredRepair, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionGeneralAssetRequiredRepair, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);