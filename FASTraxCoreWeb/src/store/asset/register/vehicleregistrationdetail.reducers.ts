import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleRegistrationDetail = createAction<VehicleRegistrationDetail>('ADD_VEHICLE_REGISTRATION_DETAIL');
export const removeVehicleRegistrationDetail= createAction<VehicleRegistrationDetail>('REMOVE_VEHICLE_REGISTRATION_DETAIL');
export const setVehicleRegistrationDetail = createAction<VehicleRegistrationDetail[]>('SET_VEHICLE_REGISTRATION_DETAIL');
export const updateVehicleRegistrationDetail = createAction<VehicleRegistrationDetail>('UPDATE_VEHICLE_REGISTRATION_DETAIL');

export interface IVehicleRegistrationDetail {
    current?: VehicleRegistrationDetail[];
}

export const initVehicleRegistrationDetail: IVehicleRegistrationDetail = {
    current: []
}

export const vehicleRegistrationDetailReducer = createReducer(initVehicleRegistrationDetail, builder =>
    builder
        .addCase(addVehicleRegistrationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleRegistrationDetail, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleRegistrationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleRegistrationDetail, (state, action) => {
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
