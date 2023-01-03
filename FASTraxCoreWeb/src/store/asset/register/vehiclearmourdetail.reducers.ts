import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleArmourDetail = createAction<VehicleArmourDetail>('ADD_VEHICLE_ARMOUR_DETAIL');
export const removeVehicleArmourDetail= createAction<VehicleArmourDetail>('REMOVE_VEHICLE_ARMOUR_DETAIL');
export const setVehicleArmourDetail = createAction<VehicleArmourDetail[]>('SET_VEHICLE_ARMOUR_DETAIL');
export const updateVehicleArmourDetail = createAction<VehicleArmourDetail>('UPDATE_VEHICLE_ARMOUR_DETAIL');

export interface IVehicleArmourDetail {
    current?: VehicleArmourDetail[];
}

export const initVehicleArmourDetail: IVehicleArmourDetail = {
    current: []
}

export const vehicleArmourDetailReducer = createReducer(initVehicleArmourDetail, builder =>
    builder
        .addCase(addVehicleArmourDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleArmourDetail, (state, action) => {
            if( state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleArmourDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleArmourDetail, (state, action) => {
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
