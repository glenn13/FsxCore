import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleFuelMonitoring = createAction<VehicleFuelMonitoring>('ADD_VEHICLE_FUEL_MONITORING');
export const removeVehicleFuelMonitoring= createAction<VehicleFuelMonitoring>('REMOVE_VEHICLE_FUEL_MONITORING');
export const setVehicleFuelMonitoring = createAction<VehicleFuelMonitoring[]>('SET_VEHICLE_FUEL_MONITORING');
export const updateVehicleFuelMonitoring = createAction<VehicleFuelMonitoring>('UPDATE_VEHICLE_FUEL_MONITORING');

export interface IVehicleFuelMonitoring {
    current?: VehicleFuelMonitoring[];
}

export const initVehicleFuelMonitoring: IVehicleFuelMonitoring = {
    current: []
}

export const vehicleFuelMonitoringReducer = createReducer(initVehicleFuelMonitoring, builder =>
    builder
        .addCase(addVehicleFuelMonitoring, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleFuelMonitoring, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleFuelMonitoring, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleFuelMonitoring, (state, action) => {
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
