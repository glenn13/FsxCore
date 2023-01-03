import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionComponentDamagedArea from '@app/entities/asset/disposition/component/DispositionComponentDamagedArea';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionComponentDamagedArea = createAction<DispositionComponentDamagedArea>('ADD_DISPOSITION_COMPONENT_DAMAGED_AREA');
export const removeDispositionComponentDamagedArea = createAction<DispositionComponentDamagedArea>('REMOVE_DISPOSITION_COMPONENT_DAMAGED_AREA');
export const setDispositionComponentDamagedAreas = createAction<DispositionComponentDamagedArea[]>('SET_DISPOSITION_COMPONENT_DAMAGED_AREA');
export const updateDispositionComponentDamagedArea = createAction<DispositionComponentDamagedArea>('UPDATE_DISPOSITION_COMPONENT_DAMAGED_AREA');

export const initDispositionComponentDamagedAreas: DispositionComponentDamagedArea[] = [];

export const emptyDispositionComponentDamagedArea = (ids?: number[]): DispositionComponentDamagedArea => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionComponentId: 0,
        isDamagedArea: true,
        dispositionDamagedAreaId: 0,
    };
};

export const dispositionComponentDamagedAreaReducer = createReducer(initDispositionComponentDamagedAreas, builder =>
    builder
        .addCase(setDispositionComponentDamagedAreas, (_, action) => action.payload)
        .addCase(addDispositionComponentDamagedArea, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionComponentDamagedArea, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionComponentDamagedArea, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);