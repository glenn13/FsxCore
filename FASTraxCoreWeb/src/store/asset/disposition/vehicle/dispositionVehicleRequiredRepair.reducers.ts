import { createReducer, createAction } from '@reduxjs/toolkit';
import DispositionVehicleRequiredRepair from '@app/entities/asset/disposition/vehicle/DispositionVehicleRequiredRepair';
import { generateNegativeNumber } from '@app/helpers/randoms';

export const addDispositionVehicleRequiredRepair = createAction<DispositionVehicleRequiredRepair>('ADD_DISPOSITION_VEHICLE_REQUIRED_REPAIR');
export const removeDispositionVehicleRequiredRepair = createAction<DispositionVehicleRequiredRepair>('REMOVE_DISPOSITION_VEHICLE_REQUIRED_REPAIR');
export const setDispositionVehicleRequiredRepairs = createAction<DispositionVehicleRequiredRepair[]>('SET_DISPOSITION_VEHICLE_REQUIRED_REPAIR');
export const updateDispositionVehicleRequiredRepair = createAction<DispositionVehicleRequiredRepair>('UPDATE_DISPOSITION_VEHICLE_REQUIRED_REPAIR');

export const initDispositionVehicleRequiredRepairs: DispositionVehicleRequiredRepair[] = [];

export const emptyDispositionVehicleRequiredRepair = (ids?: number[]): DispositionVehicleRequiredRepair => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        dispositionVehicleId: 0,
        isRequiredRepair: true,
        dispositionRequiredRepairId: 0,
    };
};

export const dispositionVehicleRequiredRepairReducer = createReducer(initDispositionVehicleRequiredRepairs, builder =>
    builder
        .addCase(addDispositionVehicleRequiredRepair, (state, action) => ([...state, action.payload]))
        .addCase(setDispositionVehicleRequiredRepairs, (_, action) => action.payload)
        .addCase(updateDispositionVehicleRequiredRepair, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeDispositionVehicleRequiredRepair, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);