import { createReducer, createAction } from '@reduxjs/toolkit';
export const addVehicleCustomField = createAction<VehicleCustomField>('ADD_VEHICLE_CUSTOM_FIELD');
export const removeVehicleCustomField= createAction<VehicleCustomField>('REMOVE_VEHICLE_CUSTOM_FIELD');
export const setVehicleCustomField = createAction<VehicleCustomField[]>('SET_VEHICLE_CUSTOM_FIELD');
export const updateVehicleCustomField = createAction<VehicleCustomField>('UPDATE_VEHICLE_CUSTOM_FIELD');

export interface IVehicleCustomField {
    current?: VehicleCustomField[];
}

export const initVehicleCustomField: IVehicleCustomField = {
    current: []
}

export const vehicleCustomFieldReducer = createReducer(initVehicleCustomField, builder =>
    builder
        .addCase(addVehicleCustomField, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleCustomField, (state, action) => {
            state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
        })
        .addCase(setVehicleCustomField, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleCustomField, (state, action) => {
            if(state.current !== undefined) {
                var index: number = 0;
                index = state.current.findIndex(x => x.tempId === action.payload.tempId);
                state.current[index] = action.payload;
            }
        })
);