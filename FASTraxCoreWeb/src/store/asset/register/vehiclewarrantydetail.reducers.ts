import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleWarrantyDetail = createAction<VehicleWarrantyDetail>('ADD_VEHICLE_WARRANTY_DETAIL');
export const removeVehicleWarrantyDetail= createAction<VehicleWarrantyDetail>('REMOVE_VEHICLE_WARRANTY_DETAIL');
export const setVehicleWarrantyDetail = createAction<VehicleWarrantyDetail[]>('SET_VEHICLE_WARRANTY_DETAIL');
export const updateVehicleWarrantyDetail = createAction<VehicleWarrantyDetail>('UPDATE_VEHICLE_WARRANTY_DETAIL');

export interface IVehicleWarrantyDetail {
    current?: VehicleWarrantyDetail[];
}

export const initVehicleWarrantyDetail: IVehicleWarrantyDetail = {
    current: []
}

export const vehicleWarrantyDetailReducer = createReducer(initVehicleWarrantyDetail, builder =>
    builder
        .addCase(addVehicleWarrantyDetail, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleWarrantyDetail, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleWarrantyDetail, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleWarrantyDetail, (state, action) => {
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
