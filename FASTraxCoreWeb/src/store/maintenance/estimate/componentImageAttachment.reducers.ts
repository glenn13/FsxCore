import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateComponentImageAttachment from '@app/entities/maintenance/estimate/EstimateComponentImageAttachment';

export const addEstimateComponentImageAttachment = createAction<EstimateComponentImageAttachment>('ADD_ESTIMATE_COMPONENT_IMAGE_ATTACHMENT');
export const setEstimateComponentImageAttachments = createAction<EstimateComponentImageAttachment[]>('SET_ESTIMATE_COMPONENT_IMAGE_ATTACHMENT');
export const updateEstimateComponentImageAttachment = createAction<EstimateComponentImageAttachment>('UPDATE_ESTIMATE_COMPONENT_IMAGE_ATTACHMENT');
export const removeEstimateComponentImageAttachment = createAction<EstimateComponentImageAttachment>('REMOVE_ESTIMATE_COMPONENT_IMAGE_ATTACHMENT');

export const initEstimateComponentImageAttachment: EstimateComponentImageAttachment[] = [];

export const emptyEstimateComponentImageAttachment = (ids?: number[]): EstimateComponentImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        estimateComponentId: 0,
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

export const estimateComponentImageAttachmentReducer = createReducer(initEstimateComponentImageAttachment, builder =>
    builder
        .addCase(setEstimateComponentImageAttachments, (_, action) => action.payload)
        .addCase(addEstimateComponentImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: EstimateComponentImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })
        .addCase(updateEstimateComponentImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateComponentImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
