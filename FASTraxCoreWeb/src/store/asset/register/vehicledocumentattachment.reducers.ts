import { createReducer, createAction } from '@reduxjs/toolkit';

export const addVehicleDocumentAttachment = createAction<VehicleDocumentAttachment>('ADD_VEHICLE_DOCUMENT_ATTACHMENT');
export const removeVehicleDocumentAttachment= createAction<VehicleDocumentAttachment>('REMOVE_VEHICLE_DOCUMENT_ATTACHMENT');
export const setVehicleDocumentAttachment = createAction<VehicleDocumentAttachment[]>('SET_VEHICLE_DOCUMENT_ATTACHMENT');
export const updateVehicleDocumentAttachment = createAction<VehicleDocumentAttachment>('UPDATE_VEHICLE_DOCUMENT_ATTACHMENT');

export interface IVehicleDocumentAttachment {
    current?: VehicleDocumentAttachment[];
}

export const initVehicleDocumentAttachment: IVehicleDocumentAttachment = {
    current: []
}

export const vehicleDocumentAttachmentReducer = createReducer(initVehicleDocumentAttachment, builder =>
    builder
        .addCase(addVehicleDocumentAttachment, (state, action) => {
            state.current?.push({...action.payload});
        })
        .addCase(removeVehicleDocumentAttachment, (state, action) => {
            if(state.current !== undefined) {
                if (action.payload.tempId !== undefined) {
                    state.current = state.current.filter(x => x.tempId !== action.payload.tempId);
                } else {
                    state.current = state.current.filter(x => x.id !== action.payload.id);
                }
            }
        })
        .addCase(setVehicleDocumentAttachment, (state, action) => {
            state.current = action.payload;
        })
        .addCase(updateVehicleDocumentAttachment, (state, action) => {
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
