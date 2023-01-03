import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleImageAttachment = createAction<VehicleImageAttachment>('ADD_VEHICLE_IMAGE_ATTACHMENT');
export const removeVehicleImageAttachment= createAction<VehicleImageAttachment>('REMOVE_VEHICLE_IMAGE_ATTACHMENT');
export const setVehicleImageAttachment = createAction<VehicleImageAttachment[]>('SET_VEHICLE_IMAGE_ATTACHMENT');
export const updateVehicleImageAttachment = createAction<VehicleImageAttachment>('UPDATE_VEHICLE_IMAGE_ATTACHMENT');

export interface IVehicleImageAttachment {
    current?: VehicleImageAttachment[];
}

export const initVehicleImageAttachment: IVehicleImageAttachment = {
    current: []
}

export const vehicleImageAttachmentReducer = createReducer(initVehicleImageAttachment, builder =>
    builder
        .addCase(addVehicleImageAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleImageAttachment, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current?.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current?.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleImageAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleImageAttachment, (state, action) => {
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
