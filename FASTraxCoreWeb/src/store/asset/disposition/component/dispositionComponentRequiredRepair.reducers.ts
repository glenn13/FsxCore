import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionComponentRequiredRepair from '@app/entities/asset/disposition/component/DispositionComponentRequiredRepair';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionComponentRequiredRepair = createAction<DispositionComponentRequiredRepair>('ADD_DISPOSITION_COMPONENT_REQUIRED_REPAIR');
export const removeDispositionComponentRequiredRepair = createAction<DispositionComponentRequiredRepair>('REMOVE_DISPOSITION_COMPONENT_REQUIRED_REPAIR');
export const setDispositionComponentRequiredRepairs = createAction<DispositionComponentRequiredRepair[]>('SET_DISPOSITION_COMPONENT_REQUIRED_REPAIR');
export const updateDispositionComponentRequiredRepair = createAction<DispositionComponentRequiredRepair>('UPDATE_DISPOSITION_COMPONENT_REQUIRED_REPAIR');

export const initDispositionComponentRequiredRepairs: DispositionComponentRequiredRepair[] = [];

export const emptyDispositionComponentRequiredRepair = (ids?: number[]): DispositionComponentRequiredRepair => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionComponentId: 0,
        isRequiredRepair: true,
        dispositionRequiredRepairId: 0,
    };
};

export const dispositionComponentRequiredRepairReducer = createReducer(initDispositionComponentRequiredRepairs, builder =>
    builder
        .addCase(addDispositionComponentRequiredRepair, (state, action) => ([...state, action.payload]))
        .addCase(setDispositionComponentRequiredRepairs, (_, action) => action.payload)
        .addCase(updateDispositionComponentRequiredRepair, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionComponentRequiredRepair, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);