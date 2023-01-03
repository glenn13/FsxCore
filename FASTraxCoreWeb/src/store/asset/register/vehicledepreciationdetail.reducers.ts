import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleDepreciationDetail = createAction<VehicleDepreciationDetail>('ADD_VEHICLE_DEPRECIATION_DETAIL');
export const removeVehicleDepreciationDetail= createAction<VehicleDepreciationDetail>('REMOVE_VEHICLE_DEPRECIATION_DETAIL');
export const setVehicleDepreciationDetail = createAction<VehicleDepreciationDetail[]>('SET_VEHICLE_DEPRECIATION_DETAIL');
export const updateVehicleDepreciationDetail = createAction<VehicleDepreciationDetail>('UPDATE_VEHICLE_DEPRECIATION_DETAIL');

export interface IVehicleDepreciationDetail {
    current?: VehicleDepreciationDetail[];
}

export const initVehicleDepreciationDetail: IVehicleDepreciationDetail = {
    current: []
}

export const vehicleDepreciationDetailReducer = createReducer(initVehicleDepreciationDetail, builder =>
    builder
        .addCase(addVehicleDepreciationDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleDepreciationDetail, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleDepreciationDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleDepreciationDetail, (state, action) => {
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
