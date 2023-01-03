import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleOdometerHistory = createAction<VehicleOdometerHistory>('ADD_VEHICLE_ODOMETER_HISTORY');
export const removeVehicleOdometerHistory= createAction<VehicleOdometerHistory>('REMOVE_VEHICLE_ODOMETER_HISTORY');
export const setVehicleOdometerHistory = createAction<VehicleOdometerHistory[]>('SET_VEHICLE_ODOMETER_HISTORY');
export const updateVehicleOdometerHistory = createAction<VehicleOdometerHistory>('UPDATE_VEHICLE_ODOMETER_HISTORY');

export interface IVehicleOdometerHistory {
    current?: VehicleOdometerHistory[];
}

export const initVehicleOdometerHistory: IVehicleOdometerHistory = {
    current: []
}

export const vehicleOdometerHistoryReducer = createReducer(initVehicleOdometerHistory, builder =>
    builder
        .addCase(addVehicleOdometerHistory, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleOdometerHistory, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            } 
        })
        .addCase(setVehicleOdometerHistory, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleOdometerHistory, (state, action) => {
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
