import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import EstimateGeneralAssetImageAttachment from '@app/entities/maintenance/estimate/EstimateGeneralAssetImageAttachment';

export const addEstimateGeneralAssetImageAttachment = createAction<EstimateGeneralAssetImageAttachment>('ADD_ESTIMATE_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const setEstimateGeneralAssetImageAttachments = createAction<EstimateGeneralAssetImageAttachment[]>('SET_ESTIMATE_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const updateEstimateGeneralAssetImageAttachment = createAction<EstimateGeneralAssetImageAttachment>('UPDATE_ESTIMATE_GENERAL_ASSET_IMAGE_ATTACHMENT');
export const removeEstimateGeneralAssetImageAttachment = createAction<EstimateGeneralAssetImageAttachment>('REMOVE_ESTIMATE_GENERAL_ASSET_IMAGE_ATTACHMENT');

export const initEstimateGeneralAssetImageAttachment: EstimateGeneralAssetImageAttachment[] = [];

export const emptyEstimateGeneralAssetImageAttachment = (ids?: number[]): EstimateGeneralAssetImageAttachment => {
    return {
        tempId: generateNegativeNumber({ flat: ids }),
        id: 0,
        estimateGeneralAssetId: 0,
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

export const estimateGeneralAssetImageAttachmentReducer = createReducer(initEstimateGeneralAssetImageAttachment, builder =>
    builder
        .addCase(setEstimateGeneralAssetImageAttachments, (_, action) => action.payload)
        .addCase(addEstimateGeneralAssetImageAttachment, (state, action) => {

            if (!action.payload.isDefault) return [...state, action.payload];

            const result: EstimateGeneralAssetImageAttachment[] = [];

            state.forEach(imageAttachment => result.push({ ...imageAttachment, isDefault: false }));

            result.push(action.payload);

            return result;
        })
        .addCase(updateEstimateGeneralAssetImageAttachment, (state, action) => {

            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeEstimateGeneralAssetImageAttachment, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);
