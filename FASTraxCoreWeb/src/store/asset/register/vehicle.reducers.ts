import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicle = createAction<Vehicle>('ADD_VEHICLE');
export const removeVehicle= createAction<Vehicle>('REMOVE_VEHICLE');
export const setVehicle = createAction<Vehicle>('SET_VEHICLE');
export const updateVehicle = createAction<Vehicle>('UPDATE_VEHICLE');

export interface IVehicle {
    current?: Vehicle[];
}

export const initVehicle: IVehicle = {
    current: []
}

export const vehicleReducer = createReducer(initVehicle, builder =>
    builder
        .addCase(addVehicle, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicle, (state, action) => {
            if(state.current !== undefined) {
                state.current = state.current.filter(x => x.id !== action.payload.id);
            }
        })
        .addCase(setVehicle, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
        .addCase(updateVehicle, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(aai => aai.id === action.payload.id);
                state.current[index] = action.payload;
            }
        })
);