import DispositionVehicle from '@app/entities/asset/disposition/vehicle/DispositionVehicle';
import { createReducer, createAction } from '@reduxjs/toolkit';

export const addDispositionVehicle = createAction<DispositionVehicle>('ADD_DISPOSITION_VEHICLE');
export const removeDispositionVehicle= createAction<DispositionVehicle>('REMOVE_DISPOSITION_VEHICLE');
export const setDispositionVehicle = createAction<DispositionVehicle>('SET_DISPOSITION_VEHICLE');
export const updateDispositionVehicle = createAction<DispositionVehicle>('UPDATE_DISPOSITION_VEHICLE');

export interface IDispositionVehicle {
    current?: DispositionVehicle[];
}

export const initDispositionVehicle: IDispositionVehicle = {
    current: []
}

export const dispositionVehicleReducer = createReducer(initDispositionVehicle, builder =>
    builder
        .addCase(addDispositionVehicle, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeDispositionVehicle, (state, action) => {
            if(state.current !== undefined) {
                state.current = state.current.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setDispositionVehicle, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
        .addCase(updateDispositionVehicle, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
);