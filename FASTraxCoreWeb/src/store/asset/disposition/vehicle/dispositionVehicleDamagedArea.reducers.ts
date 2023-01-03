import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionVehicleDamagedArea from '@app/entities/asset/disposition/vehicle/DispositionVehicleDamagedArea';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionVehicleDamagedArea = createAction<DispositionVehicleDamagedArea>('ADD_DISPOSITION_VEHICLE_DAMAGED_AREA');
export const removeDispositionVehicleDamagedArea = createAction<DispositionVehicleDamagedArea>('REMOVE_DISPOSITION_VEHICLE_DAMAGED_AREA');
export const setDispositionVehicleDamagedAreas = createAction<DispositionVehicleDamagedArea[]>('SET_DISPOSITION_VEHICLE_DAMAGED_AREA');
export const updateDispositionVehicleDamagedArea = createAction<DispositionVehicleDamagedArea>('UPDATE_DISPOSITION_VEHICLE_DAMAGED_AREA');

export const initDispositionVehicleDamagedAreas: DispositionVehicleDamagedArea[] = [];

export const emptyDispositionVehicleDamagedArea = (ids?: number[]): DispositionVehicleDamagedArea => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionVehicleId: 0,
        isDamagedArea: true,
        dispositionDamagedAreaId: 0,
    };
};

export const dispositionVehicleDamagedAreaReducer = createReducer(initDispositionVehicleDamagedAreas, builder =>
    builder
        .addCase(setDispositionVehicleDamagedAreas, (_, action) => action.payload)
        .addCase(addDispositionVehicleDamagedArea, (state, action) => ([...state, action.payload]))
        .addCase(updateDispositionVehicleDamagedArea, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionVehicleDamagedArea, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);