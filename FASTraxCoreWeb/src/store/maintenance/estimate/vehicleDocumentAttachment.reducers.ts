import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateVehicleDocumentAttachment from '@app/entities/maintenance/estimate/EstimateVehicleDocumentAttachment';

export const addEstimateVehicleDocumentAttachment = createAction<EstimateVehicleDocumentAttachment>('ADD_ESTIMATE_VEHICLE_DOCUMENT_ATTACHMENT');
export const removeEstimateVehicleDocumentAttachment = createAction<EstimateVehicleDocumentAttachment>('REMOVE_ESTIMATE_VEHICLE_DOCUMENT_ATTACHMENT');
export const setEstimateVehicleDocumentAttachments = createAction<EstimateVehicleDocumentAttachment[]>('SET_ESTIMATE_VEHICLE_DOCUMENT_ATTACHMENT');
export const updateEstimateVehicleDocumentAttachment = createAction<EstimateVehicleDocumentAttachment>('UPDATE_ESTIMATE_VEHICLE_DOCUMENT_ATTACHMENT');

export const initEstimateVehicleDocumentAttachment: EstimateVehicleDocumentAttachment[] = [];

export const emptyEstimateVehicleDocumentAttachment = (ids?: number[]): EstimateVehicleDocumentAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        estimateVehicleId: 0,
        action: '',
        createdById: 0,
        dateUploaded: new Date(),
        file: '',
        fileName: '',
        fileSize: 0,
        fileType: '',
        remarks: ''
    };
};

export const estimateVehicleDocumentAttachmentReducer = createReducer(initEstimateVehicleDocumentAttachment, builder =>
    builder
        .addCase(setEstimateVehicleDocumentAttachments, (_, action) => action.payload)
        .addCase(addEstimateVehicleDocumentAttachment, (state, action) => ([...state, action.payload]))
        .addCase(updateEstimateVehicleDocumentAttachment, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateVehicleDocumentAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);