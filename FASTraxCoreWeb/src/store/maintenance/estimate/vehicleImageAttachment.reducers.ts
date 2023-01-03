import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateVehicleImageAttachment from '@app/entities/maintenance/estimate/EstimateVehicleImageAttachment';

export const addEstimateVehicleImageAttachment = createAction<EstimateVehicleImageAttachment>('ADD_ESTIMATE_VEHICLE_IMAGE_ATTACHMENT');
export const setEstimateVehicleImageAttachments = createAction<EstimateVehicleImageAttachment[]>('SET_ESTIMATE_VEHICLE_IMAGE_ATTACHMENT');
export const updateEstimateVehicleImageAttachment = createAction<EstimateVehicleImageAttachment>('UPDATE_ESTIMATE_VEHICLE_IMAGE_ATTACHMENT');
export const removeEstimateVehicleImageAttachment = createAction<EstimateVehicleImageAttachment>('REMOVE_ESTIMATE_VEHICLE_IMAGE_ATTACHMENT');

export const initEstimateVehicleImageAttachment: EstimateVehicleImageAttachment[] = [];

export const emptyEstimateVehicleImageAttachment = (ids?: number[]): EstimateVehicleImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }), 
        id: 0,
        estimateVehicleId: 0,
        createdById: 0,
        dateUploaded: new Date(),
        fileName: '',
        fileSize: 0,
        image: '',
        imageType: '',
        isDefault: false,
        isPrintable: false,
        remarks: ''
    };
};

export const estimateVehicleImageAttachmentReducer = createReducer(initEstimateVehicleImageAttachment, builder =>
    builder
        .addCase(setEstimateVehicleImageAttachments, (_, action) => action.payload)
        .addCase(addEstimateVehicleImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: EstimateVehicleImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })
        .addCase(updateEstimateVehicleImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateVehicleImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
