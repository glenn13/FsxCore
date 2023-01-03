import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleEngineHistory = createAction<VehicleEngineHistory>('ADD_VEHICLE_ENGINE_HISTORY');
export const removeVehicleEngineHistory= createAction<VehicleEngineHistory>('REMOVE_VEHICLE_ENGINE_HISTORY');
export const setVehicleEngineHistory = createAction<VehicleEngineHistory[]>('SET_VEHICLE_ENGINE_HISTORY');
export const updateVehicleEngineHistory = createAction<VehicleEngineHistory>('UPDATE_VEHICLE_ENGINE_HISTORY');

export interface IVehicleEngineHistory {
    current?: VehicleEngineHistory[];
}

export const initVehicleEngineHistory: IVehicleEngineHistory = {
    current: []
}

export const vehicleEngineHistoryReducer = createReducer(initVehicleEngineHistory, builder =>
    builder
        .addCase(addVehicleEngineHistory, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleEngineHistory, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleEngineHistory, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleEngineHistory, (state, action) => {
            if (state.current !== undefined) {
                var index: number = 0;
                if (action.payload.tempId !== undefined) {
                    index = state.current.findIndex(aai => aai.tempId === action.payload.tempId);
                } else {
                    index = state.current.findIndex(aai => aai.id === action.payload.id);
                }
                state.current[index] = action.payload;
            }
        })  
);
